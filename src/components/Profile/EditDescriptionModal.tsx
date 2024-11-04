"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useUserStore } from "@/store"; // Make sure to import your user store
import { envConfig } from "@/config/envConfig";

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
  const { user } = useUserStore(); // Assuming you have a user context/store

  
  const handleUpdateClick = async () => {
    if (!user || !user.walletAddress) {
      // Handle case where user is not found or wallet address is not available
      console.error("User wallet address is not available");
      return;
    }

    try {
      const response = await fetch( `${envConfig.BACKEND_URL}/user/update-description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: user.walletAddress, // Use the user's wallet address
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update description");
      }

      const data = await response.json();
     
      onUpdate(data.data.description); // Call the onUpdate callback with new description
      console.log(data.data.description);
      onClose();
    } catch (error) {
      console.error("Error updating description:", error);
      // Handle error (e.g., show a toast notification or an error message)
    }
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
    className="fixed inset-0 z-50 backdrop-blur-lg min-h-[100vh] translate-y-[-20%] flex items-center justify-center bg-black bg-opacity-40"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose(); // Close modal if clicked outside content
      }
    }}
  >
      <div className="relative  bg-white shadow-lg rounded-lg p-6">
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
          className="gradient-button hover:cursor-pointer mt-4 w-full py-2 text-white rounded transition duration-150"
        >
          Update
        </button>
      </div>
    </div>
  );
};
