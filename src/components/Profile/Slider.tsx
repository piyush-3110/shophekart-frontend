"use client"
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
    <div>
      {/* Slider with clickable tabs */}
      <div className="text-lg font-[700] pt-32 px-32 text-[#6B6F93] flex gap-6 items-center">
        {/* Tab for Items */}
        <p
          onClick={() => setActiveTab('items')}
          className={`cursor-pointer ${activeTab === 'items' ? 'gradient-text !text-lg' : ''}`}
        >
          Items
        </p>
        {/* Tab for Items For Sale */}
        <p
          onClick={() => setActiveTab('itemsForSale')}
          className={`cursor-pointer ${activeTab === 'itemsForSale' ? 'gradient-text !text-lg' : ''}`}
        >
          Items For Sale
        </p>
        {/* Tab for Comments */}
        <p
          onClick={() => setActiveTab('comments')}
          className={`cursor-pointer ${activeTab === 'comments' ? 'gradient-text !text-lg' : ''}`}
        >
          Comments
        </p>
      </div>

      {/* Render the content based on the selected tab */}
      <div className="px-32">
        {renderContent()}
      </div>
    </div>
  );
};
