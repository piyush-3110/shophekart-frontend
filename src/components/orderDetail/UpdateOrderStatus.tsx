import { useState } from "react";
import { OrderStatus } from "./SingleDetail";
import { useChangeOrderStatus } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
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

export default function UpdateOrderStatus({ orderId, className, currentOrderStatus }: { orderId: string, className?: string, currentOrderStatus: OrderStatus }) {
    const [status, setStatus] = useState<OrderStatus | "">(currentOrderStatus)

    const { isLoading, mutateAsync } = useChangeOrderStatus(orderId)

    async function updateOrderStatus() {
        try {
            if (status !== "delivering") throw new Error(`Status can only be "delivering"`);
            await mutateAsync(orderId)
        } catch {
            toast({
                title: "Error while updating order status",
                variant: "destructive"
            })
        }
    }

    return <div className={cn('flex gap-4 flex-col', className)}>
        <Select value={status} onValueChange={(e: OrderStatus) => setStatus(e)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent >
                <SelectItem disabled value="pending">Pending</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
            </SelectContent>
        </Select>
        {/* Button */}
        <AlertDialog>
            <AlertDialogTrigger disabled={isLoading} className="gradient-button !py-2 !px-4 disabled:cursor-not-allowed">{isLoading ? "Updating..." : "Update"}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delivery Status Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            status === "pending" ?
                                "You can't set order status to pending"
                                :
                                `Are you sure you want to mark the order as "Delivering"? This will confirm that the order is on its way to the customer and cannot be cancelled. Please ensure you have shipped the order before taking this action.`
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction className={"gradient-button w-fit"} disabled={status !== "delivering" || isLoading || currentOrderStatus !== "pending"} onClick={updateOrderStatus} >{isLoading ? "Updating..." : "Update"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
}
