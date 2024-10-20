"use client";
import React, { useState } from 'react';
import UploadImage from './UploadImage';
import axios from 'axios';
import SelectField from './SelectField';
import RichTextEditor from './RichTextArea';
import InputField from './InputField';
import TextArea from './TextArea';
import Button from './Button';
import ToastNotification from './ToastNotification';
import Loader from './Loader';
import { toast } from 'react-toastify';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productAddress: '',
    details: '',
    category: '',
    currencyType: '',
    stock: '',
    price: '',
    shippingCharges: '',
    shippingType: '',
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => formDataToSubmit.append(key, formData[key as keyof typeof formData]));
    selectedImages.forEach((file) => formDataToSubmit.append('images', file));

    try {
      const response = await axios.post('http://localhost:3000/api/v1/fixedProduct/create', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product created successfully!');
    } catch (error) {
      toast.error('Failed to create product');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-8 w-[95vw] md:w-[80vw] my-10 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <ToastNotification />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <InputField
          label="Name"
          placeholder="E.g. Smart watch"
          name="name"
          type="text"
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

        <SelectField
          label="Category"
          options={['Select product category', 'Electronics', 'Apparel', 'Home Goods']}
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Product Media</label>
          <UploadImage onFileSelect={handleFileSelect} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SelectField
            label="Currency Type"
            options={['Select Currency Type', 'USDT', 'BNB', 'CSHOP', 'USDC']}
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
            label="Shipping Charges"
            placeholder="Enter Shipping price"
            name="shippingCharges"
            type="number"
            value={formData.shippingCharges}
            onChange={handleChange}
          />

          <SelectField
            label="Delivery Option"
            options={['Select delivery option', 'Local', 'Global']}
            name="shippingType"
            value={formData.shippingType}
            onChange={handleChange}
          />
        </div>

        <Button text={loading ? <Loader /> : "Save and publish product"} disabled={loading} />
      </form>
    </div>
  );
};

export default ProductForm;
