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
    <div className="w-full py-4 overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-7 min-w-[800px] text-left font-bold text-[#6B6F93] text-[18px] py-4">
        {headers.map((header, index) => (
          <p key={index} className={`col-span-${header.span || 1}`}>
            {header.title}
          </p>
        ))}
      </div>

      {/* Table Entries */}
      {data.map((item, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 min-w-[800px] items-center py-4">
          <div className="col-span-2">
            <ProductCard 
              imageUrl={item.imageUrl}
              category={item.category}
              status={item.status}
              title={item.title}
              description={item.description}
            />
          </div>
          <div className="col-span-2">
            <RatingFetcher ratingValue={item.ratingValue} ratingNumber={item.ratingNumber} />
          </div>
          <p className="text-[#160041] text-sm">{item.type}</p>
          <p className="text-[#160041] text-sm">{item.soldPrice}</p>
          <p className="text-[#160041] text-sm">{item.shipping}</p>
        </div>
      ))}
    </div>
  );
};

export default Table;
