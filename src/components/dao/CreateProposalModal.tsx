"use client"
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5'; // Close icon (install react-icons if not installed)


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProposalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
      document.body.style.overflowY = 'hidden';   // Allow vertical scrolling
    } else {
      document.body.style.overflowX = 'hidden';   // Restore horizontal scrolling
      document.body.style.overflowY = 'auto';   // Restore vertical scrolling
    }
    return () => {
      document.body.style.overflowX = 'hidden';   // Clean up to restore horizontal scrolling
      document.body.style.overflowY = 'auto';    // Clean up to restore vertical scrolling
    };
  }, [isOpen]);
  

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] h-[90vh] bg-white shadow-lg rounded-lg p-6">
       
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        
        <div className="overflow-y-auto flex flex-col py-4  h-full">
        <h1 className="text-[#160041] font-[700] text-center text-xl">Order History</h1>
        <textarea
            className="border rounded-lg p-4 mb-4 w-full h-40 placeholder-gray-400"
            placeholder="Create Proposal"
          />
          <button className="text-white gradient-button">
            Submit
          </button>
        </div>
      </div>
</div>

  );
};

