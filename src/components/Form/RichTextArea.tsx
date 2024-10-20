"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  label: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ label, placeholder = "Write your product description here..." }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <ReactQuill
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        className="bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        theme="snow" 
      />
    </div>
  );
};

export default RichTextEditor;
