import { useState } from "react";
import { OrderStatus } from "./SingleDetail";
import { useChangeOrderStatus } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

export default function UpdateOrderStatus({ orderId, className }: { orderId: string, className?: string }) {
    const [status, setStatus] = useState<OrderStatus | "">("")

    const { isLoading, mutateAsync } = useChangeOrderStatus(orderId)

    async function updateOrderStatus() {
        console.log(orderId)
        try {
            if (status !== "delivering") throw new Error(`Status can only be "delivering"`);
            await mutateAsync(orderId)
        } catch (error) {
            console.log(error)
            toast({
                title: "Error while updating order status",
                variant: "destructive"
            })
        }
    }

    return <div className={cn('flex gap-4 flex-col', className)}>
        <Select onValueChange={(e: OrderStatus) => setStatus(e)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent >
                <SelectItem disabled value="pending">Pending</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
            </SelectContent>
        </Select>
        <Button className='gradient-button w-fit' disabled={status !== "delivering" || isLoading} onClick={updateOrderStatus}>{isLoading ? "Updating..." : "Update"}</Button>
    </div>
}
