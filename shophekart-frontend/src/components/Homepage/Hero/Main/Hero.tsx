"use client";
import Image from "next/image";
import { TextGenerateEffect} from "../../../ui/text-generate-effect";



export function Hero() {

  return <div className="flex items-center w-full px-12 min-h-[100vh] justify-center gap-4">
    <div className="w-[40vw] flex flex-col gap-4">

 <div className="text-black text-[44px] font-semibold">
  <p>Buy and Sell Items For</p>
  <p className="gradient-text !text-[44px]">CryptoCurrencies</p>
 </div>

<p className="#7e82a2">Empower Your Marketplace Experience. Seamlessly Connect Your Wallet to Buy, Sell, and Trade Unique Items with CSHOP Cryptocurrency in a Secure, Decentralized Platform</p>
    
    <div className="flex gap-4 items-center">
      <button className="gradient-button text-white">Join Now</button>
      <a href="#" className="font-semibold">Play Now</a>
    </div>
    </div>
    <Image className="h-[70vh] w-[40vw]" height={1024} width={1024} src="/images/homepage/house.png"></Image>
  </div>; 
}