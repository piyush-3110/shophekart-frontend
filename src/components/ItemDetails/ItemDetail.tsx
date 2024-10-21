"use client";

import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { ItemDescription } from './ItemDescription';
import { ReviewSection } from '../Profile/ReviewSection';

interface ItemDetailProps {
  id: string; // Accept id as a prop
}

interface Product {
  name: string;
  description: string;
  details: string;
  images: string[];
  price: number;
  currencyType: string;
  stock: number;
  sellerId: string;
  shippingType:string;
  // Add any other fields you may want to use from the fetched data
}

export const ItemDetail: React.FC<ItemDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/fixedProduct/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.fixedProduct); // Assuming `fixedProduct` is the key containing the product data
        } else {
          console.error("Failed to fetch product.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className='bg-white px-4 lg:px-12 py-8'>
      <div className='flex flex-col items-center justify-center gap-8'>
        <div className='flex flex-col md:flex-row gap-4 lg:gap-12 items-center justify-center'> {/* {Item Details Section} */}
          <div>
            <ItemCard images={product.images} /> {/* Display fetched images */}
          </div>
          <div>
            <ItemDescription
              name={product.name}
              description={product.description}
              details={product.details}
              price={product.price}
              currencyType={product.currencyType}
              stock={product.stock}
              shippingType={product.shippingType}
            />
          </div>
        </div>
        <div>
          <div className='flex pl-3 md:pl-16 w-[95vw] md:w-[80vw] justify-between items-center '>
            <h1 className="text-[#160041] font-[700] text-lg">Comments</h1>
            <button className='py-2 px-4 border-[1px] text-[#022AFF] text-sm border-[#022AFF]'> Write a comment</button>
          </div>
          <div className='pl-3 md:pl-16 flex flex-col items-center gap-3'>
            <ReviewSection/>
            <button className='text-[#022AFF] font-[700] mx-auto text-sm underline text-center'>Load more</button>
          </div>
        </div>
      </div>
    </div>
  );
};
