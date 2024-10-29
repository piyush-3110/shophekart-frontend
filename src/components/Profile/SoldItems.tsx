import React from "react";
import Table from "./Table";
import { useQuery } from "@tanstack/react-query";
import { HttpRequestService } from "@/services";
import FetchError from "../shared/FetchError";

const SoldItems: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Rating", span: 2 },
    { title: "Type" },
    { title: "Sold Price" },
    { title: "Shipping" },
  ];

  const fetchSoldItems = async () =>
    (
      await HttpRequestService.fetchApi<TProductSummary[]>(
        "/order/my/sold-items"
      )
    ).data;

  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["soldItems"],
    queryFn: fetchSoldItems,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !products) return <FetchError refetch={refetch} />;

  if (products.length < 1) return <div>No items for sale...</div>;

  const data = products.map((product) => ({
    imageUrl: product.productImage,
    category: product.category,
    status: "Sold",
    title: product.productName,
    description: product.productDescription,
    ratingValue: product.averageRating,
    ratingNumber: product.reviewCount,
    type: product.productType === "FixedProduct" ? "Buy Now" : "Auction",
    soldPrice: `$${product.soldPrice} ${product.currencyType}`,
    shipping: `${product.shippingType} Shipping`,
  }));

  return <Table headers={headers} data={data} />;
};

export default SoldItems;

type TProductSummary = {
  _id: string;
  productId: string;
  productName: string;
  productDescription: string;
  productType: "FixedProduct" | "OtherProductTypes"; // Adjust according to other possible product types
  shippingType: "GLOBAL" | "LOCAL"; // Adjust based on allowed shipping types
  soldPrice: number;
  currencyType: "CSHOP" | "USD" | "EUR"; // Adjust according to other currency types used
  productImage: string;
  category: string;
  reviewCount: number;
  averageRating: number;
  salesCount: number;
};
