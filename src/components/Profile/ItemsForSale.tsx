import React from 'react';
// Assuming the new Table component is in the same folder
import TableForSale from './TableForSale';

const ItemsForSale: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Type"},
    { title: "Price" },
    { title: "Shipping" },
    { title: "Action" },
  ];

  const data = [
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Bags",
      status: "Available",
      title: "Camera Sling Bag",
      description: "This is an amazing product that will change your life.",
      ratingValue: 4.5,
      ratingNumber: 120,
      type: "Auction",
      price: "12 CSHOP",  // Changed from soldPrice to price
      shipping: "Global Shipping"
    },
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Shoes",
      status: "Available",
      title: "Running Shoes",
      description: "High quality running shoes designed for comfort.",
      ratingValue: 4.8,
      ratingNumber: 80,
      type: "Auction",
      price: "17 CSHOP",  // Changed from soldPrice to price
      shipping: "Local Shipping"
    },
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Watches",
      status: "Available",
      title: "Smart Watch",
      description: "A sleek and modern smartwatch with various health features.",
      ratingValue: 4.3,
      ratingNumber: 60,
      type: "Auction",
      price: "15 CSHOP",  // Changed from soldPrice to price
      shipping: "Global Shipping"
    },
  ];

  return <TableForSale headers={headers} data={data} />;
};

export default ItemsForSale;
