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

	return {
		soldTokens: !!soldTokens ? formatEther(soldTokens) : "0",
		soldTokenLoading,
		maxTokens: !!maxTokens ? formatEther(maxTokens) : "0",
		maxTokensLoading,
	};
}

interface IProps {
	round?: number;
}
