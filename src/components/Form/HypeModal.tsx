"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Close icon
import { toast } from "react-toastify"; // Import toast for notification (install react-toastify if not installed)

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HypeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Close the modal when clicking outside of it
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden"; // Prevent horizontal overflow
      document.body.style.overflowY = "hidden"; // Disable vertical scrolling
    } else {
      document.body.style.overflowX = "hidden"; // Restore horizontal scrolling
      document.body.style.overflowY = "auto"; // Restore vertical scrolling
    }
    return () => {
      document.body.style.overflowX = "hidden"; // Clean up horizontal scrolling
      document.body.style.overflowY = "auto"; // Clean up vertical scrolling
    };
  }, [isOpen]);

  // Show "Coming soon" message
  const handleComingSoon = () => {
    toast.info("AIShophee Coming soon", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] h-[80vh] bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto flex flex-col py-4 h-full">
       <Image src="/images/shared/aiShopee.png" alt="logo" height={540} width={540} className="h-[8rem] w-auto mx-auto mb-6"/>

          {/* First Text Area */}
          <label className="text-gray-700 font-medium mb-2">
            Enter a short description of your product, include the most important advantages of the item
          </label>
          <textarea
            className="w-full h-28 p-4 border border-gray-300 rounded-lg mb-6"
            placeholder="Write a short description here."
            
            onClick={handleComingSoon}
          ></textarea>

          {/* Second Text Area */}
          <label className="text-gray-700 font-medium mb-2">
            Here AIShophee will prepare a complete and advanced description for you
          </label>
          <textarea
            className="w-full h-28 p-4 border border-gray-300 rounded-lg mb-6"
            placeholder="AIShophee is preparing your description..."
          
            onClick={handleComingSoon}
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="gradient-button text-white"
          
              onClick={handleComingSoon}
            >
              Generate Description
            </button>
            <button className="gradient-border !rounded-sm text-[#3f5af7] font-[500] py-2 px-6  hover:text-[#445de9]"
             
              onClick={handleComingSoon}
            >
              Save & Use AIShophee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
