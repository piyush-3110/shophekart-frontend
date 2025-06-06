/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons
import { EditPriceModal } from './ExampleComponent';

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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Check if content overflows and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Attach scroll listener and check scroll position initially
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', handleResize);
      checkScrollPosition();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll handler for clicking arrows
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-4">
      {/* Scroll Arrows */}
      {showLeftArrow && (
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          onClick={() => scroll('left')}
        >
          <FaArrowLeft size={20} />
        </button>
      )}
      {showRightArrow && (
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          onClick={() => scroll('right')}
        >
          <FaArrowRight size={20} />
        </button>
      )}

      {/* Scrollable Table Content */}
      <div ref={scrollRef} className="w-full py-4 overflow-x-auto scrollbar-hide">
        {/* Table Header */}
        <div className="grid grid-cols-6 min-w-[800px] text-left font-bold text-[#6B6F93] text-[18px] py-4 gap-3">
          {headers.map((header, index) => (
            <p key={index} className={`col-span-${header.span || 1}`}>
              {header.title}
            </p>
          ))}
        </div>

        {/* Table Entries */}
        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-6 min-w-[800px] items-center py-4">
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
            <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-md">
       Update
      </button>

      <EditPriceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        previousPrice={100}
        previousCurrencyType="USDT"
      />
              <button className="text-red-500 text-sm font-[700]">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableForSale;
