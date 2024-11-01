import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { FC } from "react"
import { cn } from "@/lib/utils"

const TrustScoreWithTooltip: FC<TProps> = ({ trustScore }) => {
    return (
        <div className={cn("flex gap-3 items-center")}>
            <h1 className="text-[#160041] font-[700] text-md">
                Trust score:{" "}
                <span className="text-gray-500 text-sm">{trustScore}</span>
            </h1>
            <Tooltip delayDuration={100}>
                <TooltipTrigger>
                    <InfoCircledIcon />
                </TooltipTrigger>
                <TooltipContent>
                    Trust score is a measure of the reliability
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default TrustScoreWithTooltip

type TProps = {
    trustScore: number
}
