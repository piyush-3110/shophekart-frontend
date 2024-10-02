import React from 'react';
import Table from './Table';
 // Assuming the Table component is in the same folder

const SoldItems: React.FC = () => {
  const headers = [
    { title: "Items", span:2 },
    { title: "Rating",span:2 },
    { title: "Type" },
    { title: "Sold Price" },
    { title: "Shipping" },
  ];

  const data = [
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Bags",
      status: "Sold",
      title: "Camera Sling Bag",
      description: "This is an amazing product that will change your life.",
      ratingValue: 4.5,
      ratingNumber: 120,
      type: "Auction",
      soldPrice: "12 CSHOP",
      shipping: "Global Shipping"
    },
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Shoes",
      status: "Sold",
      title: "Running Shoes",
      description: "High quality running shoes designed for comfort.",
      ratingValue: 4.8,
      ratingNumber: 80,
      type: "Auction",
      soldPrice: "17 CSHOP",
      shipping: "Local Shipping"
    },
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Watches",
      status: "Sold",
      title: "Smart Watch",
      description: "A sleek and modern smartwatch with various health features.",
      ratingValue: 4.3,
      ratingNumber: 60,
      type: "Auction",
      soldPrice: "15 CSHOP",
      shipping: "Global Shipping"
    },
  ];

  return <Table headers={headers} data={data} />;
};

export default SoldItems;
