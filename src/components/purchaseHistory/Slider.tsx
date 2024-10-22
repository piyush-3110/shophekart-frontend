"use client";
import React, { useState, useEffect } from 'react';
import BuyerHistory from './BuyerHistory';

export const Slider = () => {
  const [activeTab, setActiveTab] = useState('buyerHistory');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size to adjust underline width/position for small screens
  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768); // Consider "md" as the breakpoint (768px)
  };

  useEffect(() => {
    // Initial check on mount
    updateScreenSize();
    // Add event listener to handle screen resize
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'buyerHistory':
        return <BuyerHistory />;
    
   
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
        case 'buyerHistory':
          width = '60px'; // Underline width for "Items"
          translateX = '0%'; // Position of "Items" underline
          break;
        case 'sellerHistory':
          width = '60px'; // Underline width for "Items For Sale"
          translateX = '150px'; // Adjust position for "Items For Sale"
          break;
     
        default:
          width = '4rem';
          translateX = '0%';
      }
    } else {
      // Default values for medium and large screens (md, lg)
      switch (activeTab) {
        case 'buyerHistory':
          width = '120px';
          translateX = '0%';
          break;
        case 'sellerHistory':
          width = '120px';
          translateX = '160px';
          break;
       
        default:
          width = '4rem';
          translateX = '0%';
      }
    }

    return {
      width,
      transform: `translateX(${translateX})`,
    };
  };

  return (
    <div className="relative  w-full">
      {/* Slider with clickable tabs */}
      <div className="text-lg font-[700]  px-6 pt-6  text-[#B9B2C6] flex gap-10 buyerHistory-center relative">
        {/* Tab for Items */}
        <p
          onClick={() => setActiveTab('buyerHistory')}
          className={`cursor-pointer relative ${activeTab === 'buyerHistory' ? 'gradient-text !text-lg' : ''}`}
        >
        Buyer History
        </p>
        {/* Tab for Items For Sale */}
      
        {/* Tab for Comments */}
     

        {/* Underline effect */}
        <div
          className="absolute bottom-0 h-[2px] transition-all duration-300"
          style={{
            ...getUnderlineStyle(), // Apply the dynamic underline width and position
            background: 'linear-gradient(91.75deg, #01F6FF -12.59%, #017EFF 19.66%, #0127FF 68.04%)',
          }}
        />
      </div>

      {/* Render the content based on the selected tab */}
      <div className="px-6 pt-6">
        {renderContent()}
      </div>
    </div>
  );
};
