"use client";
import Image from "next/image";
import { TextGenerateEffect } from "../../../ui/text-generate-effect";

export function Hero() {
  return (
    <div className="flex items-center w-full mt-10 px-12 min-h-[100vh] justify-center gap-6">
      <div className="w-[40vw] flex flex-col gap-4">
        <div className="text-black text-[44px] font-semibold">
          <p>Buy and Sell Items For</p>
          <p className="gradient-text !text-[44px]">CryptoCurrencies</p>
        </div>

        <p className="text-[#6B6F93] font-[400] text-[16px] leading-[27.3px]">
          Empower Your Marketplace Experience. Seamlessly Connect Your Wallet to
          Buy, Sell, and Trade Unique Items with CSHOP Cryptocurrency in a
          Secure, Decentralized Platform
        </p>

        <div className="flex gap-4 items-center mt-4">
          <button className="gradient-button text-white">Join Now</button>
          <a href="#" className="flex items-center font-semibold">
            {/* SVG for play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
            Play Now
          </a>
        </div>
      </div>
      <Image
        className="h-[80vh] w-[40vw]"
        height={1024}
        width={1024}
        src="/images/homepage/house.png"
        alt="House"
      />
    </div>
  );
}
