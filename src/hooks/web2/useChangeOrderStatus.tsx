import { OrderService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useChangeOrderStatusOnChain } from "@/hooks";
import CONTRACT_CONFIG from "@/constants/contractConfig";

export default function useChangeOrderStatus(orderId: string) {
    const {
        writeContractAsync,
        isSuccess: onChainSuccess,
        isPending: onChainPending,
    } = useChangeOrderStatusOnChain(orderId);

    const { mutateAsync, isPending, isSuccess } = useMutation({
        async mutationFn(orderId: string) {
            const order = await OrderService.updateOrder(orderId, "delivering");

            return order;
        },

        onError() {
            toast({
                title: "There was an error while updating the order status",
                variant: "destructive",
            });
        },
        async onSuccess(order) {
            const deliveryByInSecs = Math.floor((new Date(order.deliveryBy).getTime() - new Date().getTime()) / 1000)

            await writeContractAsync({
                ...CONTRACT_CONFIG.escrow,
                functionName: "confirmShipment",
                args: [order.nftId, deliveryByInSecs],
            });
        },
    });

    return {
        mutateAsync,
        isLoading: isPending || onChainPending,
        isSuccess: isSuccess && onChainSuccess,
    };
}
