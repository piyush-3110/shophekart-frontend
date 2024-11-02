import NavigationTabs from "@/components/products/shared/navigationTabs";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { HttpRequestService } from "@/services"; // Import the service
 // Import category type if available
 interface ICategory {
  _id: string;
  label: string;
  parentCategory: string | null;
  createdAt: Date;
  updatedAt: Date;
}
const Layout = ({ children }: { children: React.ReactElement }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <main className="space-y-11">
      {/* Display categories if loaded */}
      <div className="flex flex-wrap gap-x-5 gap-y-4 px-2 lg:px-32">
        {loading ? (
          <span>Loading categories...</span>
        ) : (
          categories.map((category, index) => (
            <span key={index} className="text-gray-600">
              {category.label}
            </span>
          ))
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
