import React, { useState } from 'react';
import UploadImage from './UploadImage';
import axios from 'axios';
import SelectField from './SelectField';
import RichTextEditor from './RichTextArea';
import InputField from './InputField';
import TextArea from './TextArea';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productAddress: '',
    category: '',
    stock: '',
    price: '',
    shippingCharges: '',
    deliveryOption: '',
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedImages(files); // Capture selected images from UploadImage component
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('productAddress', formData.productAddress);
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('stock', formData.stock);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('shippingCharges', formData.shippingCharges);
    formDataToSubmit.append('deliveryOption', formData.deliveryOption);

    // Append each image file to the FormData
    selectedImages.forEach((file) => {
      formDataToSubmit.append('images', file);
    });

    try {
      // Send the form data with images to your backend API
      const response = await axios.post('http://localhost:3000/api/v1/fixedProduct/create', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product Created:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
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
          value={formData.name}
          onChange={handleChange}
        />

        <TextArea
          label="Description"
          placeholder="Write your description here..."
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

        <RichTextEditor label="Product Details" value={richText} onChange={setRichText} />

        <SelectField
          label="Category"
          name="category"
          options={['Select product category', 'Electronics', 'Apparel', 'Home Goods']}
          value={formData.category}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Product media</label>
          <UploadImage onFileSelect={handleFileSelect} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <SelectField
            label="Currency Type"
            name="currencyType"
            options={['Select Currency Type', 'USDT', 'BNB', 'CSHOP', 'USDC']}
            value={formData.currencyType}
            onChange={handleChange}
          />

          <InputField
            label="Stock"
            placeholder="Enter stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <SelectField
            label="Type of offer"
            options={['Buy now']}
            value="Buy now"
            disabled={true} // Disable since only "Buy now" is available
          />

          <InputField
            label="Price"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <InputField
            label="Shipping charges"
            placeholder="Enter Shipping price"
            name="shippingCharges"
            value={formData.shippingCharges}
            onChange={handleChange}
          />

          <SelectField
            label="Delivery option"
            name="shippingType"
            options={['Select delivery option', 'Local', 'Global']}
            value={formData.shippingType}
            onChange={handleChange}
          />
        </div>

        <Button text="Save and publish product" />
      </form>
    </div>
  );
};

export default ProductForm;
