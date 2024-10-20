"use client";
import React, { useState } from 'react';
import UploadImage from './UploadImage';
import axios from 'axios';
import SelectField from './SelectField';
import RichTextEditor from './RichTextArea';
import InputField from './InputField';
import TextArea from './TextArea';
import Button from './Button';
import { toast } from 'react-toastify';
import ToastNotification from './ToastNotification';
import Loader from './Loader';

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (value: string) => {
    setFormData((prev) => ({ ...prev, details: value })); // Update 'details' field with rich text content
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedImages(files); // Capture selected images from UploadImage component
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('productAddress', formData.productAddress);
    formDataToSubmit.append('details', formData.details); // From Rich Text Editor
    formDataToSubmit.append('category', '670f8fa48dc51375007dfff1');
    formDataToSubmit.append('currencyType', formData.currencyType);
    formDataToSubmit.append('stock', formData.stock);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('shippingCharges', formData.shippingCharges);
    formDataToSubmit.append('shippingType', formData.shippingType);
    formDataToSubmit.append('productIdOnChain', '123456'); // Example product ID on chain
    formDataToSubmit.append('sellerId', '64a92b4f8f3b74a0acbfcfc1'); // Example seller ID
    formDataToSubmit.append('currencyAddress', 'dshsjkahbsahsagdjhfsad');
    
    // Append each image file to the FormData
    selectedImages.forEach((file) => {
      formDataToSubmit.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/fixedProduct/create', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      toast.success('Product Created Successfully');
      
      // Clear the form and selected images
      setFormData({
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
      setSelectedImages([]); // Reset selected images

    } catch (error) {
      setLoading(false);
      toast.error("Failed to create product");
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
          onChange={handleRichTextChange} // Pass rich text changes separately
        />
        <SelectField
          label="Category"
          options={['Select product category', 'Electronics', 'Apparel', 'Home Goods']}
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Product media</label>
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
            type='number'
            value={formData.stock}
            onChange={handleChange}
          />
          <InputField
            label="Price"
            placeholder="Enter price"
            name="price"
            type='number'
            value={formData.price}
            onChange={handleChange}
          />
          <InputField
            label="Shipping charges"
            placeholder="Enter Shipping price"
            name="shippingCharges"
            type='number'
            value={formData.shippingCharges}
            onChange={handleChange}
          />
          <SelectField
            label="Delivery option"
            options={['Select delivery option', 'LOCAL', 'GLOBAL']}
            name="shippingType"
            value={formData.shippingType}
            onChange={handleChange}
          />
        </div>
        <Button text={loading ? <Loader /> : "Save and publish product"} disabled={loading} />
        <ToastNotification />
      </form>
    </div>
  );
};

export default ProductForm;
