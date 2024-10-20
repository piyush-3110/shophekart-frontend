// In TextArea.tsx
import React from 'react';

interface TextAreaProps {
  label: string;
  placeholder: string;
  value: string;
  name: string;  // Add name property to interface
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, placeholder, value, name, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        placeholder={placeholder}
        name={name}  // Now using name property
        value={value} // Controlled component using value
        onChange={onChange} // Handling input changes
        className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
      />
    </div>
  );
};

export default TextArea;
