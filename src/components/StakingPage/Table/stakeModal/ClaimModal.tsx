"use client";
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5'; // Close icon (install react-icons if not installed)

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  // Close the modal when clicking outside of it
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = 'hidden'; // Prevent horizontal overflow
      document.body.style.overflowY = 'hidden';   // Disable vertical scrolling
    } else {
      document.body.style.overflowX = 'hidden';   // Restore horizontal scrolling
      document.body.style.overflowY = 'auto';   // Restore vertical scrolling
    }
    return () => {
      document.body.style.overflowX = 'hidden';   // Clean up horizontal scrolling
      document.body.style.overflowY = 'auto';    // Clean up vertical scrolling
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-30 "
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] max-w-sm bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="flex justify-center items-center py-4 h-full">
          <h1 className="text-red-600 font-bold text-lg">Staking not started yet</h1>
        </div>
      </div>
    </div>
  );
};
