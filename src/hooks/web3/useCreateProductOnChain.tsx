import { config } from "@/config";
import CONTRACT_CONFIG from "@/constants/contractConfig";
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { PRODUCT_CREATION_FEE } from "@/constants/application";
import { parseEther } from "viem";

const useCreateProductOnChain = (userWalletAddress: `0x${string}`) => {
	const {
		writeContractAsync,
		data: hash,
		...props
	} = useWriteContract({
		config,
	});

	async function createProductOnChain({
		stock,
		currencyAddress,
		price,
		shippingCharges,
		tokenUri,
	}: TCreateProductOnChain) {
		await writeContractAsync({
			...CONTRACT_CONFIG.marketplace,
			functionName: "createMarketItem",
			args: [
				stock,
				currencyAddress,
				parseEther(price.toString()),
				parseEther(shippingCharges.toString()),
				tokenUri,
			],
			value: parseEther(PRODUCT_CREATION_FEE),
		});
	}

	const { isSuccess } = useWaitForTransactionReceipt({ hash, config });

	const { data: onChainIds } = useReadContract({
		config,
		...CONTRACT_CONFIG.marketplace,
		functionName: "getUserListedItemIds",
		args: [userWalletAddress],
		query: {
			enabled: isSuccess,
		},
	});

	return { createProductOnChain, ...props, onChainIds, isSuccess };
};

export default useCreateProductOnChain;

type TCreateProductOnChain = {
	stock: number;
	currencyAddress: `0x${string}`;
	price: number;
	shippingCharges: number;
	tokenUri: string; // nft metadata
};
