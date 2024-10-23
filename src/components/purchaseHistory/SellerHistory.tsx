import React from 'react';
import TableForSeller from './TableForSeller'; // Import the updated TableForSeller component

export const SellerHistory: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Type" },
    { title: "Price" },
    { title: "Status" },
    { title: "Rating" },
  ];

  const data = [
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Bags",
      status: "Shipped", // Example status, can be 'Pending', 'Shipped', 'Delivered', 'Cancelled'
      title: "Camera Sling Bag",
      description: "This is an amazing product that will change your life.",
      type: "Auction",
      soldPrice: "12 CSHOP",
    },
    {
      imageUrl: "/images/itemDetails/shoes.png",
      category: "Shoes",
      status: "Delivered",
      title: "Running Shoes",
      description: "High quality running shoes designed for comfort.",
      type: "Buy Now",
      soldPrice: "17 CSHOP",
    },
    {
      imageUrl: "/images/itemDetails/watch.png",
      category: "Watches",
      status: "Pending",
      title: "Smart Watch",
      description: "A sleek and modern smartwatch with various health features.",
      type: "Auction",
      soldPrice: "15 CSHOP",
    },
  ];

  return <TableForSeller headers={headers} data={data} />;
};

export default SellerHistory;
