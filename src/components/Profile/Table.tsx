import React from 'react';
import { ProductCard } from './ProductCard';
import { RatingFetcher } from './RatingFetcher';

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
  soldPrice: string;
  shipping: string;
}

interface TableProps {
  headers: { title: string; span?: number }[];
  data: ItemData[];
}

// Table Component
const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="w-full py-4">
      {/* Table Header */}
      <div className="grid grid-cols-5 text-left font-bold text-[#6B6F93] text-lg gap-8 py-4">
        {headers.map((header, index) => (
          <p key={index} className={`col-span-${header.span || 1}`}>
            {header.title}
          </p>
        ))}
      </div>

      {/* Table Entries */}
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-8 items-center py-4">
          <ProductCard 
            imageUrl={item.imageUrl}
            category={item.category}
            status={item.status}
            title={item.title}
            description={item.description}
          />
          <RatingFetcher ratingValue={item.ratingValue} ratingNumber={item.ratingNumber} />
          <p className="text-[#160041] text-lg">{item.type}</p>
          <p className="text-[#160041] text-lg">{item.soldPrice}</p>
          <p className="text-[#160041] text-lg">{item.shipping}</p>
        </div>
      ))}
    </div>
  );
};

export default Table;
