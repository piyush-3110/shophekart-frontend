import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi } from "viem";
import { Config, useReadContract } from "wagmi";

export default function useGetDefaultReferralCode() {
	const { data, ...props } = useReadContract<
		Abi,
		"getForShophe",
		[],
		Config,
		string
	>({
		...CONTRACT_CONFIG.referralCodeContract,
		functionName: "getForShophe",
		args: [],
	});

	return { defaultReferralCode: data ?? "", ...props };
}
