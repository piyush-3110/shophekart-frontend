import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import UploadImage from './UploadImage';
import Button from './Button';
import RichTextEditor from './RichTextArea';
import TextArea from './TextArea';

const ProductForm = () => {
  // State to hold form data
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
    images: [],
  });

  const [richText, setRichText] = useState(''); // For handling Rich Text Editor content

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (images) => {
    setFormData({ ...formData, images });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('productAddress', formData.productAddress);
    data.append('details', richText); // From Rich Text Editor
    data.append('category', formData.category);
    data.append('currencyType', formData.currencyType);
    data.append('stock', formData.stock);
    data.append('price', formData.price);
    data.append('shippingCharges', formData.shippingCharges);
    data.append('shippingType', formData.shippingType);
    
    // Add some placeholder values for now
    data.append('productIdOnChain', '123456'); // Example product ID on chain
    data.append('sellerId', '64a92b4f8f3b74a0acbfcfc1'); // Example seller ID
    
    // Append images
    formData.images.forEach((image) => {
      data.append('images', image);
    });

    try {
      const response = await fetch('http://localhost:3000/api/v1/fixedProduct/create', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert('Product created successfully!');
      } else {
        alert('Error creating product: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
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
          <UploadImage onImageUpload={handleImageUpload} />
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
