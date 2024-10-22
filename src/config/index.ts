// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

// Your Reown Cloud project ID
export const projectId = "5414a59b644946d2fd01f5710c4784ad";

// Create a metadata object
const metadata = {
  name: "Shophekart",
  description: "A crypto ecommerce store",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["/images/shared/logo.png"],
};

// Create wagmiConfig
const chains = [bsc, bscTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
