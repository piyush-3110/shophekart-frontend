import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi, formatEther, parseEther } from "viem";
import { Config, useReadContract } from "wagmi";

export default function useGetPaymentInfo({
	token,
	amount,
}: {
	token: "USDT" | "BNB";
	amount: string;
}) {
	const { data, ...props } = useReadContract<
		Abi,
		"claclulateAmount",
		[number, bigint],
		Config,
		bigint
	>({
		...CONTRACT_CONFIG.cshopTokenSale,
		functionName: "claclulateAmount",
		args: [token === "USDT" ? 2 : token === "BNB" ? 1 : 0, parseEther(amount)],
	});

	return {
		cshopToken:
			data === BigInt(0) ? "0" : !data ? undefined : formatEther(data),
		...props,
	};
}
