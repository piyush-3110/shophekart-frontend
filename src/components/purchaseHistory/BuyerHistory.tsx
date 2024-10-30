import React from "react";
import TableForBuyer from "./TableForBuyer"; // Assuming TableForBuyer is in the same folder
import { useQuery } from "@tanstack/react-query";
import { HttpRequestService } from "@/services";
import { TBuyerOrderHistory } from "@/types/order";
import { useUserStore } from "@/store";
import AccessDeniedMessage from "../shared/AccessDeniedMessage";
import FetchError from "../shared/FetchError";
import OrderHistoryTableSkeleton from "./OrderHistoryTableSkeleton";

const BuyerHistory: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Type" },
    { title: "Price" },
    { title: "Status" },
    { title: "Review" },
  ];

  const { authStatus } = useUserStore();

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["buyer history"],
    enabled: authStatus === "authenticated",
    async queryFn() {
      const res = await HttpRequestService.fetchApi<TBuyerOrderHistory[]>(
        "/order/my/buyer"
      );
      return res.data;
    },
  });

  if (authStatus !== "authenticated") return <AccessDeniedMessage />;

  if (isLoading) return <OrderHistoryTableSkeleton headers={headers} />;

  if (error || !orders) return <FetchError refetch={refetch} />;

  if (orders.length < 1)
    return (
      <div className="flex justify-center items-center h-full">
        <div
          role="alert"
          aria-label="No orders yet"
          className="max-w-md text-center text-gray-600"
        >
          <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
          <p>Explore our catalogue and start shopping today!</p>
        </div>
      </div>
    );

  const data = orders.map((order) => {
    return {
      imageUrl: order.product.imageUrl,
      category: order.category,
      status: order.orderStatus,
      title: order.product.name,
      description: order.product.description,
      type: order.product.type === "FixedProduct" ? "Buy Now" : "Auction",
      soldPrice: order.soldAtPrice + order.shippingPrice,
      currencyType: order.product.currencyType,
      orderId: order._id,
    };
  });

  return <TableForBuyer headers={headers} data={data} />;
};

export default BuyerHistory;
