"use client";
import React, { useState } from "react";
import ItemInfoHeader from "./ItemInfoHeader";
import ItemDescriptionText from "./ItemDescriptionText";
import Countdown from "./CountDown";
import BidSection from "./BidSection";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

export const ItemDescription = () => {
  const [selectedSize, setSelectedSize] = useState<string>("S"); 
  const [selectedColor, setSelectedColor] = useState<string>("yellow");

  const handleSizeClick = (size: string) => {
    setSelectedSize(size); 
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color); 
  };

  const colors = [
    { color: "yellow", hex: "#FFD700" },
    { color: "blue", hex: "#0000FF" },
    { color: "green", hex: "#008000" },
    { color: "red", hex: "#FF0000" },
  ];

  return (
    <div className="flex flex-col gap-3 pl-4 md:pl-0 w-[95vw] md:w-[50vw] lg:w-[40vw]">
      <ItemInfoHeader />
      <ItemDescriptionText />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-sm text-[#160041] font-[400]">Auction Ends In:</h1>
          <Countdown targetDate="2024-10-10T15:30:00Z" />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-[400] text-[#6B6F93]">Global Shipping</p>
        </div>
      </div>
      <BidSection />
      <div className="flex gap-8 items-start">
        <SizeSelector
          selectedSize={selectedSize}
          handleSizeClick={handleSizeClick}
        />
        <ColorSelector
          selectedColor={selectedColor}
          handleColorClick={handleColorClick}
          colors={colors}
        />
      </div>
      <button className="gradient-button mt-3 !text-sm !w-fit">Place a bid</button>
    </div>
  );
};
