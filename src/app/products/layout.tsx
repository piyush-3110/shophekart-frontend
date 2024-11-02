"use client";
import React, { useEffect, useState } from "react";
import NavigationTabs from "@/components/products/shared/navigationTabs";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer/Footer";
import { HttpRequestService } from "@/services";
import { useUserStore } from "@/store";

interface ICategory {
  _id: string;
  label: string;
  parentCategory: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (label: string) => {
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const Layout = ({ children }: { children: React.ReactElement }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategory, setSelectedCategory } = useUserStore();

  useEffect(() => {
    // Clear selected category when component mounts
    setSelectedCategory(null);

    const fetchCategories = async () => {
      try {
        const response = await HttpRequestService.fetchApi<ICategory[]>("/category/all");
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
  }, [setSelectedCategory]);

  return (
    <main className="space-y-11">
      <div className="flex flex-wrap gap-x-5 gap-y-4 px-2 lg:px-32">
        {loading ? (
          <span>Loading categories...</span>
        ) : (
          <>
            {/* "All" button to fetch all products */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-gray-600 ${selectedCategory === null ? 'font-bold' : ''}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.label)}
                className={`text-gray-600 ${selectedCategory === category.label ? 'font-bold' : ''}`}
              >
                {capitalizeFirstLetter(category.label)}
              </button>
            ))}
          </>
        )}
      </div>

      <Separator color="#D7DDE7" />
      <NavigationTabs />
      <div className="px-2 lg:px-32">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
