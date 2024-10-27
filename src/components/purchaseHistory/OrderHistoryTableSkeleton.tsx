// src/components/purchaseHistory/TableForBuyerSkeleton.tsx

import React from "react";

type header = {
  title: string;
  span?: number;
};

type Props = {
  headers: header[];
};

const OrderHistoryTableSkeleton: React.FC<Props> = ({ headers }) => {
  return (
    <div className="relative w-full py-4">
      <div className="w-full py-4 overflow-x-auto scrollbar-hide">
        {/* Table Header Skeleton */}
        <div className="grid grid-cols-7 min-w-[800px] text-left font-bold text-[#6B6F93] text-[18px] py-4">
          {headers.map((header, index) => (
            <p key={index} className={`col-span-${header.span ?? 1}`}>
              {header.title}
            </p>
          ))}
        </div>

        {/* Table Entries Skeleton */}
        {new Array(4).fill(null).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 min-w-[800px] items-center py-4  animate-pulse"
          >
            <div className="col-span-2 h-48 bg-gray-200 w-full rounded-md" />
            <div className="col-span-1 h-4 bg-gray-200 w-full rounded-md" />
            <div className="col-span-1 h-4 bg-gray-200 w-full rounded-md" />
            <div className="col-span-1 h-4 bg-gray-200 w-full rounded-md" />
            <div className="col-span-1 h-4 bg-gray-200 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryTableSkeleton;
