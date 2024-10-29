"use client";

import { useState, useEffect } from "react";
import { IoClose } from 'react-icons/io5'; // Close icon
import Image from "next/image";
import { toast } from "react-toastify";
import Button from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import logo from "../../../../../public/images/shared/favicon.png";
import ToastNotification from "@/components/Form/ToastNotification";

// Define the metadata props
interface ModalMetadataProps {
  title: string;
  value: string;
}

// Define the modal props for controlling visibility
interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Metadata component
const ModalMetadata = ({ title, value }: ModalMetadataProps): JSX.Element => (
  <div className="flex justify-between items-center gap-2">
    <span className="text-[#6B6F93]">{title}</span>
    <span className="text-[#160041]">{value}</span>
  </div>
);

// Main StakeModal component
const StakeModal = ({ isOpen, onClose }: StakeModalProps) => {
  const [amount, setAmount] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value === "" || /^(\d*)\.?(\d){0,5}$/.test(value)) {
      if (value.startsWith(".")) {
        value = "0" + value;
      }
      setAmount(value);
    }
  };

  const handleComingSoon = () => {
    toast.info("Coming soon", { position: "bottom-left", autoClose: 2000 });
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

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose(); // Close modal if clicked outside content
        }
      }}
    >
      <div className="relative w-[90vw] max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <Image src={logo} alt="logo" className="w-8 h-8" />
          <h2 className="text-xl font-semibold">CSHOP Stake</h2>
        </div>

        {/* Modal Content */}
        <div className="grid gap-4">
          <ModalMetadata title="APR (fix rate)" value="25%" />
          <ModalMetadata title="Stake period" value="60 Days" />
          <ModalMetadata title="Remaining mining pool rewards" value="0" />

          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="font-semibold text-base">Amount</label>
            <div className="relative">
              <Input
                id="amount"
                value={amount}
                onChange={handleInputChange}
                placeholder="Type the amount."
                className="py-2"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">Max</button>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold">Preview</h3>
            <ModalMetadata title="Stake time" value="0" />
            <ModalMetadata title="Estimated earnings" value="0 CSHOP" />
            <ModalMetadata title="Maturity time" value="0" />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-4">
          <Button className="w-full" onClick={handleComingSoon}>Stake</Button>
          <ToastNotification />
        </div>
      </div>
    </div>
  );
};

export default StakeModal;
