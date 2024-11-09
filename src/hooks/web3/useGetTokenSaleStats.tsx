import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther } from "viem";
import { Config, useReadContract } from "wagmi";
import { useMemo } from "react";

export default function useGetTokenSaleStats({ round = 1 }: IProps) {
  const { data: soldTokens, isLoading: soldTokenLoading } = useReadContract<
    Abi,
    "getTokenPurchasedInRounds",
    [number],
    Config,
    bigint
  >({
    ...CONTRACT_CONFIG.cshopTokenSale,
    functionName: "getTokenPurchasedInRounds",
    args: [round],
  });

  const { data: maxTokens, isLoading: maxTokensLoading } = useReadContract<
    Abi,
    "maxTokenInround",
    [],
    Config,
    bigint
  >({
    ...CONTRACT_CONFIG.cshopTokenSale,
    functionName: "maxTokenInround",
    args: [],
  });

  // Use useMemo to memoize the formatted token values and completion percentage
  const { soldTokensFormatted, maxTokensFormatted, completionPercentage } =
    useMemo(() => {
      console.log(soldTokens);
      console.log(maxTokens);

      const soldTokensFormatted = soldTokens
        ? Number(formatEther(soldTokens))
        : 0;
      const maxTokensFormatted = maxTokens ? Number(formatEther(maxTokens)) : 0;

      let completionPercentage =
        maxTokensFormatted > 0
          ? parseFloat(
              ((soldTokensFormatted / maxTokensFormatted) * 100).toFixed(1)
            )
          : 0;

      if (completionPercentage > 100) {
        completionPercentage = 100;
      }

      return { soldTokensFormatted, maxTokensFormatted, completionPercentage };
    }, [soldTokens, maxTokens]); // Only recompute if soldTokens or maxTokens change

  return {
    soldTokens: soldTokensFormatted,
    soldTokenLoading,
    maxTokens: maxTokensFormatted,
    maxTokensLoading,
    completionPercentage, // Return calculated percentage
  };
}

interface IProps {
  round?: number;
}
