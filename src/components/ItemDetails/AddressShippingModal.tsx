/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5"; // Close icon
import Button, { ButtonType, ButtonShape } from "@/components/shared/Button";
import httpRequestService from "@/services/httpRequest.service";

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (addressId: string) => void;
}

const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
 
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await httpRequestService.fetchApi<any>("/shipping-address/me");
        console.log("Fetched Addresses:", response);
        
        if (response.success) {
          setAddresses(response.data);
        } else {
          alert(response.message || "Failed to fetch addresses.");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        alert("An error occurred while fetching addresses.");
      }
    };

    if (isOpen) {
      fetchAddresses();
      document.body.style.overflowY = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflowY = "auto"; // Restore scrolling
    }

    return () => {
      document.body.style.overflowY = "auto"; // Clean up scrolling on close
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-3xl bg-white shadow-lg rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Select Shipping Address
        </h2>

        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => onAddressSelect(address._id)}
              >
                <p className="font-semibold text-gray-800">{address.firstName} {address.lastName}</p>
                <p className="text-gray-700">{address.address}</p>
                <p className="text-gray-700">
                  {address.city}, {address.state}, {address.postalCode}
                </p>
                <p className="text-gray-700">{address.country}</p>
                <p className="text-gray-500 text-sm">{address.phoneNumber}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No addresses found.</p>
        )}

        <Button
          onClick={onClose}
          type={ButtonType.BUTTON}
          shape={ButtonShape.ROUND}
          className="mt-6"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AddressSelectionModal;
