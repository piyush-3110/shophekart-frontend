import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
