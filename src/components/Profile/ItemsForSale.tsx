import React from "react";
// Assuming the new Table component is in the same folder
import TableForSale from "./TableForSale";
import { useQuery } from "@tanstack/react-query";
import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";

const ItemsForSale: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Type" },
    { title: "Price" },
    { title: "Shipping" },
    { title: "Action" },
  ];

  async function fetchItemsForSale() {
    const data = await HttpRequestService.fetchApi<IProduct[]>(
      "/product/my/seller"
    );
    return data.data;
  }

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["itemsForSale"],
    queryFn: fetchItemsForSale,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !products) return <div>Error...</div>;

  if (products.length < 1) return <div>No items for sale...</div>;

  const data = products.map((product) => ({
    imageUrl: product.images[0],
    category: "Bags",
    status: product.status,
    title: product.name,
    description: product.description,
    ratingValue: 4.5,
    ratingNumber: 120,
    type: "Auction",
    price: `${product.price} ${product.currencyType}`,
    shipping: `${product.shippingType}`,
  }));

  return <TableForSale headers={headers} data={data} />;
};

export default ItemsForSale;
