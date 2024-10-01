import React, { useState, useRef, useEffect } from 'react';
import { ProductCard } from '../Profile/ProductCard';
import { FaArrowLeft, FaArrowRight, FaCommentAlt } from 'react-icons/fa'; // Import arrow and chat icons

// Define types for the item data
interface ItemData {
  imageUrl: string;
  category: string;
  status: string;
  title: string;
  description: string;
  ratingButton: string;
  ratingComment: string;
}

interface TableProps {
  headers: { title: string; span?: number }[];
  data: ItemData[];
}

// Table Component for Buyer
const TableForBuyer: React.FC<TableProps> = ({ headers, data }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
            <p className="text-[#160041] text-sm">{item.status}</p>
            <div className="col-span-2 flex items-center">
              <FaCommentAlt className="mr-2 text-[#022BFF]" />
              <button className="text-[#022BFF] text-sm font-semibold">
                {item.ratingButton}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableForBuyer;
