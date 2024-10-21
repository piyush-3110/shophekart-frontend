"use client"
import axios from 'axios';
import BuyCard from "@/components/products/BuyCard";
import ProductPagination from "@/components/products/shared/productPagination";
import Link from "next/link";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  currencyType: string;
  images: string[];
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const productsPerPage = 6;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productList = products.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/fixedProduct/getAll');
      setProducts(response.data.fixedProducts);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Prevent pushing the same URL if it's already the correct page
    if (totalPages > 0) {
      if (page < 1) {
        router.push(`${pathname}?page=1`);
      } else if (page > totalPages) {
        router.push(`${pathname}?page=${totalPages}`);
      }
    }
  }, [page, pathname, router, totalPages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-8 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        {productList.map((product, index) => {
          return (
            <Link key={product._id} href={`/itemDetails`}>
              <BuyCard
                id={product._id}
                productPrice={product.price}
                productName={product.name}
                productImage={product.images[0]}
                currencyType={product.currencyType}
              />
            </Link>
          );
        })}
      </div>
      <ProductPagination currentPage={page} totalPages={totalPages} />
    </section>
  );
};

export default Page;
