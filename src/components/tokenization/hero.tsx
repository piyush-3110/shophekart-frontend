"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const text1 = "Coming Soon: Tokenization Framework for";
  const text2 = "High-Value Items";

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
    <div className="flex relative lg:items-center pb-12 lg:pb-16 w-full  items-center md:items-start  lg:mt-0 px-8 md:px-12 min-h-[100vh] md:min-h-[20vh] lg:min-h-[100vh] justify-center gap-6">
      <div className="w-[90vw] md:w-[70vw] lg:w-[40vw]  flex flex-col  lg:items-start gap-4">
        <div className="text-black text-wrap w-full text-[23px] md:text-[38px] font-semibold ">
          <p>{renderTextWithEffect(text1, 0, textIndex)}</p>
          <p className="gradient-text !text-[22px] md:!text-[44px] whitespace-nowrap">
            {renderTextWithEffect(text2, text1.length, textIndex)}
          </p>
        </div>

        <p className="text-[#6B6F93] mt-4 w-full lg:w-auto lg:mt-0 font-[400] text-[16px] leading-[27.3px]">
        At Shophekart, we&apos;re revolutionizing the way people invest in luxury goods by offering tokenization for high-value assets. Our upcoming tokenization framework will allow users to tokenize, fractionalize, auction and trade ownership of some of the most sought-after items in the world.

        </p>

        {/* <div className="flex gap-4 items-center mt-4">
          <button className="gradient-button text-white">Join Now</button>
          <a href="#" className="flex items-center font-semibold">
          
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
        </div> */}
      </div>
      <Image
        className="h-[80vh] w-[40vw] hidden lg:block"
        height={1014}
        width={1014}
        src="/images/tokenization/hero1.jpg"
        alt="NFT"
      />
    
     
    </div>
  );
}
