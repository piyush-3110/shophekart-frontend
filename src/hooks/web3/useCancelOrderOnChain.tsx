import { config } from "@/config";
import { useWriteContract } from "wagmi";
import { toast } from "../use-toast";
import { OrderService } from "@/services";
import { OrderStatus } from "@/components/orderDetail/SingleDetail";

export default function useCancelOrderOnChain(previousOrderStatus: OrderStatus, orderId: string) {
    const { writeContractAsync, isPending, isSuccess } = useWriteContract({
        config, mutation: {
            onSuccess() {
                toast({ title: "Order cancelled successfully" })
            },
            async onError() {
                await OrderService.updateOrder(orderId, previousOrderStatus)
            }
        }
    })
    return { writeContractAsync, isPending, isSuccess }

}
