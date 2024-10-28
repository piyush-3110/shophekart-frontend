import React, { useState } from 'react';

interface ItemDescriptionProps {
  id: string;
  title: string;
  description: string;
  price: number;
  shipping: string;
  type: string;
  details: string;
  initialStatus: 'pending' | 'delivering';
}

const ItemDescription: React.FC<ItemDescriptionProps> = ({
  id,
  title,
  description,
  price,
  shipping,
  type,
  details,
  initialStatus,
}) => {
  const [status, setStatus] = useState<'pending' | 'delivering'>(initialStatus);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as 'pending' | 'delivering');
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg w-full pb-4 lg:w-[50vw]">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      <div className="space-y-1">
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="font-bold">Price:</span>
          <span>${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="font-bold">Shipping:</span>
          <span>{shipping}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="font-bold">Type:</span>
          <span>{type}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="font-bold">Product ID:</span>
          <span>{id}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="font-bold">Details:</span>
          <span>{details}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="font-bold">Status:</span>
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium" htmlFor="order-status">
          Order Status:
        </label>
        <select
          id="order-status"
          value={status}
          onChange={handleStatusChange}
          className="w-full mt-1 border border-gray-300 rounded-md p-1 text-sm focus:ring-indigo-500"
          aria-label="Order Status"
        >
          <option value="pending">Pending</option>
          <option value="delivering">Delivering</option>
        </select>
      </div>
    </div>
  );
};

export default ItemDescription;
