import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, bscTestnet } from "wagmi/chains";
import { http } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) throw new Error("Missing projectId");

const getOrigin = () => {
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	return "https://shophekart.com/"; // Fallback for SSR
};
console.log(getOrigin());

const chains =
	process.env.NODE_ENV === "production"
		? ([bsc] as const)
		: ([bscTestnet] as const);

const mainnetTransport = { [bsc.id]: http("https://bsc.blockrazor.xyz") };
const testnetTransport = {
	[bscTestnet.id]: http(
		"https://go.getblock.io/385f6d1db9654169ba861fba51fe03fb"
	),
};

export const config = getDefaultConfig({
	appName: "Shophekart",
	appDescription:
		"The World's First Platform for Buying, Selling, and Tokenizing Luxury Goods and More!",
	projectId,
	chains,
	appUrl: getOrigin(),
	appIcon: "/images/shared/favicon-500x500.png",
	transports:
		process.env.NODE_ENV === "production" ? mainnetTransport : testnetTransport,
	ssr: true,
});
