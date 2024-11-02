import { OrderService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import useConfirmDeliveryOnChain from "../web3/useConfirmDeliveryOnChain";
import { OrderStatus } from "@/components/orderDetail/SingleDetail";
import { toast } from "../use-toast";

export default function useConfirmDelivery() {
    const { confirmDeliveryOnChain, isPending } = useConfirmDeliveryOnChain()

    const { mutateAsync, ...props } = useMutation({
        async mutationFn({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
            const order = await OrderService.updateOrder(orderId, "delivered")
            return { order, currentStatus }
        },
        async onSuccess({ order: { nftId, _id }, currentStatus },) {
            try {
                await confirmDeliveryOnChain(nftId)
                toast({ title: "Delivery Confirmed!!", description: "Thank you for confirming the delivery" })
            } catch {
                toast({ title: "Error while confirming delivery", variant: "destructive" })
                await OrderService.updateOrder(_id, currentStatus)
            }
        }
    })

    async function confirmDelivery({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
        try {
            await mutateAsync({ currentStatus, orderId })
        } catch (error) {
            console.log(error)
            toast({
                title: "Error while confirming delivery"
            })
        }
    }

    return { confirmDelivery, ...props, isPending: isPending || props.isPending, }
}
