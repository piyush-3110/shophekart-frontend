// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

// Your Reown Cloud project ID
export const projectId = "5414a59b644946d2fd01f5710c4784ad";

// Dynamically get the URL based on window.location for client-side, or use a fallback for SSR
const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://shophekart-frontend.vercel.app/"; // Fallback for SSR
};

// Create a metadata object
const metadata = {
  name: "Shophekart",
  description: "A crypto ecommerce store",
  url: getOrigin(), // Dynamically set based on the window location or fallback
  icons: ["/images/shared/logo.png"],
};

// Create wagmiConfig
const chains = [bsc, bscTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
