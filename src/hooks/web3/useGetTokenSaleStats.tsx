import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther } from "viem";
import { Config, useReadContract } from "wagmi";

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
console.log(soldTokens);
console.log(maxTokens);
	// Format soldTokens and maxTokens to ethers, then calculate percentage
	const soldTokensFormatted = soldTokens ? Number(formatEther(soldTokens)) : 0;
	const maxTokensFormatted = maxTokens ? Number(formatEther(maxTokens)) : 0;
	const completionPercentage =
		maxTokensFormatted > 0
			? parseFloat(((soldTokensFormatted / maxTokensFormatted) * 100).toFixed(1))
			: 0;

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
