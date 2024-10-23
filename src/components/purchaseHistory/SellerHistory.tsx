import React, { useState } from 'react';
import TableForBuyer from './TableForBuyer'; // Assuming TableForBuyer is in the same folder
import axios from 'axios'; // Assuming you are using axios for API requests

export const SellerHistory: React.FC = () => {
  const headers = [
    { title: "Items", span: 2 },
    { title: "Type" },
    { title: "Price" },
    { title: "Status" },
    { title: "Rating" },
  ];

  const orderStatuses = ["pending", "shipped", "delivered", "cancelled"];

  const [orderData, setOrderData] = useState([
    {
      id: 1,
      imageUrl: "/images/itemDetails/bag.png",
      category: "Bags",
      status: "On the way",
      title: "Camera Sling Bag",
      description: "This is an amazing product that will change your life.",
      type: "Auction",
      soldPrice: "12 CSHOP",
    },
    {
      id: 2,
      imageUrl: "/images/itemDetails/bag.png",
      category: "Shoes",
      status: "Received",
      title: "Running Shoes",
      description: "High quality running shoes designed for comfort.",
      type: "Buy Now",
      soldPrice: "17 CSHOP",
    },
    {
      id: 3,
      imageUrl: "/images/itemDetails/bag.png",
      category: "Watches",
      status: "Pending",
      title: "Smart Watch",
      description: "A sleek and modern smartwatch with various health features.",
      type: "Auction",
      soldPrice: "15 CSHOP",
    },
  ]);

  // Function to handle status change and API request
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Assuming the backend API endpoint for updating order status is /api/orders/updateStatus
      const response = await axios.post('/api/orders/updateStatus', {
        orderId: id,
        status: newStatus,
      });

      if (response.status === 200) {
        // Update the order status locally after a successful response
        setOrderData((prevData) =>
          prevData.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
        alert('Order status updated successfully');
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    }
  };

  const dataWithDropdown = orderData.map((order) => ({
    ...order,
    status: (
      <select
        value={order.status}
        onChange={(e) => handleStatusChange(order.id, e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        {orderStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    ),
  }));

  return <TableForBuyer headers={headers} data={dataWithDropdown} />;
};
