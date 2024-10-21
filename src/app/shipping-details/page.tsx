"use client";

import { useState, useMemo } from "react";
import Button, { ButtonShape, ButtonType } from "@/components/shared/Button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Country } from "country-state-city";
import { useUserStore } from "@/store/userStore"; 
import httpRequestService from "@/services/httpRequest.service"; 


interface ShippingField {
  id: string;
  label: string;
  type?: "email" | "tel" | "text";
  placeholder: string;
  className?: string;
  colSpan?: number;
}

// Define static shipping fields
const ShippingFields: ShippingField[] = [
  { id: "firstName", label: "First name", placeholder: "E.g. Jordan", type: "text" },
  { id: "lastName", label: "Last name", placeholder: "E.g. Smith", type: "text" },
  { id: "userEmail", label: "Email address", placeholder: "E.g. jordan@mail.com", type: "email" },
  { id: "phoneNumber", label: "Phone number", placeholder: "+ 156 555 2568", type: "tel" },
  { id: "country", label: "Country", placeholder: "Select the country", type: "text" },
  { id: "postalCode", label: "Postal code", placeholder: "62805", type: "text" },
  { id: "address", label: "Address", placeholder: "Enter your address here...", colSpan: 2, type: "text" },
  { id: "state", label: "State/Province", placeholder: "New York", type: "text" },
  { id: "city", label: "City", placeholder: "E.g. Los Angeles", type: "text" },
];

const Page = () => {
  // Initialize form data with useState
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

  const { user } = useUserStore(); // Access the user from Zustand store to get buyerId

  // Use useMemo to memoize the list of countries
  const countries = useMemo(
    () => Country.getAllCountries().map(({ name }) => ({ label: name, value: name })),
    []
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("No user found. Please log in.");
      return;
    }

    const buyerId = user._id;

    try {
      const response = await httpRequestService.postApi("/shipping-address/create", {
        address: formData.address,
        buyerId,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
        state: formData.state,
        isPrimary: true,
      });

      if (response.success) {
        alert("Shipping address created successfully!");
      } else {
        alert(response.message || "Failed to create shipping address.");
      }
    } catch (error) {
      console.error("Error creating shipping address:", error);
      alert("An error occurred while creating the shipping address.");
    }
  };

  return (
    <main className="mt-4 py-10">
      <h1 className="bg-[#F4F6FA] text-center text-3xl font-semibold py-7">
        Shipping details
      </h1>
      <section className="px-4 lg:px-36 mt-12">
        <form onSubmit={handleSubmit}>
          <div className="space-y-10 grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-8 lg:gap-y-14 gap-x-12">
            {ShippingFields.map((field, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2",
                  field.colSpan && `col-span-${field.colSpan}`,
                  field.id === "firstName" && "mt-10"
                )}
              >
                <Label htmlFor={field.id} className="text-[#6F8294]">
                  {field.label}
                </Label>

                {field.id === "country" ? (
                  <ComboboxDemo
                    data={countries}
                    notFoundText="No country found"
                    placeholder={field.placeholder}
                    onValueChange={(value) => setFormData((prevData) => ({ ...prevData, country: value }))}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="border placeholder:text-[#6F8294] bg-[#F9FBFC]"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-[#6B6F93] mt-8">
            (These details will only be shared with sellers so they know where to ship items to.
            You can change this data at any time. They are not shared with anyone publicly.)
          </p>
          <Button
            type={ButtonType.SUBMIT}
            shape={ButtonShape.ROUND}
            className="mt-8"
          >
            Confirm and save
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Page;
