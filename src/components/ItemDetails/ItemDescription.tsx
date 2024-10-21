/* eslint-disable @typescript-eslint/no-unused-vars */
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
  buyerId: string;
  shippingDuration: number;
  stock: number;
  id: string;
  shippingType: string; // Shipping information
  tokenId: number;
  productIdOnChain: string;
  shippingCharges: number;
}

export const ItemDescription: React.FC<ItemDescriptionProps> = ({
  name,
  description,
  details,
  price,
  shippingCharges,
  shippingDuration,
  productIdOnChain,
  tokenId,
  id, // This is productId
  buyerId,
  currencyType,
  stock,
  shippingType,
}) => {
  const handleBuyNow = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: buyerId, // Buyer ID from props
          deliveryBy: new Date(new Date().setDate(new Date().getDate() + shippingDuration)).toISOString().split("T")[0], // Calculate delivery date based on shippingDuration
          productId: id, // Product ID (same as id in props)
          shippingPrice: shippingCharges, // Shipping price from props
          tokenId: tokenId, // Token ID as a number
          productIdOnChain: productIdOnChain, // Product ID on the blockchain
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created successfully:", data);
        // You can add more logic here, such as showing a success message or redirecting
      } else {
        console.error("Failed to create order:", response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle network or other errors
    }
  };

  return (
    <div className="flex flex-col gap-3 pl-4 md:pl-0 w-[95vw] md:w-[50vw] lg:w-[40vw]">
      <ItemInfoHeader name={name} stock={stock} />
      <ItemDescriptionText description={description} details={details} />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-[#160041] font-[700] text-xl">
          {price} {currencyType}
        </h1>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-[400] text-[#6B6F93]">
            {shippingType === "LOCAL" ? "Local Shipping" : "Global Shipping"}
          </p>
        </div>
      </div>

      <button className="gradient-button mt-3 !text-sm !w-fit" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};
