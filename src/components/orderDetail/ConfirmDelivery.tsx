import { FC } from 'react'
import useConfirmDelivery from '@/hooks/web2/useConfirmDelivery'
import { OrderStatus } from './SingleDetail'
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

const ConfirmDelivery:FC<{orderId:string, currentStatus:OrderStatus, className?:string}> = ({orderId, currentStatus, className}) => {
    const {confirmDelivery, isPending} = useConfirmDelivery()
  return (
    <AlertDialog>
      <AlertDialogTrigger className="gradient-button !py-2 !px-4" disabled={isPending}>{isPending?"Confirming...":"Confirm Delivery"}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delivery</AlertDialogTitle>
          <AlertDialogDescription>
            {getWarningText(currentStatus)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction className={"gradient-button"} disabled={isPending||currentStatus!=="delivering"} onClick={async()=>{confirmDelivery({orderId, currentStatus})}} >{isPending?"Confirming...":"Confirm Delivery"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDelivery

const getWarningText = (currentOrderStatus:OrderStatus) => {
    switch (currentOrderStatus) {
      case "pending":
        return "Your order is still pending. Please wait until it's being delivered before confirming delivery.";
      case "delivering":
        return "Are you sure you want to confirm delivery for this order? This action will mark your order as delivered.";
      case "delivered":
        return "Your order has already been delivered. You can no longer confirm delivery for this order.";
      case "cancelled":
        return "Your order has been cancelled. You can no longer confirm delivery for this order.";
      case "dispute":
        return "This order has a pending dispute. Please wait for the dispute to be resolved before confirming delivery.";
      default:
        return "An unknown error occurred. Please try again later.";
    }
  }
