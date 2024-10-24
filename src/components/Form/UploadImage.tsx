/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

interface UploadImageProps {
  onFileSelect: (files: File[]) => void; // Callback to pass selected files to the parent component
}

const UploadImage: React.FC<UploadImageProps> = ({ onFileSelect }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // URLs for previewing images

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file)); // Create image previews
      const fileArray = Array.from(files); // Keep files for uploading to the backend
      setImagePreviews([...imagePreviews, ...newImages]);

      // Pass the files to the parent component (for form submission)
      onFileSelect(fileArray);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedImages);
  };

  return (
    <div className="flex flex-wrap gap-5 space-x-2">
      {imagePreviews.map((image, index) => (
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
          accept="image/*" // Allow only images
        />
        <span className="text-blue-500 text-center">Upload image</span>
      </label>
    </div>
  );
};

export default UploadImage;
