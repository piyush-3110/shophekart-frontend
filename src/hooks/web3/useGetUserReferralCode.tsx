import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther } from "viem";
import { Config, useReadContract } from "wagmi";

export default function useGetUserReferralCode(
	userWalletAddress?: `0x${string}`
) {
	const { data: referralCode, ...referralCodeProps } = useReadContract<
		Abi,
		"getReferralCode",
		[],
		Config,
		string
	>({
		config,
		...CONTRACT_CONFIG.cshopTokenSale,
		functionName: "getReferralCode",
		args: [userWalletAddress],
	});

	const { data: referralCount, ...referralCountProps } = useReadContract<
		Abi,
		"getRefferalCount",
		[],
		Config,
		number
	>({
		config,
		...CONTRACT_CONFIG.cshopTokenSale,
		functionName: "getRefferalCount",
		args: [userWalletAddress],
	});
	const { data: referralEarningInBnb, ...referralEarningInBnbProps } =
		useReadContract<Abi, "referralEarningBNB", [], Config, bigint>({
			config,
			...CONTRACT_CONFIG.cshopTokenSale,
			functionName: "referralEarningBNB",
			args: [userWalletAddress],
		});
	const { data: referralEarningInUsdt, ...referralEarningInUsdtProps } =
		useReadContract<Abi, "referralEarningUSDT", [], Config, bigint>({
			config,
			...CONTRACT_CONFIG.cshopTokenSale,
			functionName: "referralEarningUSDT",
			args: [userWalletAddress],
		});

	const usdtEarning =
		referralEarningInUsdt === undefined
			? undefined
			: referralEarningInUsdt === BigInt(0)
			? "0"
			: formatEther(referralEarningInUsdt);

	const bnbEarning =
		referralEarningInBnb === undefined
			? undefined
			: referralEarningInBnb === BigInt(0)
			? "0"
			: formatEther(referralEarningInBnb);

	return {
		referralCode,
		referralCodeProps,
		referralCount,
		referralCountProps,
		referralEarningInBnb: bnbEarning,
		referralEarningInBnbProps,
		referralEarningInUsdt: usdtEarning,
		referralEarningInUsdtProps,
	};
}
