"use client";
import React, { useState } from "react";

const UploadImage = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="flex flex-wrap gap-5 space-x-2">
      {images.map((image, index) => (
        <div key={index} className="relative w-28 h-28 md:w-44 md:h-44">
          <img src={image} alt={`Product ${index}`} className="w-full h-full object-cover rounded-lg" />
          <button
            type="button" 
            onClick={() => handleImageDelete(index)}
            className="absolute top-0 right-0 px-1 bg-red-500 text-white hover:bg-red-700"
            style={{ transform: "translate(-30%, 20%)" }}
          >
            ✕
          </button>
        </div>
      ))}

      <label className="flex items-center justify-center w-28 h-28 md:w-44 md:h-44 border border-dashed border-gray-300 rounded-lg cursor-pointer">
        <input 
          type="file" 
          className="hidden" 
          onChange={handleImageUpload} 
          multiple 
        />
        <span className="text-blue-500 text-center">Upload image</span>
      </label>
    </div>
  );
};

export default UploadImage;
