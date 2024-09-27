"use client";

import { config } from "@/config";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Constants
const CHECK_ICON_SRC = "/icons/greenCheckIcon.svg";
const CHECK_ICON_SIZE = 18;
const ADDRESS_DISPLAY_LENGTH = 7;
const CONNECTED_BUTTON_CLASS = "text-[#02BC7D]";
const DISCONNECTED_BUTTON_CLASS = "border border-[#022AFF] text-[#022AFF]";

const ConnectWalletButton = () => {
  const { open } = useWeb3Modal();
  const { address: walletAddress, isConnecting } = useAccount({ config });

  const handleClick = () => {
    open();
  };

  return (
    <button
      type="button"
      aria-label={walletAddress ? "Disconnect wallet" : "Connect wallet"}
      disabled={isConnecting}
      {...(isConnecting
        ? { "aria-busy": true, "aria-disabled": true }
        : { "aria-busy": false, "aria-disabled": false })}
      className={cn(
        "hover:bg-blue-100/50 py-2 px-4 rounded-sm",
        !walletAddress || isConnecting
          ? DISCONNECTED_BUTTON_CLASS
          : CONNECTED_BUTTON_CLASS
      )}
      onClick={handleClick}
    >
      {isConnecting ? (
        <span>Connecting...</span>
      ) : walletAddress ? (
        <div className="flex gap-1 items-center">
          <Image
            src={CHECK_ICON_SRC}
            alt="Connected wallet checkmark"
            width={CHECK_ICON_SIZE}
            height={CHECK_ICON_SIZE}
            aria-hidden={true}
          />
          <span>{walletAddress.slice(0, ADDRESS_DISPLAY_LENGTH)}...</span>
        </div>
      ) : (
        <span>Connect wallet</span>
      )}
    </button>
  );
};

export default ConnectWalletButton;
