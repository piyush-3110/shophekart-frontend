"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const text1 = "Welcome to the Shophekart";
  const text2 = "Governance Platform!";

  const totalLength = text1.length + text2.length;
  const pauseTime = 30; // Adjust this to increase or decrease the pause after the full text appears

  // Function to handle the text animation sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => {
        // Pause when full text is shown before restarting
        if (prevIndex >= totalLength + pauseTime) {
          return 0; // Restart the animation
        }
        return prevIndex + 1;
      });
    }, 100); // Adjust the speed of the letter appearance

    return () => clearInterval(interval);
  }, [totalLength]);

  const renderTextWithEffect = (text: string, startIndex: number, index: number) => {
    return (
      <span>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-opacity duration-300 ${
              index >= startIndex + i ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            {char === " " ? "\u00A0" /* Render non-breaking space */ : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="flex relative lg:items-center pb-12 lg:pb-16 w-full  items-center md:items-start  lg:mt-0 px-8 md:px-12 min-h-[100vh] md:min-h-[20vh] lg:min-h-[90vh] justify-center gap-6">
      <div className="w-[90vw] md:w-[70vw] lg:w-[40vw]  flex flex-col  lg:items-start gap-4">
        <div className="text-black text-wrap w-full text-[23px] md:text-[34px] font-semibold ">
          <p>{renderTextWithEffect(text1, 0, textIndex)}</p>
          <p className="gradient-text !text-[22px] md:!text-[44px] whitespace-nowrap">
            {renderTextWithEffect(text2, text1.length, textIndex)}
          </p>
        </div>

        <p className="text-[#6B6F93] mt-4 w-full lg:w-auto lg:mt-0 font-[400] text-[16px] leading-[27.3px]">
        Your voice matters! As a valued member of Shophekart, you can propose, vote, and actively participate in shaping the future of platform. Here, transparency and community decision-making drive everything we do.

        </p>

        
          <button className="gradient-button text-white">Create Proposal</button>
         
        </div>
   
      <Image
        className=" w-[45vw] hidden lg:block"
        height={1014}
        width={1014}
        src="/images/dao/hero.jpg"
        alt="NFT"
      />
    
     
    </div>
  );
}
