"use client";
import React, { useState, useEffect } from "react";
import SoldItems from "./SoldItems";
import ItemsForSale from "./ItemsForSale";
import { ReviewSection } from "./ReviewSection";
import { useUserStore } from "@/store";
import AccessDeniedMessage from "../shared/AccessDeniedMessage";

export const Slider = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { user } = useUserStore();

  // Detect screen size to adjust underline width/position for small screens
  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768); // Consider "md" as the breakpoint (768px)
  };

  useEffect(() => {
    // Initial check on mount
    updateScreenSize();
    // Add event listener to handle screen resize
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // Function to dynamically calculate the underline width and position
  const getUnderlineStyle = () => {
    let width, translateX;

    if (isSmallScreen) {
      // Adjust values for small screens (sm)
      switch (activeTab) {
        case "items":
          width = "60px"; // Underline width for "Items"
          translateX = "0%"; // Position of "Items" underline
          break;
        case "itemsForSale":
          width = "80px"; // Underline width for "Items For Sale"
          translateX = "100px"; // Adjust position for "Items For Sale"
          break;
        case "comments":
          width = "80px"; // Underline width for "Comments"
          translateX = "240px"; // Adjust position for "Comments"
          break;
        default:
          width = "4rem";
          translateX = "0%";
      }
    } else {
      // Default values for medium and large screens (md, lg)
      switch (activeTab) {
        case "items":
          width = "90px";
          translateX = "0%";
          break;
        case "itemsForSale":
          width = "124px";
          translateX = "133px";
          break;
        case "comments":
          width = "6rem";
          translateX = "297px";
          break;
        default:
          width = "4rem";
          translateX = "0%";
      }
    }

    return {
      width,
      transform: `translateX(${translateX})`,
    };
  };

  if (!user) return <AccessDeniedMessage />;

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "items":
        return <SoldItems />;
      case "itemsForSale":
        return <ItemsForSale />;
      case "comments":
        return <ReviewSection targetId={user._id} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      {/* Slider with clickable tabs */}
      <div className="text-lg font-[700] pt-32 px-6 md:px-16 lg:px-32 text-[#B9B2C6] flex gap-10 items-center relative">
        {/* Tab for Items */}
        <p
          onClick={() => setActiveTab("items")}
          className={`cursor-pointer relative ${
            activeTab === "items" ? "gradient-text !text-lg" : ""
          }`}
        >
          Sold Items
        </p>
        {/* Tab for Items For Sale */}
        <p
          onClick={() => setActiveTab("itemsForSale")}
          className={`cursor-pointer relative ${
            activeTab === "itemsForSale" ? "gradient-text !text-lg" : ""
          }`}
        >
          Items For Sale
        </p>
        {/* Tab for Comments */}
        <p
          onClick={() => setActiveTab("comments")}
          className={`cursor-pointer relative ${
            activeTab === "comments" ? "gradient-text !text-lg" : ""
          }`}
        >
          Comments
        </p>

        {/* Underline effect */}
        <div
          className="absolute bottom-0 h-[2px] transition-all duration-300"
          style={{
            ...getUnderlineStyle(), // Apply the dynamic underline width and position
            background:
              "linear-gradient(91.75deg, #01F6FF -12.59%, #017EFF 19.66%, #0127FF 68.04%)",
          }}
        />
      </div>

      {/* Render the content based on the selected tab */}
      <div className="px-6 md:px-16 lg:px-32">{renderContent()}</div>
    </div>
  );
};
