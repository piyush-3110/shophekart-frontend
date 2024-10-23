import { ERC20_ABI, MARKETPLACE_ABI } from "../ABI";
import TOKEN_ADDRESS from "../tokenAddress";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TContractConfig = Record<string, { address: `0x${string}`; abi: any }>;

const CONTRACT_CONFIG: TContractConfig = {
  marketplace: {
    address: "0xc479963Bbc64f53a3bE9F0841611D440645cB20F",
    abi: MARKETPLACE_ABI,
  },
  usdt: {
    address: TOKEN_ADDRESS.usdt,
    abi: ERC20_ABI,
  },
  usdc: {
    address: TOKEN_ADDRESS.usdc,
    abi: ERC20_ABI,
  },
  cshop: {
    address: TOKEN_ADDRESS.cshop,
    abi: ERC20_ABI,
  },
};

export default CONTRACT_CONFIG;
