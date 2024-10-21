"use client";
import React from "react";
import ItemInfoHeader from "./ItemInfoHeader";
import ItemDescriptionText from "./ItemDescriptionText";


interface ItemDescriptionProps {
  name: string;
  description: string;
  details: string;
  price: number;
  currencyType: string;
  stock: number;
  shippingType: string; // Shipping information
}

export const ItemDescription: React.FC<ItemDescriptionProps> = ({ name, description, details, price, currencyType, stock, shippingType }) => {
  return (
    <div className="flex flex-col gap-3 pl-4 md:pl-0 w-[95vw] md:w-[50vw] lg:w-[40vw]">
      <ItemInfoHeader name={name} stock={stock} />
      <ItemDescriptionText description={description} details={details} />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-[#160041] font-[700] text-xl">{price} {currencyType}</h1>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-[400] text-[#6B6F93]">{shippingType === 'LOCAL' ? 'Local Shipping' : 'Global Shipping'}</p>
        </div>
      </div>

      <button className="gradient-button mt-3 !text-sm !w-fit">Buy Now</button>
    </div>
  );
};
