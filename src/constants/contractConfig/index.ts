import {
	CSHOP_TOKEN_SALE_ABI,
	DEFAULT_REFERRAL_CODE_ABI,
	ERC20_ABI,
	ESCROW_ABI,
	MARKETPLACE_ABI,
	PROGRESS_DATA_ABI,
} from "../ABI";
import TOKEN_ADDRESS from "../tokenAddress";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TContractConfig = Record<string, { address: `0x${string}`; abi: any }>;

const mainnetConfig: TContractConfig = {
	marketplace: {
		address: "0x9192702F30Eecf8209494Eeef5C38951e0142e73",
		abi: MARKETPLACE_ABI,
	},
	escrow: {
		address: "0x53f17a0CA065525707c5d94f8a07d47a93Ca76eb",
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
		address: "0x2491dD1A99ed07f192010a55B7e6c5A4A1065d5b",
		abi: CSHOP_TOKEN_SALE_ABI,
	},
	progressData: {
		address: "0x2E5019f4903BB824EdcEb7a8cf5337fceeb77199",
		abi: PROGRESS_DATA_ABI,
	},
	referralCodeContract: {
		address: "0x221120dB237c9BecFB73D054EBCD084d52F8e586",
		abi: DEFAULT_REFERRAL_CODE_ABI,
	},
};

const testnetConfig: TContractConfig = {
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
		address: "0xB005004337f440753A2eAd1a2eB7e0046b79Abec",
		abi: CSHOP_TOKEN_SALE_ABI,
	},
	progressData: {
		address: "0x77Eb2E57AC6BAdff6Bbd8f085fc9b0fC124Ed1C4",
		abi: PROGRESS_DATA_ABI,
	},
	referralCodeContract: {
		address: "0x35877af8F15EAE37B6a80288F03f90a45Bd66c8d",
		abi: DEFAULT_REFERRAL_CODE_ABI,
	},
};

const CONTRACT_CONFIG: TContractConfig =
	process.env.NODE_ENV === "production" ? mainnetConfig : testnetConfig;

export default CONTRACT_CONFIG;
