/* eslint-disable @typescript-eslint/no-explicit-any */
// ShippingModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5"; // Close icon
import { Input } from "@/components/ui/input";
import Button, { ButtonType, ButtonShape } from "@/components/shared/Button";
import httpRequestService from "@/services/httpRequest.service";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store";
import { Country } from "country-state-city";
interface ShippingField {
    id: string;
    label: string;
    type?: "email" | "tel" | "text";
    placeholder: string;
    className?: string;
    colSpan?: number;
  }
const ShippingFields: ShippingField[] = [
    {
      id: "firstName",
      label: "First name",
      placeholder: "E.g. Jordan",
      type: "text",
    },
    {
      id: "lastName",
      label: "Last name",
      placeholder: "E.g. Smith",
      type: "text",
    },
    {
      id: "userEmail",
      label: "Email address",
      placeholder: "E.g. jordan@mail.com",
      type: "email",
    },
    {
      id: "phoneNumber",
      label: "Phone number",
      placeholder: "+ 156 555 2568",
      type: "tel",
    },
    {
      id: "country",
      label: "Country",
      placeholder: "Select the country",
      type: "text",
    },
    {
      id: "postalCode",
      label: "Postal code",
      placeholder: "62805",
      type: "text",
    },
    {
      id: "address",
      label: "Address",
      placeholder: "Enter your address here...",
      colSpan: 2,
      type: "text",
    },
    {
      id: "state",
      label: "State/Province",
      placeholder: "New York",
      type: "text",
    },
    { id: "city", label: "City", placeholder: "E.g. Los Angeles", type: "text" },
  ];
interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreate: (shippingAddressId: string) => void; // Callback to trigger order creation
}

const ShippingModal: React.FC<ShippingModalProps> = ({
  isOpen,
  onClose,
  onOrderCreate,
}) => {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    phoneNumber: "",
    country: "",
    postalCode: "",
    address: "",
    state: "",
    city: "",
  });
  const countries = Country.getAllCountries().map(({ name }) => ({
    label: name,
    value: name,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("No user found. Please log in.");
      return;
    }

    try {
      const response = await httpRequestService.postApi("/shipping-address/create", {
        ...formData,
        buyerId: user._id,
        isPrimary: true,
      });

      if (response.success) {
        // Call the parent function to create the order with the shipping address ID
        const parentId = (response.data as any)._id;
        onOrderCreate(parentId);

 // Assuming response.data._id contains shipping address ID
        alert("Shipping address created successfully!");
        onClose(); // Close the modal after submission
      } else {
        alert(response.message || "Failed to create shipping address.");
      }
    } catch (error) {
      console.error("Error creating shipping address:", error);
      alert("An error occurred while creating the shipping address.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll when modal is open
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling when closed
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-[90vw] h-[80vh] bg-white shadow-lg rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="space-y-10 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-8 lg:gap-y-14 gap-x-12">
            {ShippingFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <Label htmlFor={field.id} className="text-[#6F8294]">
                  {field.label}
                </Label>
                {field.id === "country" ? (
                  <ComboboxDemo
                    data={countries}
                    notFoundText="No country found"
                    placeholder={field.placeholder}
                    onValueChange={(value) =>
                      setFormData((prevData) => ({ ...prevData, country: value }))
                    }
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
                  />
                )}
              </div>
            ))}
          </div>

          <Button
            type={ButtonType.SUBMIT}
            shape={ButtonShape.ROUND}
            className="mt-8"
          >
            Confirm Shipping & Buy Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ShippingModal;
