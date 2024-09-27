import Image from "next/image";
import React from "react";

const Timeline = () => {
  return (
    <>
      <div className="">
        <div className="h-[100vh] bg-[#47597C] w-[1px] mx-auto relative">
          {/* Centering the image horizontally on the line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 z-10">
            <Image
              src="/images/CShopCard/timeline/logo1.png"
              alt="logo1"
              height={204}
              width={204}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
