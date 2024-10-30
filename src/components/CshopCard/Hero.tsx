import Image from "next/image";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const Hero = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center gap-24 ">
      <div className=" w-auto px-8 lg:px-0 lg:w-[40vw]">
        {/* Div for content */}
        <h1 className="text-wrap w-full text-[29px] md:text-[40px] font-semibold">
          CSHOP MasterCard: The{" "}
          <span className="gradient-text !text-[28px] md:!text-[40px] ">
            Future of Convenient{" "}
          </span>
          Cryptocurrency Spending
        </h1>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="gradient-button my-8 hover:cursor-not-allowed">
            Get Your Card
          </TooltipTrigger>
          <TooltipContent className="bg-secondary">
            coming soon Q1 2025
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="lg:block hidden mb-16 z-[1] relative mt-8 ">
        <Image
          alt="MasterCard"
          src="/images/homepage/Partners/mastercard1.png"
          height={524}
          width={524}
          className="h-[40vh] w-auto rotate-left"
        />
        <Image
          alt="MasterCard"
          src="/images/homepage/Partners/mastercard2.png"
          height={524}
          width={524}
          className="h-[50vh] w-auto absolute z-[1] top-0 -right-10 rotate-right"
        />
      </div>
      <div className="blob1" />
      {/* Div for mastercard */}
    </div>
  );
};
