import React, { Suspense } from "react";
import { BuyToken } from "./BuyToken";
import ShowUserBalancePresenter from "./ShowUserBalancePresenter";
import ReferralModal from "./ReferralModal";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import CircularProgress from "./CircularProgress";
import useGetTokenSaleStats from "@/hooks/web3/useGetTokenSaleStats";

export const Presale: React.FC = () => {
  const { completionPercentage } = useGetTokenSaleStats({ round: 1 });

  return (
    <div className="h-fit lg:h-[16rem] md:w-auto w-[95vw] bg-white border py-6 rounded-md shadow-lg lg:px-20 flex lg:items-center lg:flex-row px-4 flex-col lg:justify-end gap-6 lg:gap-20">
      <div>
        <div className="flex gap-4 mb-6">
          <h1 className="text-lg lg:text-left text-center text-black font-semibold">
            Seed round progress:
          </h1>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <InfoCircledIcon />
            </TooltipTrigger>
            <TooltipContent>Price: $0.003</TooltipContent>
          </Tooltip>
        </div>

        {/* Circular Progress display */}
        <div className="flex justify-center items-center">
          <CircularProgress percentage={completionPercentage} />
        </div>
      </div>

      <div className="h-[12rem] hidden lg:block border border-[#f1eeee]"></div>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <div className="flex gap-2 items-center mb-4">
            <h1 className="text-lg text-black font-semibold">Referral Code:</h1>
            <ReferralModal />
          </div>
          <ShowUserBalancePresenter />
          <BuyToken />
        </div>
      </Suspense>
    </div>
  );
};
