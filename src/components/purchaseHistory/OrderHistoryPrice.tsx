import React, { HtmlHTMLAttributes } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type TProps = {
  currencyType: string;
  soldPrice: number;
  className?: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

function OrderHistoryPrice({
  currencyType,
  soldPrice,
  className,
  ...props
}: TProps) {
  return (
    <div {...props} className={cn("flex gap-2 items-center", className)}>
      <p className="text-[#160041] text-sm">
        {`${soldPrice.toFixed(2)} ${currencyType}`}
      </p>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <InfoCircledIcon />
        </TooltipTrigger>
        <TooltipContent>{`${soldPrice} ${currencyType}`}</TooltipContent>
      </Tooltip>
    </div>
  );
}

export default OrderHistoryPrice;
