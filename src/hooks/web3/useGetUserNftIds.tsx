import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi } from "viem";
import { Config, useReadContract } from "wagmi";

export default function useGetUserNftIds(userId:`0x${string}`, enabled:boolean){
    const {data:nftIds, ...props} = useReadContract<Abi,
    "getEscrowIDsOfUserBuyer",
    [`0x${string}`],
    Config,
    bigint[] | undefined
  >({
    ...CONTRACT_CONFIG.escrow,
    functionName:"getEscrowIDsOfUserBuyer",
    args:[userId],
    query:{
        enabled
    }
  })

  return {nftIds, ...props}
}
