"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface EditPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  previousPrice: number;
  previousCurrencyType: string;
}

export const EditPriceModal: React.FC<EditPriceModalProps> = ({
  isOpen,
  onClose,
  previousPrice,
  previousCurrencyType,
}) => {
  const [newPrice, setNewPrice] = useState("");
  const [currencyType, setCurrencyType] = useState("Select Currency Type");

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyType(e.target.value);
  };

  const handleNewPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(e.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Submitted with New Price:", newPrice, "Currency Type:", currencyType);
    onClose();
  };

  

  return (
    <div
      className="fixed inset-0 w-full min-h-[100vh] z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] md:w-[50vw] bg-white shadow-lg rounded-lg p-6">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <h1 className="text-[#160041] font-[700] text-center text-xl mb-6">Edit Price</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600 text-sm font-medium">Previous Price</label>
            <input
              type="text"
              value={previousPrice}
              readOnly
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium">Currency Type</label>
            <input
              type="text"
              value={previousCurrencyType}
              readOnly
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium">New Price</label>
            <input
              type="number"
              value={newPrice}
              onChange={handleNewPriceChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Enter new price"
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium">Currency Type</label>
            <select
              value={currencyType}
              onChange={handleCurrencyChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            >
              {[
                "Select Currency Type",
                "USDT",
                "BNB",
                "CSHOP",
                "USDC",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-start">
          <button onClick={handleSubmit} className="gradient-button px-4 py-2 rounded-md text-white">
           Update
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component to demonstrate the modal with a button to open it
const ExampleComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Open Edit Price Modal
      </button>

      <EditPriceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        previousPrice={100}
        previousCurrencyType="USD"
      />
    </div>
  );
};

export default ExampleComponent;
