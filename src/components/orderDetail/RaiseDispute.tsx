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
import { OrderStatus } from "./SingleDetail";
import useRaiseDispute from "@/hooks/web2/useRaiseDispute";

export default function RaiseDispute({ orderId, currentOrderStatus }: TProps) {

    const { raiseDispute, isPending } = useRaiseDispute()

    return (
        <AlertDialog>
            <AlertDialogTrigger disabled={isPending} className="bg-red-500 text-white px-4 py-1 rounded-sm">{isPending ? "Raising Dispute..." : "Raise Dispute"}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Raise Dispute Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            currentOrderStatus === "delivering" ?
                                <div className="prose">
                                    Are you sure you want to raise a dispute for this order?
                                    If so, please email us at{" "}
                                    <a href="mailto:support@shophekart.com" target="_blank" rel="noopener noreferrer">
                                        support@shophekart.com
                                    </a>{" "}
                                    with the following details:
                                    <ul>
                                        <li>A detailed description of the issue you&apos;re experiencing</li>
                                        <li>Any relevant proofs or documentation (if needed)</li>
                                        <li>Your NFT ID for this order</li>
                                    </ul>
                                    Once you have mailed us, please make sure to click the raise dispute button below.
                                    This will allow our customer support team to review and assist with resolving the issue efficiently.
                                </div>
                                : currentOrderStatus === "dispute" ? <div className="prose">
                                    A dispute has already been raised for this order. You can&apos;t raise another dispute until the current one is resolved. We hope you that you have mailed us at{" "}  <a href="mailto:support@shophekart.com" target="_blank" rel="noopener noreferrer">
                                        support@shophekart.com
                                    </a>{" "}with the required details, which are:
                                    <ul>
                                        <li>A detailed description of the issue you&apos;re experiencing</li>
                                        <li>Any relevant proofs or documentation (if needed)</li>
                                        <li>Your NFT ID for this order</li>
                                    </ul>
                                    In case you have not mailed us, please make sure to mail us.
                                    This will allow our customer support team to review and assist with resolving the issue efficiently.
                                </div> :
                                    getWarningText(currentOrderStatus)
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction className={"gradient-button"} disabled={currentOrderStatus !== "delivering" || isPending} onClick={async () => { await raiseDispute(orderId, currentOrderStatus) }} >{isPending ? "Raising Dispute" : "Raise Dispute"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const getWarningText = (currentOrderStatus: OrderStatus) => {
    switch (currentOrderStatus) {
        case "pending":
            return "Your order is still pending. Please wait until it's being delivered before raising a dispute.";
        case "delivering":
            return "Are you sure you want to raise a dispute for this order? This action will notify our customer support team to review and assist with any issues you're experiencing. Please provide as much detail as possible to help us resolve the issue efficiently.";
        case "delivered":
            return "Your order has already been delivered. You can no longer raise a dispute for this order.";
        case "cancelled":
            return "Your order has been cancelled. You can no longer raise a dispute for this order.";
        case "dispute":
            return "A dispute has already been raised for this order. You can't raise another dispute until the current one is resolved.";
        default:
            return "An unknown error occurred. Please try again later.";
    }
}

type TProps = {
    orderId: string;
    currentOrderStatus: OrderStatus
}
