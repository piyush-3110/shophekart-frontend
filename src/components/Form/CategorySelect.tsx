"use client";

import React, { useEffect, useState } from 'react';
import SelectField from './SelectField';
import axios from 'axios';
interface CategoryOption {
    label: string;
    value: string;
  }
  
  
interface CategorySelectProps {
  category: string;
  onChange: (categoryId: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, onChange }) => {
  const [categories, setCategories] = useState<{ _id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/category/all');
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
<SelectField
  label="Category"
  options={loading ? [] as CategoryOption[] : categories.map(cat => ({ label: cat.label, value: cat._id }))}
  name="category"
  value={category}
  onChange={(e) => onChange(e.target.value)}
/>


    </div>
  );
};

export default CategorySelect;
