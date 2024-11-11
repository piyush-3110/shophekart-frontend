import CONTRACT_CONFIG from "@/constants/contractConfig";
import { Abi } from "viem";
import { Config, useReadContract } from "wagmi";

export default function useGetProgressData() {
	const { ...props } = useReadContract<Abi, "getNumber", [], Config, bigint>({
		...CONTRACT_CONFIG.progressData,
		functionName: "getNumber",
		args: [],
	});
	return {
		...props,
		data: props.data === BigInt(0) ? 0 : props.data ? Number(props.data) : 0,
	};
}
