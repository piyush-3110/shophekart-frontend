import { OrderService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import useCancelOrderOnChain from "../web3/useCancelOrderOnChain";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { OrderStatus } from "@/components/orderDetail/SingleDetail";

export default function useCancelOrder(orderId: string, currentOrderStatus: OrderStatus) {

    const { writeContractAsync, isPending: onChainPending, isSuccess: onChainSuccess } = useCancelOrderOnChain(currentOrderStatus, orderId)

    const { mutateAsync, isPending, isSuccess, ...props } = useMutation({
        mutationFn: async () => await OrderService.updateOrder(orderId, "cancelled"),

        async onSuccess({ nftId }) {
            await writeContractAsync({
                ...CONTRACT_CONFIG.escrow,
                functionName: "cancelEscrow",
                args: [nftId],
            })
        }
    })

    return { mutateAsync, isPending: isPending || onChainPending, isSuccess: isSuccess && onChainSuccess, ...props }
}
