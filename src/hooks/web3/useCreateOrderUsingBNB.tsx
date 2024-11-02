import { useWriteContract } from "wagmi";
import { config } from "@/config"
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { parseEther } from "viem";
import {waitForTransactionReceipt} from "@wagmi/core";

export default function useCreateOrderUsingBNB() {

    const { writeContractAsync , ...props} = useWriteContract({ config })

    async function createOrderUsingBNB(markerItemId: number, shippingCharges: number, price: number) {
        const hash = await writeContractAsync({
            ...CONTRACT_CONFIG.marketplace,
            functionName: "purchaseByPayingInBNB",
            args: [markerItemId],
            value:parseEther((shippingCharges + price).toString())
        })

        await waitForTransactionReceipt(config,{ hash })
    }
    return { createOrderUsingBNB , ...props}
}
