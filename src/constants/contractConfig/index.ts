import { MARKETPLACE_ABI } from "../ABI";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TContractConfig = Record<string, { address: `0x${string}`; abi: any }>;

const CONTRACT_CONFIG: TContractConfig = {
  marketplace: {
    address: "0xD73F011b18bce033ee0981228804F2564B76D454",
    abi: MARKETPLACE_ABI,
  },
};

export default CONTRACT_CONFIG;
