import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { RatingCommentModal } from './RatingCommentModal'; // Import the new modal
import { ProductCard } from '../Profile/ProductCard';

interface ItemData {
  imageUrl: string;
  category: string;
  status: string;
  title: string;
  description: string;
  type: string;
  soldPrice: string;
}

interface TableProps {
  headers: { title: string; span?: number }[];
  data: ItemData[];
}

const TableForBuyer: React.FC<TableProps> = ({ headers, data }) => {
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const handleCommentClick = () => {
    setModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="relative w-full py-4">
      <div className="w-full py-4 overflow-x-auto scrollbar-hide">
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
            <p className="text-[#160041] text-sm">{item.type}</p>
            <p className="text-[#160041] text-sm">{item.soldPrice}</p>
            <p className="text-[#160041] text-sm">{item.status}</p>
            <div className="flex items-center col-span-2">
              <FaCommentDots className="text-[#022BFF] mr-2" />
              <button className="text-[#022BFF] font-semibold" onClick={handleCommentClick}>
                Add a Rating & Comment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Comment Modal */}
      <RatingCommentModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default TableForBuyer;