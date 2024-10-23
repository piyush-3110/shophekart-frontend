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

const TableForSeller: React.FC<TableProps> = ({ headers, data }) => {
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [statuses, setStatuses] = useState<string[]>(data.map(item => item.status)); // Manage each item's status locally
  const [loading, setLoading] = useState(false); // Track loading state for the API call

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

    setLoading(true);

    try {
      // Simulating an API call to update order status
      const response = await fetch(`/api/update-order-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: item.title, newStatus: updatedStatus }), // Adjust the payload according to your API structure
      });

      if (response.ok) {
        alert(`Status updated to "${updatedStatus}" for ${item.title}`);
      } else {
        alert('Failed to update the status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Submit button to update status */}
            <div className="flex items-center col-span-2">
              <button
                onClick={() => handleSubmitStatus(index)}
                className="text-green-600 font-semibold"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Submit'}
              </button>
              <FaCommentDots className="text-[#022BFF] ml-4" />
              <button className="text-[#022BFF] font-semibold ml-1" onClick={handleCommentClick}>
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

export default TableForSeller;
