"use client";

import BuyCard from "@/components/products/BuyCard";
import ProductPagination from "@/components/products/shared/productPagination";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";

const PAGINATION_CONSTANT = 6;

const Page = () => {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await HttpRequestService.fetchApi<IProduct[]>(
        "/fixedProduct/getAll"
      );
      return response;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Opps something went wrong...</div>;
  }

  if (data.data.length < 1) {
    return (
      <div>Seems like there are no products available at the moment...</div>
    );
  }

  const totalPages =
    data?.data?.length > 0
      ? Math.ceil(data?.data.length / PAGINATION_CONSTANT)
      : 1;
  const startIndex = (currentPage - 1) * PAGINATION_CONSTANT;
  const endIndex = startIndex + PAGINATION_CONSTANT;
  const paginatedProducts = data?.data.slice(startIndex, endIndex);

  return (
    <section className="space-y-8 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        {paginatedProducts.map((product) => (
          <Link key={product._id} href={`/itemDetails/${product._id}`}>
            <BuyCard
              id={product._id}
              productPrice={product.price}
              productName={product.name}
              productImage={product.images[0]}
              currencyType={product.currencyType}
            />
          </Link>
        ))}
      </div>
      <ProductPagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
};

export default Page;