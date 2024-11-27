import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { ContractFunctionExecutionError, parseEther } from "viem";
import useApproveTokenTransaction from "./useApproveTokenTransaction";
import customToast from "@/utils/toasts";
import { useCallback, useState } from "react";
import useGetDefaultReferralCode from "./useGetDefaultReferralCode";

// const DEFAULT_REFERRAL_CODE = "CSHOP";

export default function useBuyCshopToken() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isApproveLoading, setIsApproveLoading] = useState<boolean>(false);
	const [isBuyTokenLoading, setIsBuyTokenLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const { writeContractAsync, ...props } = useWriteContract({ config });

	const { approveTokenTransaction } = useApproveTokenTransaction();

	const { defaultReferralCode } = useGetDefaultReferralCode();

	const buyCshopToken = useCallback(
		async ({ token, amount, referralCode }: TBuyCshopTokenProps) => {
			setIsLoading(true);
			setIsSuccess(false);

			const tokenId: 1 | 2 = token === "BNB" ? 1 : 2;
			const amountArgs: bigint | 0 =
				token === "BNB" ? 0 : parseEther(amount.toString());
			const amountValue: bigint | undefined =
				token === "BNB" ? parseEther(amount.toString()) : undefined;
			const referralCodeString: string = referralCode ?? defaultReferralCode;

			try {
				if (token === "USDT") {
					setIsApproveLoading(true);
					await approveTokenTransaction(
						token.toLowerCase(),
						amount,
						CONTRACT_CONFIG.cshopTokenSale.address
					);
					setIsApproveLoading(false);
				}
				setIsBuyTokenLoading(true);
				const txHash = await writeContractAsync({
					...CONTRACT_CONFIG.cshopTokenSale,
					functionName: "buyToken",
					args: [referralCodeString, tokenId, amountArgs],
					value: amountValue,
				});
				setIsBuyTokenLoading(false);

				await waitForTransactionReceipt(config, { hash: txHash });
				customToast.success("Transaction successful!");
				setIsSuccess(true);
			} catch (error) {
				if (error instanceof ContractFunctionExecutionError) {
					if (error.message.includes("insufficient funds for gas * price + value")) {
						customToast.error("You do not have enough funds.");
					} else if (error.message.includes("User rejected the request")) {
						customToast.success(
							"Changed your mind??",
							"Don't worry you can buy it later, but don't be too late because you may regret..."
						);
					}
				} else {
					customToast.error("Transaction failed. Please try again.");
				}
			} finally {
				setIsLoading(false);
			}
		},
		[
			writeContractAsync,
			approveTokenTransaction,
			setIsLoading,
			setIsSuccess,
			defaultReferralCode,
		]
	);

	return {
		buyCshopToken,
		...props,
		isPending: isLoading,
		isSuccess,
		setIsSuccess,
		isApproveLoading,
		isBuyTokenLoading,
	};
}

type TBuyCshopTokenProps = {
	amount: number;
	referralCode?: string;
	token: "BNB" | "USDT";
};
