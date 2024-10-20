import React from 'react';

interface SelectFieldProps {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
