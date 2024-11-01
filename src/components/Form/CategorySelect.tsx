"use client";

import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import { HttpRequestService } from "@/services";
interface CategoryOption {
  label: string;
  value: string;
}

interface CategorySelectProps {
  category: string;
  onChange: (categoryId: string) => void;
  error?:string;
}

interface ICategory {
  _id: string;
  label: string;
  parentCategory: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  onChange,
  error
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await HttpRequestService.fetchApi<ICategory[]>(
          `/category/all`
        );
        if (response.success) {
          setCategories(response.data);
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
        options={
          loading
            ? ([] as CategoryOption[])
            : categories.map((cat) => ({ label: cat.label, value: cat._id }))
        }
        name="category"
        value={category}
        onChange={(e) => onChange(e.target.value)}
      />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>} {/* Display error message if it exists */}

    </div>
  );
};

export default CategorySelect;
