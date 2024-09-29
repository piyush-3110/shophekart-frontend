"use client";
import React, { useState } from 'react';

interface ItemCardProps {
  images: string[]; // Array of image URLs passed as a prop
}

const ItemCard: React.FC<ItemCardProps> = ({ images }) => {
  // Use the first image in the array as the default selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="bg-[#F4F6FA] shadow-sm p-4 rounded-lg h-[28rem] w-[90vw] md:w-[20rem] lg:w-[22rem]">
      {/* Main Image */}
      <div className="mb-4">
        <img
          className="w-full bg-[#F4F6FA] h-[80%] object-contain rounded-md"
          src={selectedImage}
          alt="Main Item"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((thumbnail, index) => (
          <img
            key={index}
            className={`w-full h-16 bg-white object-contain rounded-md cursor-pointer ${
              selectedImage === thumbnail ? 'border-1 border-blue-300' : ''
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
