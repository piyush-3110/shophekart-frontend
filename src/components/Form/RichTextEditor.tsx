
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void; // onChange expects a string, not an event
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ label, placeholder = "Write your product details here...", value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <ReactQuill
        value={value} // Controlled value passed from parent
        onChange={onChange} // Directly pass the updated content back to parent
        placeholder={placeholder}
        className="bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        theme="snow"
        
      />
    </div>
  );
};

export default RichTextEditor;
