"use client";

import ProjectTiming from "@/components/tokenization/ProjectTiming";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#000] px-10 py-12 w-[100vw] min-h-[100vh]">
      <div className="flex justify-between full">
        <div className="w-[65vw] px-6 flex flex-col  justify-center rounded-2xl py-6 min-h-fit bg-[#0f1113]">
          <div className=" w-full mx-auto rounded-xl  object-contain bg-no-repeat">
            <Image
              src="/images/tokenization/featured.png"
              alt="Featured"
              height={720}
              width={720}
              className="w-full  mx-auto rounded-xl h-full"
            />
          </div>
          <div className="my-4 ">
            <div className="flex gap-4">
              <Image
                src="/images/tokenization/icon.png"
                alt="icon"
                height={70}
                width={70}
                className="h-12 w-auto"
              />

              <div className="flex flex-col justify-center">
                <h1 className="text-[#fff] text-2xl font-bold">Tokenization</h1>
                <p className="text-[#635f5f]">AI CASPER</p>
              </div>
            </div>
            <div className="text-[#635f5f] mt-3 text-lg">
              <p className="">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
                vitae, magnam repudiandae quia animi eius! Quidem laudantium
                ipsam dicta aliquam aut perspiciatis, magnam maiores consequatur
                eum porro voluptates aliquid voluptatem.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <ProjectTiming />
          <div className="flex !text-lg text-white gap-1 items-center">
            <h1 className="  !text-lg">
              Referral Earning {"(BNB)"}:{" "}
              <span className="gradient-text !text-lg">0.00</span>
            </h1>
          </div>
          <div className="flex !text-lg text-white gap-1 items-center">
            <h1 className=" !text-lg">
              Referral Earning {"(USDT)"}:{" "}
              <span className="gradient-text !text-lg">0.00</span>
            </h1>
          </div>
          <div>{/* here keep the bidding token form */}</div>
        </div>
      </div>
    </div>
  );
};
export default page;
