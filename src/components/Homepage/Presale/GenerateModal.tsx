"use client";
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateModal: React.FC<SimpleModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';   
    }
    return () => {
      document.body.style.overflow = 'auto';    
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Input Value:", inputValue);
    onClose(); 
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] md:w-[35rem] px-6 py-4 bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col h-full py-4 gap-3">

          {/* Text Input */}
          <input
            type="text"
            className="border border-[#EFF1F7] w-full p-2 rounded bg-[#F9FBFC] text-[#302f2f] mb-4"
            placeholder="Enter referral text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          {/* Submit Button */}
          <button
            className="gradient-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
