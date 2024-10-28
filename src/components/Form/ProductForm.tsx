"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import RichTextEditor from "./RichTextEditor";
import InputField from "./InputField";
import TextArea from "./TextArea";
import Button from "./Button";
// import ToastNotification from "./ToastNotification";
import Loader from "./Loader";
import CategorySelect from "./CategorySelect";
import SelectField from "./SelectField";
import { useUserStore } from "@/store";
import { useCreateProduct } from "@/hooks";
import { TCreateProductData } from "@/types";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useUserStore();

  const [formData, setFormData] = useState<TCreateProductData>({
    name: "",
    description: "",
    productAddress: "",
    details: "",
    category: "", // Will hold category ID
    currencyType: "CSHOP",
    stock: "",
    price: "",
    shippingCharge: "",
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

  const handleFileSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData((prev) => ({ ...prev, category: categoryId })); // Set the selected category ID
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
      formDataToSubmit.append("category", formData.category); // Send category ID to backend
      formDataToSubmit.append("currencyType", formData.currencyType);
      formDataToSubmit.append("stock", formData.stock);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("shippingCharge", formData.shippingCharge);
      formDataToSubmit.append("shippingDuration", formData.shippingDuration);
      formDataToSubmit.append("shippingType", formData.shippingType);
      formDataToSubmit.append("sellerId", formData.sellerId); // Example seller ID
      formDataToSubmit.append("currencyAddress", formData.currencyType);

      selectedImages.forEach((file) => {
        formDataToSubmit.append("images", file);
      });

      await mutateAsync(formData);

      // const formDataToSubmit = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   formDataToSubmit.append(key, value);
      // });
      // formDataToSubmit.append("sellerId", user?._id ?? "");

      // const data: TCreateProductData = {
      //   sellerId: user?._id ?? "",
      //   currencyType: formData.currencyType,
      //   name: formData.name,
      //   description: formData.description,
      //   details: formData.details,
      //   images: selectedImages,
      //   shippingType: formData.shippingType,
      //   shippingCharge: formData.shippingCharge,
      //   shippingDuration: formData.shippingDuration,
      //   category: formData.category,
      //   productAddress: formData.productAddress,
      //   price: formData.price,
      //   stock: formData.stock,
      // };

      // await mutateAsync(data);

      // Clear the form and selected images
      setFormData({
        name: "",
        description: "",
        productAddress: "",
        details: "",
        category: "", // Will hold category ID
        currencyType: "CSHOP",
        stock: "",
        price: "",
        shippingCharge: "",
        shippingType: "LOCAL",
        shippingDuration: "",
        images: [],
        sellerId: "",
      });

      setSelectedImages([]); // Reset selected images
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            name="shippingCharge"
            type="number"
            value={formData.shippingCharge}
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
        {/* <ToastNotification /> */}
      </form>
    </div>
  );
};

export default ProductForm;
