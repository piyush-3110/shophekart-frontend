import { useWriteContract } from "wagmi";
import { config } from "@/config"
import CONTRACT_CONFIG from "@/constants/contractConfig";
import {waitForTransactionReceipt} from "@wagmi/core"

export default function useCreateOrderUsingOtherToken() {
    const { writeContractAsync, ...props } = useWriteContract({ config })

    async function createOrderUsingOtherToken(marketItemId: number) {
       const hash = await writeContractAsync({
            ...CONTRACT_CONFIG.marketplace,
            functionName: "purchaseByPayingInToken",
            args: [marketItemId],
        })

        await waitForTransactionReceipt(config,{ hash })

    }

    return { createOrderUsingOtherToken, ...props }
}
