// In SelectField.tsx
import React from 'react';

interface CategoryOption {
  label: string;
  value: string;
}


interface SelectFieldProps {
  label: string;
  options: CategoryOption[];
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, name, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name={name} // Now using name property
        value={value} // Controlled value
        onChange={onChange} // Handle changes via the parent component
        required
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
