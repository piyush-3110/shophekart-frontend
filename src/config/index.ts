import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";
import { http } from "wagmi";

const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://shophekart-frontend.vercel.app/"; // Fallback for SSR
};

export const config = getDefaultConfig({
  appName: "Shophekart",
  appDescription: "A crypto ecommerce store",
  projectId: "5414a59b644946d2fd01f5710c4784ad",
  chains: [bscTestnet],
  appUrl: getOrigin(),
  appIcon: "/images/shared/logo.png",
  transports: {
    [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
    // [bsc.id]: http("https://bsc.blockrazor.xyz"),
  },
  ssr: true,
});
