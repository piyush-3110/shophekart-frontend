import React from 'react';

const ItemCard = () => {
  return (
    <div className="item-card-container bg-[#F4F6FA] p-4 rounded-lg w-80">
      {/* Main Image */}
      <div className="main-image-container mb-4">
        <img
          className="w-full h-48 object-cover rounded-md"
          src="https://via.placeholder.com/300x200"
          alt="Main Item"
        />
      </div>

      {/* Thumbnails */}
      <div className="thumbnails-container grid grid-cols-4 gap-2">
        <img
          className="thumbnail w-full h-16 object-cover rounded-md"
          src="https://via.placeholder.com/100x100"
          alt="Thumbnail 1"
        />
        <img
          className="thumbnail w-full h-16 object-cover rounded-md"
          src="https://via.placeholder.com/100x100"
          alt="Thumbnail 2"
        />
        <img
          className="thumbnail w-full h-16 object-cover rounded-md"
          src="https://via.placeholder.com/100x100"
          alt="Thumbnail 3"
        />
        <img
          className="thumbnail w-full h-16 object-cover rounded-md"
          src="https://via.placeholder.com/100x100"
          alt="Thumbnail 4"
        />
      </div>
    </div>
  );
};

export default ItemCard;
