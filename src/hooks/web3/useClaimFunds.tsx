import { config } from "@/config";
import { useWriteContract } from "wagmi";
import { toast } from "../use-toast";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { ContractFunctionExecutionError } from "viem";

export default function useClaimFunds() {
    const { writeContractAsync, ...props } = useWriteContract({ config })

    async function claimFunds(nftId: number) {
        try {
            await writeContractAsync({ ...CONTRACT_CONFIG.escrow, functionName: "claimFunds", args: [nftId] })
            toast({ title: "Funds claimed successfully" })
        } catch (error) {
            if(error instanceof ContractFunctionExecutionError){
                if(error.shortMessage.includes("Shipping time not passed")){
                    toast({ title: "Error while claiming funds",
                        description:"Shipping time has not passed yet",
                         variant: "destructive" })
                         return
                }
            }
            console.log(error)
            toast({ title: "Error while claiming funds", variant: "destructive" })
        }
    }

    return { claimFunds, ...props }

}
