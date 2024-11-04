import { config } from "@/config";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useCallback, useState } from "react";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import customToast from "@/utils/toasts";

export default function useGenerateReferralCode() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const { writeContractAsync, ...props } = useWriteContract({ config });

	const generateReferralCode = useCallback(
		async (referralCode: string) => {
			setIsLoading(true);
			setIsSuccess(false);
			try {
				const txHash = await writeContractAsync({
					...CONTRACT_CONFIG.cshopTokenSale,
					functionName: "generateReferralCode",
					args: [referralCode],
				});
				await waitForTransactionReceipt(config, { hash: txHash });
				setIsSuccess(true);
			} catch (error) {
				customToast.error("There was an error while generating referral code");
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		},
		[writeContractAsync]
	);

	return {
		isSuccess: isSuccess && props.isSuccess,
		isLoading,
		generateReferralCode,
	};
}
