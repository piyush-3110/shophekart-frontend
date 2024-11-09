import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther } from "viem";
import { Config, useReadContract } from "wagmi";
import { useEffect, useState } from "react";

export default function useGetTokenSaleStats({ round = 1 }: IProps) {
	const { data: soldTokens, isLoading: soldTokenLoading } = useReadContract<Abi, "getTokenPurchasedInRounds", [number], Config, bigint>({
		...CONTRACT_CONFIG.cshopTokenSale,
		functionName: "getTokenPurchasedInRounds",
		args: [round],
	});

	const { data: maxTokens, isLoading: maxTokensLoading } = useReadContract<Abi, "maxTokenInround", [], Config, bigint>({
		...CONTRACT_CONFIG.cshopTokenSale,
		functionName: "maxTokenInround",
		args: [],
	});

	const [completionPercentage, setCompletionPercentage] = useState<number>(0);

	useEffect(() => {
		if (soldTokens && maxTokens) {
			// Format soldTokens and maxTokens to ethers
			const soldTokensFormatted = Number(formatEther(soldTokens));
			const maxTokensFormatted = Number(formatEther(maxTokens));

			// Calculate completion percentage
			let percentage = maxTokensFormatted > 0
				? parseFloat(((soldTokensFormatted / maxTokensFormatted) * 100).toFixed(1))
				: 0;

			// Set the calculated percentage
			if(percentage>100){
				percentage = 100;
			}
			if(percentage<0){
				percentage =0;
			}
			setCompletionPercentage(percentage);
		}
	}, [soldTokens, maxTokens]); // Only re-run when these values change

	// Returning data from the hook
	return {
		soldTokens: soldTokens ? Number(formatEther(soldTokens)) : 0,
		soldTokenLoading,
		maxTokens: maxTokens ? Number(formatEther(maxTokens)) : 0,
		maxTokensLoading,
		completionPercentage, // Return calculated percentage
	};
}

interface IProps {
	round?: number;
}
