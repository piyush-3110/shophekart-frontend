import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther } from "viem";
import { Config, useReadContract } from "wagmi";

export default function useGetUserCshopTokenBalance(
	userWalletAddress?: `0x${string}`
) {
	const { data: balance, ...props } = useReadContract<
		Abi,
		"getUserPurchasedAmount",
		[`0x${string}`],
		Config,
		bigint
	>({
		config,
		...CONTRACT_CONFIG.cshopTokenSale,
		functionName: "getUserPurchasedAmount",
		args: [userWalletAddress],
		// query: { enabled: !!userWalletAddress },
	});

	return {
		balance:
			balance === undefined
				? undefined
				: balance === BigInt(0)
				? "0"
				: formatEther(balance),

		...props,
	};
}
