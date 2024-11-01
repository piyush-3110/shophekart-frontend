import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type?: string; // Optional type prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error message prop
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  name,
  value,
  type = 'text', // Default to 'text' if not provided
  onChange,
  error, // Accept the error prop
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg w-full p-2 focus:outline-none focus:ring-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
        required
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>} {/* Display error message if it exists */}
    </div>
  );
};

export default InputField;
