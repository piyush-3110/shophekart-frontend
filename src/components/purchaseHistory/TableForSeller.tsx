import React, { useEffect, useState } from "react";

import { ProductCard } from "../Profile/ProductCard";
import { OrderService } from "@/services";
import { toast } from "@/hooks/use-toast";
import { useChangeOrderStatus } from "@/hooks";

interface ItemData {
  imageUrl: string;
  category: string;
  status: string;
  title: string;
  description: string;
  type: string;
  soldPrice: string;
  nftId: number;
  orderId: string;
}

interface TableProps {
  headers: { title: string; span?: number }[];
  data: ItemData[];
}

const TableForSeller: React.FC<TableProps> = ({ headers, data }) => {
  const [statuses, setStatuses] = useState<string[]>(
    data.map((item) => item.status)
  );

  const [orderId, setOrderId] = useState<string>("");

  const { isLoading, isSuccess, mutateAsync } = useChangeOrderStatus(orderId);

  // Handle dropdown change for the order status
  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = newStatus;
    setStatuses(updatedStatuses);
  };

  // Handle submit action to update status
  const handleSubmitStatus = async (index: number) => {
    const updatedStatus = statuses[index];
    const item = data[index];

    setOrderId(item.orderId);

    if (updatedStatus === "delivering") {
      try {
        await mutateAsync(item.orderId);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error while updating order status",
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Order status updated successfully",
      });
    }
  }, [isSuccess]);

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
                status={statuses[index]} // Use local status
                title={item.title}
                description={item.description}
              />
            </div>
            <p className="text-[#160041] text-sm">{item.type}</p>
            <p className="text-[#160041] text-sm">{item.soldPrice}</p>

            {/* Dropdown to select status */}
            <div className="text-[#160041] text-sm">
              <select
                value={statuses[index]}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="border border-gray-300 rounded-md p-1 text-sm"
              >
                <option value="pending" disabled>
                  Pending
                </option>
                <option value="delivering">Delivering</option>
              </select>
            </div>

            {/* Submit button to update status */}
            <div className="flex items-center col-span-2">
              <button
                onClick={() => handleSubmitStatus(index)}
                className="text-green-600 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Submit"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableForSeller;
