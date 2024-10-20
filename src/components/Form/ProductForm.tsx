import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import UploadImage from './UploadImage';
import Button from './Button';
import RichTextEditor from './RichTextArea';
import TextArea from './TextArea';

const ProductForm = () => {
  return (
    <div className="p-8 w-[95vw] md:w-[80vw] my-10  mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add product</h2>

      <form className="space-y-6">

        <InputField label="Title" placeholder="E.g. Smart watch" />

        <TextArea label="Description" placeholder="Write your  description here..." />

        <RichTextEditor label="Product Details" />

        <SelectField label="Product category" options={['Select product category', 'Electronics', 'Apparel', 'Home Goods']} />

        <div>
          <label className="block text-sm font-medium mb-1">Product media</label>
          <UploadImage />
        </div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
    
        <SelectField label="Type of offer" options={['Auction', 'Buy now']} />
        <InputField label="Price" placeholder="Enter price" />
        <InputField label="Shiping charges" placeholder="Enter Shiping price" />
        <SelectField label="Delivery option" options={['Select delivery option', 'Standard', 'Express']} />
</div>

        <Button text="Save and publish product" />
      </form>
    </div>
  );
};

export default ProductForm;
