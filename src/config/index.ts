import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, bscTestnet } from "wagmi/chains";
import { http } from "wagmi";

const getOrigin = () => {
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	return "https://shophekart.com/"; // Fallback for SSR
};

const chains =
	process.env.NODE_ENV === "production"
		? ([bsc] as const)
		: ([bscTestnet] as const);

const mainnetTransport = { [bsc.id]: http("https://bsc.blockrazor.xyz") };
const testnetTransport = {
	[bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
};

export const config = getDefaultConfig({
	appName: "Shophekart",
	appDescription:
		"The World's First Platform for Buying, Selling, and Tokenizing Luxury Goods and More!",
	projectId: "5414a59b644946d2fd01f5710c4784ad",
	chains,
	appUrl: getOrigin(),
	appIcon: "/images/shared/favicon-500x500.png",
	transports:
		process.env.NODE_ENV === "production" ? mainnetTransport : testnetTransport,
	ssr: true,
});
