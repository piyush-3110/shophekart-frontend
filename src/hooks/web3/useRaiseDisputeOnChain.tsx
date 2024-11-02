import { config } from "@/config"
import CONTRACT_CONFIG from "@/constants/contractConfig"
import { useWriteContract } from "wagmi"

export default function useRaiseDisputeOnChain(){
const {writeContractAsync, ...props}= useWriteContract({config})

async function raiseDisputeOnChain(nftId:number){

        await writeContractAsync({
            ...CONTRACT_CONFIG.escrow,
            functionName:"raiseDispute",
            args:[nftId]
        })
}
    return {raiseDisputeOnChain, ...props}
}
