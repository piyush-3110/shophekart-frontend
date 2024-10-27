import { cn } from "@/lib/utils";
import React from "react";
import ConnectWalletButton from "./ConnectWalletButton";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  title?: string;
  className?: string;
}

const ERROR_CLASSNAME =
  "container max-w-3xl mx-auto flex flex-col gap-4 justify-center items-center p-6";

export default function AccessDeniedMessage({
  className,
  text,
  title,
  ...props
}: Props) {
  return (
    <div {...props} className={cn(ERROR_CLASSNAME, className)}>
      {title && (
        <h2 className="font-bold text-lg text-red-500 mb-2">{title}</h2>
      )}
      {text ?? (
        <p className="text-lg text-center text-destructive">
          Unlock exclusive deals and rewards. To get started, simply connect
          your wallet. We&apos;ll take care of the rest.
        </p>
      )}
      <ConnectWalletButton />
    </div>
  );
}
