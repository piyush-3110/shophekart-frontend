/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import ItemInfoHeader from "./ItemInfoHeader";
import ItemDescriptionText from "./ItemDescriptionText";
import { toast } from "react-toastify";
import Loader from "../Form/Loader"; // Import the Loader component
import ToastNotification from "../Form/ToastNotification";

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
  const [loading, setLoading] = useState(false); // State for loading

  const handleBuyNow = async () => {
    setLoading(true); // Set loading to true when the buy now button is clicked
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
        toast.success("Order created successfully!"); // Show success toast notification
        console.log("Order created successfully:", data);
      } else {
        toast.error("Failed to create order"); // Show error toast notification
        console.error("Failed to create order:", response.statusText);
      }
    } catch (error) {
      toast.error("Error creating order"); // Show error toast notification
      console.error("Error creating order:", error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
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

      <button 
        className="gradient-button mt-3 !text-sm !w-fit"
        onClick={handleBuyNow}
        disabled={loading} // Disable button when loading
      >
        {loading ? <Loader /> : "Buy Now"} {/* Show loader when loading */}
        <ToastNotification />

      </button>
    </div>
  );
};
