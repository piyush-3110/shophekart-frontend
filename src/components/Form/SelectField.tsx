// In SelectField.tsx
import React from 'react';

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  name: string;  // Add name property to interface
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, name, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name={name}  // Now using name property
        value={value} // Controlled value
        onChange={onChange} // Handle changes via the parent component
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
