import React from "react";
import Rating from "./Rating";
import Image from "next/image";
import Link from "next/link";

const ItemInfoHeader = () => {
  return (
    <>
      <div className="rounded-xl bg-[#022BFF] w-fit px-3 py-1 text-white text-sm">
        Bags
      </div>
      <h1 className="text-[#160041] font-[700] text-xl">Camera Sling Bag</h1>
      <div className="flex gap-2 items-center">
        <h1 className="text-[#160041] font-[700] text-md">3.5</h1>
        <Rating ratingValue={3.5} />
        <h1 className="text-[#6B6F93] font-[700] text-sm">1980</h1>
        <div className="w-[1px] bg-[#6B6F93] h-4"></div>
        <h1 className="text-[#160041] font-[700] text-md">by Piyush</h1>
        <div className="w-[1px] bg-[#160041] h-4"></div>
        <div className="flex gap-1 items-center">
          <Image
            src="/images/itemDetails/contact.png"
            alt="logo"
            width={19}
            height={19}
          />
          <Link href="/" className="font-[700] text-sm text-[#0235FF]">
            Contact Seller
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemInfoHeader;
