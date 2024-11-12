import React, { Suspense } from "react";
import { BuyToken } from "./BuyToken";
import ShowUserBalancePresenter from "./ShowUserBalancePresenter";
import ReferralModal from "./ReferralModal";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import CircularProgress from "./CircularProgress";
import useGetTokenSaleStats from "@/hooks/web3/useGetTokenSaleStats";
import useGetProgressData from "@/hooks/web3/useGetProgressData";
import WalletAddressWithCopy from "@/components/shared/WalletAddressWithCopy";

export const Presale: React.FC = () => {
  const { completionPercentage } = useGetTokenSaleStats({ round: 1 });
  const { data: increasedPercent } = useGetProgressData();

  return (
    <div className="h-fit lg:h-[16rem] -translate-y-[50%] translate-x-[25%] absolute  md:w-fit justify-center mx-auto w-[95vw] bg-white border py-6 rounded-md shadow-lg lg:px-20 flex lg:items-center lg:flex-row px-4 flex-col lg:justify-end gap-6 lg:gap-20">
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
        <div className="flex flex-col gap-4 justify-center items-center">
          <CircularProgress
            percentage={completionPercentage + (increasedPercent ?? 0)}
          />
          <WalletAddressWithCopy
            className="font-normal gradient-text !text-base  px-2 py-1"
            walletAddress="0x9Ab5F58ec3D620F5d9D58d12Bf1ABF3560010A44"
            toastMessage="Token address copied!"
          />
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
