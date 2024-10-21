"use client";
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ItemDetail = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  
  // Log searchParams to check what parameters are being passed
  console.log("Search Params:", searchParams.toString());

  // Convert searchParams to a query object
  const query = Object.fromEntries(searchParams.entries());
  console.log("Query:", query);

  // State variables to store the values
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [allImages, setAllImages] = useState<string[]>([]);
  const [currencyType, setCurrencyType] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productRating, setProductRating] = useState<number | null>(null);
  const [productStock, setProductStock] = useState<number | null>(null);
  const [productShippingType, setProductShippingType] = useState<string>('');

  useEffect(() => {
    if (query.price) setProductPrice(Number(query.price));
    if (query.name) setProductName(decodeURIComponent(query.name));
    if (query.image) {
      try {
        setAllImages(JSON.parse(decodeURIComponent(query.image)));
      } catch (error) {
        console.error("Error parsing images:", error);
      }
    }
    if (query.currency) setCurrencyType(decodeURIComponent(query.currency));
    if (query.description) setProductDescription(decodeURIComponent(query.description));
    if (query.rating) setProductRating(Number(query.rating));
    if (query.stock) setProductStock(Number(query.stock));
    if (query.shippingType) setProductShippingType(decodeURIComponent(query.shippingType));
  }, [query]);

  return (
    <div>
      <h1>{productName}</h1>
      <p>Price: {productPrice} {currencyType}</p>
      <p>Description: {productDescription}</p>
      <p>Rating: {productRating}</p>
      <p>Stock: {productStock}</p>
      <p>Shipping Type: {productShippingType}</p>

      <div>
        {allImages.map((img, index) => (
          <img key={index} src={img} alt={`Product Image ${index}`} style={{ width: '200px' }} />
        ))}
      </div>
    </div>
  );
};

export default ItemDetail;
