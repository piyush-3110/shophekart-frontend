import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { useWriteContract } from "wagmi";

export default function useConfirmDeliveryOnChain(){
    const {writeContractAsync, ...props} = useWriteContract({config})

    async function confirmDeliveryOnChain(nftId:number){
        await writeContractAsync({
            ...CONTRACT_CONFIG.escrow,
            functionName:"confirmDelivery",
            args:[nftId]
        })
    }

    return {confirmDeliveryOnChain, ...props}
}
