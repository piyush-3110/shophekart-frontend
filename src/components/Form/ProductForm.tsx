"use client";
import React, { useCallback, useState } from "react";
import UploadImage from "./UploadImage";
import RichTextEditor from "./RichTextEditor";
import InputField from "./InputField";
import TextArea from "./TextArea";
import Button from "./Button";
import ToastNotification from "./ToastNotification";
import Loader from "./Loader";
import CategorySelect from "./CategorySelect";
import SelectField from "./SelectField";
import { useUserStore } from "@/store";
import { useCreateProduct } from "@/hooks";
import { TCreateProductData } from "@/types";
import TOKEN_ADDRESS from "@/constants/tokenAddress";
import { HypeModal } from "./HypeModal";
// import { productValidationSchema } from "@/validations/productValidation";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [isHypeModalOpen, setIsHypeModalOpen] = useState(false);

  const { user } = useUserStore();

  const [formData, setFormData] = useState<TCreateProductData>({
    name: "",
    description: "",
    productAddress: "",
    details: "",
    category: "",
    currencyType: "CSHOP",
    stock: "",
    price: "",
    shippingCharges: "",
    shippingType: "LOCAL",
    shippingDuration: "",
    images: [],
    sellerId: user?._id ?? "",
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const { mutateAsync } = useCreateProduct(
    user?.walletAddress ?? "0x0000000000000000000000000000000000000000"
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  const handleFileSelect = useCallback((files: File[]) => {
    setSelectedImages(files);
  },[])

  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("productAddress", formData.productAddress);
      formDataToSubmit.append("details", formData.details);
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("currencyType", formData.currencyType);
      formDataToSubmit.append("stock", formData.stock);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("shippingCharges", formData.shippingCharges);
      formDataToSubmit.append("shippingDuration", formData.shippingDuration);
      formDataToSubmit.append("shippingType", formData.shippingType);
      formDataToSubmit.append("sellerId", formData.sellerId);
      formDataToSubmit.append(
        "currencyAddress",
        TOKEN_ADDRESS[formData.currencyType]
      );

      selectedImages.forEach((file) => {
        formDataToSubmit.append("images", file);
      });

      await mutateAsync(formDataToSubmit);

      setFormData({
        name: "",
        description: "",
        productAddress: "",
        details: "",
        category: "",
        currencyType: "CSHOP",
        stock: "",
        price: "",
        shippingCharges: "",
        shippingType: "LOCAL",
        shippingDuration: "",
        images: [],
        sellerId: "",
      });

      setSelectedImages([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openHypeModal = () => {
    setIsHypeModalOpen(true);
  };

  const closeHypeModal = () => {
    setIsHypeModalOpen(false);
  };

  return (
    <div className="p-8 w-[95vw] md:w-[80vw] my-10 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add product</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Name"
          placeholder="E.g. Smart watch"
          name="name"
          type="string"
          value={formData.name}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          placeholder="Write your description here..."
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <InputField
          label="Product Address"
          placeholder="Street, City, State, Country, Postal Code"
          name="productAddress"
          value={formData.productAddress}
          onChange={handleChange}
        />
        <RichTextEditor
          label="Product Details"
          value={formData.details}
          onChange={handleRichTextChange}
        />
        <button
          type="button"
          className="gradient-button my-2"
          onClick={openHypeModal} // Open hype modal on click
        >
          AIShophee
        </button>
        <CategorySelect
          category={formData.category}
          onChange={handleCategoryChange}
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            Product media
          </label>
          <UploadImage onFileSelect={handleFileSelect} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField
            label="Currency Type"
            options={[
              "Select Currency Type",
              "USDT",
              "BNB",
              "CSHOP",
              "USDC",
            ].map((type) => ({ label: type, value: type }))}
            name="currencyType"
            value={formData.currencyType}
            onChange={handleChange}
          />
          <InputField
            label="Stock"
            placeholder="Enter stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <InputField
            label="Price"
            placeholder="Enter price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <InputField
            label="Shipping charge"
            placeholder="Enter Shipping price"
            name="shippingCharges"
            type="number"
            value={formData.shippingCharges}
            onChange={handleChange}
          />
          <SelectField
            label="Shipping Type"
            options={["Select Shipping Type", "LOCAL", "GLOBAL"].map(
              (type) => ({ label: type, value: type })
            )}
            name="shippingType"
            value={formData.shippingType}
            onChange={handleChange}
          />
          <InputField
            label="Shipping duration"
            placeholder="Enter Shipping duration in days"
            name="shippingDuration"
            type="number"
            value={formData.shippingDuration}
            onChange={handleChange}
          />
        </div>

        <Button
          text={loading ? <Loader /> : "Save and publish product"}
          disabled={loading}
        />
        <ToastNotification />
      </form>

      {/* Hype Modal */}
      {isHypeModalOpen && (
        <HypeModal isOpen={isHypeModalOpen} onClose={closeHypeModal} />
      )}
    </div>
  );
};

export default ProductForm;
