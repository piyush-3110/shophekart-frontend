"use client";
import React, { useState } from 'react';
import {  SoldItems } from './SoldItems';
import { ItemsForSale } from './ItemsForSale';
import { ReviewCard } from '../ItemDetails/ReviewCard';

export const Slider = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('items');

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'items':
        return <SoldItems />;
      case 'itemsForSale':
        return <ItemsForSale />;
      case 'comments':
        return <ReviewCard />;
      default:
        return null;
    }
  };

  // Function to dynamically calculate the underline width and position
  const getUnderlineStyle = () => {
    let width, translateX;
    switch (activeTab) {
      case 'items':
        width = '90px'; // Underline width for "Items"
        translateX = '0%'; // Position of "Items" underline
        break;
      case 'itemsForSale':
        width = '124px'; // Underline width for "Items For Sale"
        translateX = '133px'; // Adjust the position for the "Items For Sale" underline
        break;
      case 'comments':
        width = '6rem'; // Underline width for "Comments"
        translateX = '297px'; // Adjust the position for the "Comments" underline
        break;
      default:
        width = '4rem';
        translateX = '0%';
    }
    return {
      width,
      transform: `translateX(${translateX})`,
    };
  };

  return (
    <div className="relative w-full">
      {/* Slider with clickable tabs */}
      <div className="text-lg font-[700] pt-32 px-32 text-[#B9B2C6] flex gap-10 items-center relative">
        {/* Tab for Items */}
        <p
          onClick={() => setActiveTab('items')}
          className={`cursor-pointer relative ${activeTab === 'items' ? 'gradient-text !text-lg' : ''}`}
        >
          Sold Items
        </p>
        {/* Tab for Items For Sale */}
        <p
          onClick={() => setActiveTab('itemsForSale')}
          className={`cursor-pointer relative ${activeTab === 'itemsForSale' ? 'gradient-text !text-lg' : ''}`}
        >
          Items For Sale
        </p>
        {/* Tab for Comments */}
        <p
          onClick={() => setActiveTab('comments')}
          className={`cursor-pointer relative ${activeTab === 'comments' ? 'gradient-text !text-lg' : ''}`}
        >
          Comments
        </p>

        {/* Underline effect */}
        <div
          className="absolute bottom-0 h-[2px] transition-all  duration-300"
          style={{
            ...getUnderlineStyle(), // Apply the dynamic underline width and position
            background: 'linear-gradient(91.75deg, #01F6FF -12.59%, #017EFF 19.66%, #0127FF 68.04%)',
          }}
        />
      </div>

      {/* Render the content based on the selected tab */}
      <div className="px-32">
        {renderContent()}
      </div>
    </div>
  );
};
