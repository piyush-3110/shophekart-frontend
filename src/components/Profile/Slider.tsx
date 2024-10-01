"use client";
import React, { useState } from 'react';
import { Items } from './Items';
import { ItemsForSale } from './ItemsForSale';
import { ReviewCard } from '../ItemDetails/ReviewCard';

export const Slider = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('items');

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'items':
        return <Items />;
      case 'itemsForSale':
        return <ItemsForSale />;
      case 'comments':
        return <ReviewCard />;
      default:
        return null;
    }
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
          Items
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
          className="absolute bottom-0 h-1 w-full transition-all duration-300"
          style={{
            transform:
              activeTab === 'items'
                ? 'translateX(0%)'
                : activeTab === 'itemsForSale'
                ? 'translateX(150%)'
                : 'translateX(400%)',
            width: '4rem', // Ensures the underline takes up one-third of the total width
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
