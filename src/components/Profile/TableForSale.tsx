import React from 'react';
import { ProductCard } from './ProductCard';

// Define types for the item data
interface ItemData {
  imageUrl: string;
  category: string;
  status: string;
  title: string;
  description: string;
  ratingValue: number;
  ratingNumber: number;
  type: string;
  price: string;  // Change from soldPrice to price
  shipping: string;
}

interface TableProps {
  headers: { title: string; span?: number }[];
  data: ItemData[];
}

// Table Component
const TableForSale: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="w-full py-4">
      {/* Table Header */}
      <div className="grid grid-cols-6 text-left font-bold text-[#6B6F93] text-[18px] py-4">
        {headers.map((header, index) => (
          <p key={index} className={`col-span-${header.span || 1}`}>
            {header.title}
          </p>
        ))}
      </div>

      {/* Table Entries */}
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-6 gap-6 items-center py-4">
          <div className="col-span-2">
            <ProductCard 
              imageUrl={item.imageUrl}
              category={item.category}
              status={item.status}
              title={item.title}
              description={item.description}
            />
          </div>
         
          <p className="text-[#160041] text-sm">{item.type}</p>
          <p className="text-[#160041] text-sm">{item.price}</p>
          <p className="text-[#160041] text-sm">{item.shipping}</p>
          <div className="flex space-x-2">
            <button className="text-blue-500 text-sm">Edit</button>
            <button className="text-red-500 text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableForSale;
