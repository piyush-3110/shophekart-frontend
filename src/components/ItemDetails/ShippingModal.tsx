/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5"; // Close icon
import { Input } from "@/components/ui/input";
import Button, { ButtonType, ButtonShape } from "@/components/shared/Button";
import httpRequestService from "@/services/httpRequest.service";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store";
import { Country } from "country-state-city";
import Loader from "../Form/Loader";
import { toast } from "react-toastify";


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
    id: "email",
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
  onClose1: () => void;

  onOrderCreate: (shippingAddressId: string) => void; // Callback to trigger order creation
}

const ShippingModal: React.FC<ShippingModalProps> = ({
  isOpen,
  onClose,
  onOrderCreate,
  onClose1
}) => {
  const [loading, setLoading] = useState(false); // Loading state

  const { user } = useUserStore();
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

  const countries = Country.getAllCountries().map(({ name }) => ({
    label: name,
    value: name,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
const handleClose=()=>{
  onClose1();
  onClose();
}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("No user found. Please log in."); // Show error toast

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
       toast.success("Shipping address updated successfully");
        onClose1(); 
        onClose();
      
      } else {
       
      }
    } catch (error) {
      console.error("Error creating shipping address:", error);
      toast.error("Error creating shipping address");
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
      onClick={handleClose}
    >
    
      <div
        className="relative w-[90vw] bg-white shadow-lg rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <IoClose size={24} />
        </button>

        <form onSubmit={handleSubmit}>
  <div className=" grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-8  lg:gap-y-14 gap-x-12">
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
            value={formData.country}  // <-- Pass the current country value
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
            required
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
                {loading ? <Loader /> : "Confirm Shipping & Buy Now"} {/* Show loader or button text */}

  </Button>
</form>

      </div>
    </div>
  );
};

export default ShippingModal;
