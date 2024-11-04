import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// TESTNET
// import { bscTestnet } from "wagmi/chains";

// MAINNET
import { bsc } from "wagmi/chains";
import { http } from "wagmi";

const getOrigin = () => {
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	return "https://shophekart.com/"; // Fallback for SSR
};

// TESTNET

// export const config = getDefaultConfig({
// 	appName: "Shophekart",
// 	appDescription: "A crypto ecommerce store",
// 	projectId: "5414a59b644946d2fd01f5710c4784ad",
// 	chains: [bscTestnet],
// 	appUrl: getOrigin(),
// 	appIcon: "/images/shared/logo.png",
// 	transports: {
// 		[bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
// 	},
// 	ssr: true,
// });

// MAINNET

export const config = getDefaultConfig({
	appName: "Shophekart",
	appDescription: "A crypto ecommerce store",
	projectId: "5414a59b644946d2fd01f5710c4784ad",
	chains: [bsc],
	appUrl: getOrigin(),
	appIcon: "/images/shared/logo.png",
	transports: {
		[bsc.id]: http("https://bsc.blockrazor.xyz"),
	},
	ssr: true,
});
