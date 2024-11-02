import { FC } from 'react'
import useClaimFunds from '@/hooks/web3/useClaimFunds'
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

const ClaimFunds: FC<{ nftId: number, currentOrderStatus:OrderStatus , deliveryBy:Date}> = ({ nftId ,currentOrderStatus,deliveryBy}) => {

    const { claimFunds, isPending } = useClaimFunds()
    return (
        <AlertDialog>
        <AlertDialogTrigger disabled={isPending} className="gradient-button !py-2 !px-4 disabled:cursor-not-allowed">{isPending ? "Claiming..." : "Claim Funds"}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Raise Dispute Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                    {
                       getWarningText(currentOrderStatus, deliveryBy)
                    }
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction className={"gradient-button disabled:cursor-not-allowed"} disabled={isPending || !(currentOrderStatus === "delivering" && new Date(deliveryBy) <= new Date())} onClick={async () => { await claimFunds(nftId) }} >{isPending ? "Claiming..." : "Claim Funds"}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}

export default ClaimFunds

const getWarningText = (currentOrderStatus: OrderStatus, deliveryBy: Date) => {
    switch (currentOrderStatus) {
      case "pending":
        return "Your order is still pending. Please wait until it's been delivered before claiming funds.";
      case "delivering":
        if (new Date(deliveryBy) > new Date()) {
          return "Sorry, but you can't claim funds unless the shipping time has been passed or the buyer has confirmed delivery";
        } else {
          return "You can now claim your funds for this order.";
        }
      case "delivered":
        return "Your order has already been delivered. Your funds have been transfered to your wallet.";
      case "cancelled":
        return "Your order has been cancelled. You can't claim funds for a cancelled order.";
      default:
        return "An unknown error occurred. Please try again later.";
    }
  }
