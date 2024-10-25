import React from "react";
import TableForSeller from "./TableForSeller"; // Import the updated TableForSeller component
import { useQuery } from "@tanstack/react-query";
import { HttpRequestService } from "@/services";
import { TSellerOrder } from "@/types/order";

export const SellerHistory: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Type" },
    { title: "Price" },
    { title: "Status" },
    { title: "Rating" },
  ];

  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sellerHistory"],
    queryFn: async () => {
      const response = await HttpRequestService.fetchApi<TSellerOrder[]>(
        "/order/my/seller"
      );
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Opps .... Something went wrong</div>;
  }

  if (!orders || orders.length < 1) {
    return <div>No orders found</div>;
  }

  const data = orders.map((order) => {
    const data = {
      imageUrl: order.product[0].imageUrl[0],
      category: order.categoryLabel,
      status: order.orderStatus,
      title: order.product[0].name,
      description: order.product[0].description,
      type: order.product[0].type === "FixedProduct" ? "Buy Now" : "Auction",
      soldPrice: `${order.soldAtPrice + order.shippingPrice} ${
        order.product[0].currencyType
      }`,
      nftId: order.nftId,
      orderId: order._id,
    };
    return data;
  });

  return <TableForSeller headers={headers} data={data} />;
};

export default SellerHistory;
