"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically load ReactQuill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <ReactQuill
        value={value} // Controlled value passed from parent
        onChange={onChange} // Directly pass the updated content back to parent
        placeholder="Enter the detail here ..."
        className="bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        theme="snow"
      />
    </div>
  );
};

export default RichTextEditor;
