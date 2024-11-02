import { OrderService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import useRaiseDisputeOnChain from "../web3/useRaiseDisputeOnChain";
import { OrderStatus } from "@/components/orderDetail/SingleDetail";

export default function useRaiseDispute() {

    const { raiseDisputeOnChain , isPending:isPendingOnChain} = useRaiseDisputeOnChain()

    const { mutateAsync, ...props } = useMutation({
        async mutationFn({ orderId , currentOrderStatus}: { orderId: string, currentOrderStatus:OrderStatus }) {
            const response= await OrderService.updateOrder(orderId, "dispute")

            return {...response, currentOrderStatus}
        },
        async onSuccess({ nftId, _id,currentOrderStatus }) {
            try {
                await raiseDisputeOnChain(nftId);
                toast({ title: "Dispute raised successfully" })
            } catch {
                toast({ title: "There was an error raising dispute" })
                await OrderService.updateOrder(_id, currentOrderStatus)
            }
        }
    })

    async function raiseDispute(orderId: string, currentOrderStatus:OrderStatus) {
        try {
            await mutateAsync({ orderId, currentOrderStatus })
        } catch (error) {
            console.log(error)
            toast({ title: "There was an error raising dispute" })
        }
    }

    return { raiseDispute, ...props, isPending: props.isPending || isPendingOnChain }
}
