import React from "react";
import TableForSeller from "./TableForSeller"; // Import the updated TableForSeller component
import { useQuery } from "@tanstack/react-query";
import { HttpRequestService } from "@/services";
import { TOrderHistory } from "@/types/order";
import FetchError from "../shared/FetchError";
import { useUserStore } from "@/store";
import AccessDeniedMessage from "../shared/AccessDeniedMessage";
import OrderHistoryTableSkeleton from "./OrderHistoryTableSkeleton";

export const SellerHistory: React.FC = () => {
  const { authStatus } = useUserStore();

  const headers = [
    { title: "Items", span: 2 },
    { title: "Type" },
    { title: "Price" },
    { title: "Status" },
  ];

  const {
    data: orders,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellerHistory"],
    enabled: authStatus === "authenticated",
    queryFn: async () => {
      const response = await HttpRequestService.fetchApi<TOrderHistory[]>(
        "/order/my/seller"
      );
      return response.data;
    },
  });

  if (authStatus !== "authenticated") return <AccessDeniedMessage />;

  if (isLoading) return <OrderHistoryTableSkeleton headers={headers} />;

  if (error || !orders) {
    return <FetchError refetch={refetch} />;
  }

  if (orders.length < 1) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="max-w-md text-center text-gray-600">
          <h2 className="text-2xl font-bold mb-4">No orders found yet!</h2>
          <p>Don&apos;t worry, we&apos;re sure you&apos;ll have some soon.</p>
        </div>
      </div>
    );
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
