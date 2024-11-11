// "use client";

import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ConnectWalletButton() {
	const router = useRouter();
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				const ready = mounted && authenticationStatus !== "loading";
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus || authenticationStatus === "authenticated");

				// Constants
				const CHECK_ICON_SRC = "/icons/greenCheckIcon.svg";
				const CHECK_ICON_SIZE = 18;
				const CONNECTED_BUTTON_CLASS = "text-[#02BC7D]";
				const DISCONNECTED_BUTTON_CLASS =
					"border border-[#022AFF] text-[#022AFF]";

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										onClick={() => {
											openConnectModal();
											router.refresh();
										}}
										className={cn(
											"hover:bg-blue-100/50 py-2 px-4 rounded-sm",
											DISCONNECTED_BUTTON_CLASS
										)}
										type="button"
									>
										Connect Wallet
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
									>
										Wrong network
									</button>
								);
							}

							return (
								<button
									onClick={openAccountModal}
									className={cn(
										"hover:bg-blue-100/50 py-2 px-4 rounded-sm",
										CONNECTED_BUTTON_CLASS
									)}
									type="button"
								>
									<div className="flex gap-1 items-center">
										<Image
											src={CHECK_ICON_SRC}
											alt="Connected wallet checkmark"
											width={CHECK_ICON_SIZE}
											height={CHECK_ICON_SIZE}
											aria-hidden={true}
										/>
										<span> {account.displayName}</span>
									</div>
								</button>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
