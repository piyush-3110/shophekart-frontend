"use client";

import React from "react";
import ItemCard from "./ItemCard";
import { ItemDescription } from "./ItemDescription";
import { ReviewSection } from "../Profile/ReviewSection";
import { HttpRequestService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store";
import FetchError from "../shared/FetchError";
import { TSingleProduct } from "@/types/product";

interface ItemDetailProps {
  id: string; 
}

export const ItemDetail: React.FC<ItemDetailProps> = ({ id }) => {
  const { user } = useUserStore();
  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await HttpRequestService.fetchApi<TSingleProduct>(
        `/fixedProduct/${id}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <FetchError refetch={refetch} />;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Product Not Found
        </h1>
        <p className="text-lg text-gray-600">
          We couldn&apos;t find the product you were looking for. Please check
          the URL or try searching again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 lg:px-12 py-8">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-12 items-center justify-center">
          {" "}
          {/* {Item Details Section} */}
          <div className="sticky top-0 self-start">
            <ItemCard images={product.images} /> {/* Display fetched images */}
          </div>
          <div>
            <ItemDescription
              name={product.name}
              description={product.description}
              buyerId={user?._id ?? "67151ba41a526ba9fd1a9a31"}
              id={product._id}
              shippingCharges={product.shippingCharges}
              shippingDuration={product.shippingDuration}
              productIdOnChain={product.productIdOnChain}
              details={product.details}
              price={product.price}
              currencyType={product.currencyType}
              stock={product.stock}
              shippingType={product.shippingType}
              reviewCount={product.reviewCount ?? 0}
              stars={product.averageRating ?? 0}
            />
          </div>
        </div>
        <div>
          <div className="flex pl-3 md:pl-16 w-[95vw] md:w-[80vw] justify-between items-center ">
            <h1 className="text-[#160041] font-[700] text-lg">Comments</h1>
            {/* <button className="py-2 px-4 border-[1px] text-[#022AFF] text-sm border-[#022AFF]">
              {" "}
              Write a comment
            </button> */}
          </div>
          <div className="pl-3 md:pl-16 flex flex-col gap-3">
            <ReviewSection targetId={product._id} />
            {product.reviewCount > 0 && (
              <button className="text-[#022AFF] font-[700] mx-auto text-sm underline text-center">
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
