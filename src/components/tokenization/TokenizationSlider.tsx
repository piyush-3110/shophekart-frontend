"use client";
import React, { useState, useEffect } from "react";
import Tokenization from "./Tokenization";
import Auction from "./Auction";

export const TokenizationSlider = () => {
  const [activeTab, setActiveTab] = useState("Tokenization");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Tokenization":
        return <Tokenization />;
      case "Auction":
        return <Auction />;

      default:
        return null;
    }
  };

  // Function to dynamically calculate the underline width and position
  const getUnderlineStyle = () => {
    let width, translateX;

    if (isSmallScreen) {
      // Adjust values for small screens (sm)
      switch (activeTab) {
        case "Tokenization":
          width = "115px"; // Underline width for "Active Proposal"
          translateX = "0%"; // Position of "Active Proposal" underline
          break;
        case "Auction":
          width = "70px"; // Underline width for "Completed Proposal"
          translateX = "130px"; // Adjust position for "Completed Proposal"
          break;

        default:
          width = "4rem";
          translateX = "0%";
      }
    } else {
      // Default values for medium and large screens (md, lg)
      switch (activeTab) {
        case "Tokenization":
          width = "125px";
          translateX = "0%";
          break;
        case "Auction":
          width = "85px";
          translateX = "160px";
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

  return (
    <div className="relative w-full py-6">
      {/* Slider with clickable tabs */}
      <div className=" text-lg md:text-xl font-[700]  px-6  text-white flex gap-5 md:gap-10 relative">
        {/* Tab for Active Proposal */}
        <p
          onClick={() => setActiveTab("Tokenization")}
          className={`cursor-pointer relative ${
            activeTab === "Tokenization"
              ? "gradient-text text-lg md:!text-xl"
              : ""
          }`}
        >
          Tokenization
        </p>
        {/* Tab for Completed Proposal */}
        <p
          onClick={() => setActiveTab("Auction")}
          className={`cursor-pointer relative ${
            activeTab === "completedProposal"
              ? "gradient-text text-lg  md:!text-xl"
              : ""
          }`}
        >
          Auction
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
      <div className="pt-6">{renderContent()}</div>
    </div>
  );
};
