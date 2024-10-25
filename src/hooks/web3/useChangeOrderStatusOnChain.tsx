import { config } from "@/config";
import { useWriteContract } from "wagmi";
import { toast } from "../use-toast";
import { OrderService } from "@/services";

export default function useChangeOrderStatusOnChain(orderId: string) {
  const { writeContractAsync, isSuccess, isPending } = useWriteContract({
    config,
    mutation: {
      async onError() {
        toast({
          title: "Error updating order status.",
          variant: "destructive",
        });

        // TODO: change back status again
        await OrderService.updateOrder(orderId, "pending");
      },
      onSuccess() {
        toast({
          title: "Order status updated successfully",
        });
      },
    },
  });

  return { writeContractAsync, isSuccess, isPending };
}
