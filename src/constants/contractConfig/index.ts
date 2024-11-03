import {
	CSHOP_TOKEN_SALE_ABI,
	ERC20_ABI,
	ESCROW_ABI,
	MARKETPLACE_ABI,
} from "../ABI";
import TOKEN_ADDRESS from "../tokenAddress";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TContractConfig = Record<string, { address: `0x${string}`; abi: any }>;

const CONTRACT_CONFIG: TContractConfig = {
	marketplace: {
		address: "0xc479963Bbc64f53a3bE9F0841611D440645cB20F",
		abi: MARKETPLACE_ABI,
	},
	escrow: {
		address: "0x5540e5cf498B4D7278ad6D6C58E7800f2450204c",
		abi: ESCROW_ABI,
	},
	usdt: {
		address: TOKEN_ADDRESS.USDT,
		abi: ERC20_ABI,
	},
	usdc: {
		address: TOKEN_ADDRESS.USDC,
		abi: ERC20_ABI,
	},
	cshop: {
		address: TOKEN_ADDRESS.CSHOP,
		abi: ERC20_ABI,
	},
	cshopTokenSale: {
		address: "0xE11CC106ba82D28Ff07733d6cfb65AEbaf3F6C5d",
		abi: CSHOP_TOKEN_SALE_ABI,
	},
};

export default CONTRACT_CONFIG;
