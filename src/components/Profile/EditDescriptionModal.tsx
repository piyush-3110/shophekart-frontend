"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface EditDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (newDescription: string) => void; // Callback to handle description update
}

export const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [description, setDescription] = useState("");

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUpdateClick = () => {
    onUpdate(description); // Call the update function with the new description
    onClose();
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full min-h-[100vh] z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <h2 className="text-[#160041] font-semibold text-center text-xl mb-4">Edit Description</h2>
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your description here..."
          className="w-full h-32 border border-gray-300 rounded p-2 resize-none focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleUpdateClick}
          className="gradient-button mt-4 w-full py-2 text-white rounded transition duration-150"
        >
          Update
        </button>
      </div>
    </div>
  );
};
