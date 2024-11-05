import { useWriteContract } from "wagmi";
import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import { parseEther } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";

export default function useApproveTokenTransaction() {
	const { writeContractAsync, ...props } = useWriteContract({ config });

	async function approveTokenTransaction(
		token: string,
		amount: number,
		sender: `0x${string}` = CONTRACT_CONFIG.marketplace.address
	) {
		const hash = await writeContractAsync({
			...CONTRACT_CONFIG[token],
			functionName: "approve",
			args: [sender, parseEther(amount.toString())],
		});

		await waitForTransactionReceipt(config, { hash });
	}
	return { approveTokenTransaction, ...props };
}
