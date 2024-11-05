import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther } from "viem";
import { Config, useBalance, useReadContract } from "wagmi";

export default function useGetUserTokenBalance(
	userWalletAddress?: `0x${string}`
) {
	const { data: cshop, ...cshopProps } = useReadContract<
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
	});
	const { data: usdt, ...usdtProps } = useReadContract<
		Abi,
		"getUserPurchasedAmount",
		[`0x${string}`],
		Config,
		bigint
	>({
		config,
		...CONTRACT_CONFIG.usdt,
		functionName: "balanceOf",
		args: [userWalletAddress],
	});
	const { data: bnb, ...bnbProps } = useBalance({
		config,
		address: userWalletAddress,
	});

	const cshopBalance =
		cshop === undefined
			? undefined
			: cshop === BigInt(0)
			? "0"
			: formatEther(cshop);

	const usdtBalance =
		usdt === undefined
			? undefined
			: usdt === BigInt(0)
			? "0"
			: formatEther(usdt);

	return {
		bnbBalance: bnb?.formatted,
		cshopBalance,
		usdtBalance,
		isLoading:
			usdtProps.isLoading || cshopProps.isLoading || bnbProps.isLoading,
		isError: usdtProps.isError || cshopProps.isError || bnbProps.isError,
		refetchCshop: cshopProps.refetch,
		refetchUsdt: usdtProps.refetch,
		refetchBnb: bnbProps.refetch,
	};
}
