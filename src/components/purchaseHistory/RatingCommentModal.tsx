"use client";
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5'; // Close icon

interface RatingCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RatingCommentModal: React.FC<RatingCommentModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewType, setReviewType] = useState('');

  // Close the modal when clicking outside of it
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = 'hidden'; 
      document.body.style.overflowY = 'hidden';   
    } else {
      document.body.style.overflowX = 'hidden';   // Restore horizontal scrolling
      document.body.style.overflowY = 'auto';   // Restore vertical scrolling
    }
    return () => {
      document.body.style.overflowX = 'hidden';   // Clean up to restore horizontal scrolling
      document.body.style.overflowY = 'auto';    // Clean up to restore vertical scrolling
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle rating hover and click
  const handleMouseEnter = (index: number) => {
    setRating(index);
  };

  const handleStarClick = (index: number) => {
    setRating(index); // Set the rating to the clicked star
  };

  const handleSubmit = () => {
    // Handle submit logic here (e.g., send data to backend)
    console.log(`Submitted Rating: ${rating}, Comment: ${comment}, Review Type: ${reviewType}`);
    onClose(); // Close the modal after submission
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] md:w-[35rem] px-6 py-4 bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col h-full py-4 gap-3">
          <h1 className="text-[#160041] font-[700] text-center text-xl">Add a rating</h1>

          {/* Star Rating */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`cursor-pointer text-2xl ${star <= rating ? 'text-[#DFB300]' : 'text-[#DEDEDE]'}`}
                onMouseEnter={() => handleMouseEnter(star)}
                onClick={() => handleStarClick(star)}
              >
                ★
              </div>
            ))}
          </div>

          {/* Review Type Dropdown */}
          <label className="text-[#ADB3C6] mb-2">Review Type</label>
          <select
            className="border border-[#EFF1F7] w-full p-2 rounded mb-4 bg-[#F9FBFC] text-[#302f2f]"
            value={reviewType}
            onChange={(e) => setReviewType(e.target.value)}
          >
            <option value="">Select review type</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
            <option value="Neutral">Neutral</option>
          </select>

          {/* Comment Field */}
          <label className="text-[#ADB3C6] mb-2">Add a Comment</label>
          <textarea
            className="border border-[#EFF1F7] w-full h-[10rem] text-[#302f2f] bg-[#F9FBFC] placeholder-[#ADB3C6] p-2 rounded"
            placeholder="Your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Submit Button */}
          <button
            className="gradient-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
