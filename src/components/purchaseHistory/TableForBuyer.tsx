import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { RatingCommentModal } from "./RatingCommentModal"; // Import the new modal
import { ProductCard } from "../Profile/ProductCard";
import OrderHistoryPrice from "./OrderHistoryPrice";

interface ItemData {
  imageUrl: string;
  category: string;
  status: string;
  title: string;
  description: string;
  type: string;
  soldPrice: number;
  currencyType: string;
  orderId: string;
}

interface TableProps {
  headers: { title: string; span?: number }[];
  data: ItemData[];
}

const TableForBuyer: React.FC<TableProps> = ({ headers, data }) => {
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [targetOrderId, setTargetOrderId] = useState<string>("");

  const handleCommentClick = (orderId: string) => {
    setTargetOrderId(orderId);
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
          <div
            key={index}
            className="grid grid-cols-7 gap-4 min-w-[800px] items-center py-4"
          >
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
            <OrderHistoryPrice
              soldPrice={item.soldPrice}
              currencyType={item.currencyType}
            />
            <p className="text-[#160041] text-sm">{item.status}</p>
            <div className="flex items-center col-span-2">
              <FaCommentDots className="text-[#022BFF] " />
              <button
                className="text-[#022BFF] font-semibold"
                onClick={() => {
                  handleCommentClick(item.orderId);
                }}
              >
                Add a Rating & Comment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Comment Modal */}
      <RatingCommentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        targetId={targetOrderId}
      />
    </div>
  );
};

export default TableForBuyer;
