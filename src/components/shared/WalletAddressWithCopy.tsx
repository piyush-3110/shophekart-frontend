import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { HTMLAttributes } from "react";

type TProps = { walletAddress: `0x${string}`, className?: string } & HTMLAttributes<HTMLDivElement>

function WalletAddressWithCopy({ walletAddress, className, ...props }: TProps) {
    return <div {...props} className={cn("flex items-center gap-4 text-[#160041] font-[700] text-xl", className)}>
        <h1>
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </h1>
        <button
            onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                toast({ title: "Wallet address successfully copied" });
            }}
        >
            <Copy className="text-gray-500 hover:text-primary" size={18} />
        </button>
    </div>;
}

export default WalletAddressWithCopy
