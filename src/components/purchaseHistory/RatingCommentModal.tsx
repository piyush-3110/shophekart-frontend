"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import httpRequestService from "@/services/httpRequest.service";
import { useUserStore } from "@/store";

interface RatingCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
}

export const RatingCommentModal: React.FC<RatingCommentModalProps> = ({
  isOpen,
  onClose,
  targetId,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewType, setReviewType] = useState("");
  const { user } = useUserStore();

  console.log(targetId);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMouseEnter = (index: number) => {
    setRating(index);
  };

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const reviewData = {
        targetId,
        reviewerId: user._id,
        targetType: "product",
        reviewType: reviewType.toLowerCase(),
        rating,
        comment,
      };

      const response = await httpRequestService.postApi(
        "/review/create",
        reviewData
      );

      if (response.success) {
        console.log("Review submitted successfully:", response.data);
      } else {
        console.error("Failed to submit review:", response.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] md:w-[35rem] px-6 py-4 bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col h-full py-4 gap-3">
          <h1 className="text-[#160041] font-[700] text-center text-xl">
            Add a rating
          </h1>

          {/* Star Rating */}
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-[#DFB300]" : "text-[#DEDEDE]"
                }`}
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
          <button className="gradient-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
