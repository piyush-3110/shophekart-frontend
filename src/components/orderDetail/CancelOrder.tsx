import useCancelOrder from "@/hooks/web2/useCancelOrder"
import { FC } from "react"
import { OrderStatus } from "./SingleDetail"
import { toast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const CancelOrder: FC<TProps> = ({ orderId, currentOrderStatus }) => {
    const { mutateAsync, isPending, } = useCancelOrder(orderId, currentOrderStatus)
    console.log(currentOrderStatus)
    async function CancelOrder() {
        try {
            await mutateAsync()
        } catch (error) {
            console.log(error)
            toast({
                title: "Error cancelling the order",
                variant: "destructive"
            })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 text-white px-4 py-1 rounded-sm" disabled={isPending} >{isPending ? "Cancelling..." : "Cancel Order"}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Order Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            currentOrderStatus === "pending"
                                ? "Are you sure you want to cancel this order? This action cannot be undone. Please note that cancelling this order may result in any associated fees being non-refundable. If you're experiencing any issues with your order, consider raising a dispute for our customer support team's assistance."
                                :
                                "Unfortunately, cancellation is not possible once an order is out for delivery. If you have any concerns or questions, you can raise a dispute, our customer support team is here to help."
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction className={"gradient-button"} disabled={isPending || currentOrderStatus !== "pending"} onClick={CancelOrder}>{isPending ? "Cancelling..." : "Cancel Order"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CancelOrder

type TProps = {
    orderId: string;
    currentOrderStatus: OrderStatus
}
