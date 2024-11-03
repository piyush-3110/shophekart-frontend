import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { parseEther } from "viem";
import useApproveTokenTransaction from "./useApproveTokenTransaction";
import customToast from "@/utils/toasts";
import { useState } from "react";

const DEFAULT_REFERRAL_CODE = "SHOPHEKART";

export default function useBuyCshopToken() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const {
		writeContractAsync,
		data: hash,
		...props
	} = useWriteContract({ config });

	const { approveTokenTransaction } = useApproveTokenTransaction();

	async function buyCshopToken({ ...props }: TBuyCshopTokenProps) {
		setIsLoading(true);
		setIsSuccess(false);

		const tokenId: 1 | 2 = props.token === "BNB" ? 1 : 2;
		const amountArgs: bigint | 0 =
			props.token === "BNB" ? 0 : parseEther(props.amount.toString());
		const amountValue: bigint | undefined =
			props.token === "BNB" ? parseEther(props.amount.toString()) : undefined;
		const referralCode: string = props.referralCode ?? DEFAULT_REFERRAL_CODE;

		try {
			if (props.token === "USDT")
				await approveTokenTransaction(
					props.token.toLowerCase(),
					props.amount,
					CONTRACT_CONFIG.cshopTokenSale.address
				);

			const txHash = await writeContractAsync({
				...CONTRACT_CONFIG.cshopTokenSale,
				functionName: "buyToken",
				args: [referralCode, tokenId, amountArgs],
				value: amountValue,
			});

			await waitForTransactionReceipt(config, { hash: txHash });
			setIsSuccess(true);
			customToast.success("Transaction successful!");
		} catch {
			customToast.error("Transaction failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return { buyCshopToken, ...props, isPending: isLoading, isSuccess };
}

type TBuyCshopTokenProps = {
	amount: number;
	referralCode?: string;
	token: "BNB" | "USDT";
};
