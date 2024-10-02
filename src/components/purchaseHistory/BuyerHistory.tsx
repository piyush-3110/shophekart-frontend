import React from 'react';
import TableForBuyer from './TableForBuyer'; // Assuming TableForBuyer is in the same folder

const BuyerHistory: React.FC = () => {
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
      status: "On the way",
      title: "Camera Sling Bag",
      description: "This is an amazing product that will change your life.",
      type: "Auction",
      soldPrice: "12 CSHOP",
    },
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Shoes",
      status: "Received",
      title: "Running Shoes",
      description: "High quality running shoes designed for comfort.",
      type: "Buy Now",
      soldPrice: "17 CSHOP",
    },
    {
      imageUrl: "/images/itemDetails/bag.png",
      category: "Watches",
      status: "Pending",
      title: "Smart Watch",
      description: "A sleek and modern smartwatch with various health features.",
      type: "Auction",
      soldPrice: "15 CSHOP",
    },
  ];

  return <TableForBuyer headers={headers} data={data} />;
};

export default BuyerHistory;
