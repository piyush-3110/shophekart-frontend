"use client"
import React, { useState } from 'react';

const ItemCard = () => {
  // State to keep track of the currently selected image
  const [selectedImage, setSelectedImage] = useState('https://via.placeholder.com/300x200');

  // List of thumbnail images
  const thumbnails = [
    'https://via.placeholder.com/300x200', // Default main image
    'https://via.placeholder.com/300x201',
    'https://via.placeholder.com/300x202',
    'https://via.placeholder.com/300x203',
  ];

  return (
    <div className=" bg-[#F4F6FA] shadow-sm p-4 rounded-lg w-[22rem]">
      {/* Main Image */}
      <div className=" mb-4">
        <img
          className="w-full bg-[#F4F6FA] h-[14rem] object-cover rounded-md"
          src={selectedImage}
          alt="Main Item"
        />
      </div>

      {/* Thumbnails */}
      <div className=" grid grid-cols-4 gap-2">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            className={` w-full h-16 bg-white object-cover rounded-md cursor-pointer ${
              selectedImage === thumbnail ? 'border-2 border-blue-500' : ''
            }`}
            src={thumbnail}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(thumbnail)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
