/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import httpRequestService from '@/services/httpRequest.service';
import { useUserStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Loader from '../Form/Loader';
import ShippingModal from './ShippingModal';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreate: (shippingAddressId: string) => void;
}

export const UpdateShippingModal: React.FC<ModalProps> = ({ isOpen, onClose, onOrderCreate }) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    postalCode: "",
    address: "",
    state: "",
    city: "",
  });
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
 toast.error("No user found");
      return;
    }
setLoading(true)
    try {
      const response = await httpRequestService.postApi("/shipping-address/create", {
        ...formData,
        buyerId: user._id,
        isPrimary: true,
      });

      if (response.success) {
        const parentId = (response.data as any)._id;
        onOrderCreate(parentId);
     
        onClose(); // Close the modal after submission
      } else {
        alert(response.message || "Failed to create shipping address.");
      }
    } catch (error) {
      console.error("Error creating shipping address:", error);
    }
    finally {
      setLoading(false); // Reset loading to false after the request completes
    }
  };
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const response = await httpRequestService.fetchApi<any>("/shipping-address/me");

  
        if (response.success && response.data.length > 0) {
          const addressData = response.data[response.data.length - 1];

          setFormData({
            firstName: addressData.firstName || "",
            lastName: addressData.lastName || "",
            email: addressData.email||"", // Assuming email is not part of the response, leave it empty
            phoneNumber: addressData.phoneNumber || "",
            country: capitalizeFirstLetter(addressData.country || ""),
            postalCode: addressData.postalCode || "",
            address: addressData.address || "",
            state: addressData.state || "",
            city: addressData.city || "",
          });
        } else {
          // No data found, set all fields to empty
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            country: "",
            postalCode: "",
            address: "",
            state: "",
            city: "",
          });
        }
      } catch (error) {
        console.error("Error fetching shipping address:", error);
        // On error, you can also set fields to empty
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          country: "",
          postalCode: "",
          address: "",
          state: "",
          city: "",
        });
      }
    };
  
    if (isOpen) {
      fetchShippingAddress(); // Fetch the shipping address when the modal opens
      document.body.style.overflowX = "hidden"; // Prevent horizontal overflow
      document.body.style.overflowY = "hidden"; // Allow vertical scrolling
    } else {
      document.body.style.overflowX = "hidden"; // Restore horizontal scrolling
      document.body.style.overflowY = "auto"; // Restore vertical scrolling
    }

    return () => {
      document.body.style.overflowX = "hidden"; // Clean up to restore horizontal scrolling
      document.body.style.overflowY = "auto"; // Clean up to restore vertical scrolling
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="text-center py-4">
          <h1 className="text-xl font-bold text-[#160041] mb-6">Do you want to Update Shipping Details?</h1>
          
          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button className="gradient-button  !py-2 !px-6 "           onClick={handleOpenModal}
 >
              Update
            </button>
            {isModalOpen && (
        <ShippingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onOrderCreate= {onOrderCreate} 
          onClose1= {onClose}
        />
      )}
            <button className="bg-gradient-to-r from-green-500 to-[#1d4f08] text-white px-6 py-2 rounded-md font-semibold text-sm" onClick={handleSubmit}>
            {loading ? <Loader /> : "Buy Now"} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
