import React from "react";
import Rating from "./Rating";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ItemInfoHeaderProps {
  name: string;
  stock: number;
  stars: number;
  reviewCount: number;
}

const ItemInfoHeader: React.FC<ItemInfoHeaderProps> = ({
  name,
  stock,
  stars,
  reviewCount,
}) => {
  return (
    <>
      <h1 className="text-[#160041] font-[700] text-xl">{name}</h1>
      <div className="flex gap-2 items-center">
        <Rating ratingValue={stars} />
        <h1 className="text-[#6B6F93] font-[700] text-sm">{reviewCount}</h1>
        <div className="w-[1px] bg-[#6B6F93] h-4"></div>
        <h1 className="text-[#160041] font-[700] text-md">Stock: {stock}</h1>
        <div className="flex gap-1 items-center">
          <Image
            src="/images/itemDetails/contact.png"
            alt="logo"
            width={19}
            height={19}
          />
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="font-[700] text-sm text-[#0235FF] cursor-not-allowed">
              Contact seller
            </TooltipTrigger>
            <TooltipContent className="bg-secondary">
              Coming soon...
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default ItemInfoHeader;
