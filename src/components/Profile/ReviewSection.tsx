import React from 'react';
import { ReviewCard } from '../ItemDetails/ReviewCard';

// Dummy data for the review cards (replace with actual data as needed)
const reviews = [
  {
    id: 1,
    avatarUrl: "/images/itemDetails/avatar.png",
    reviewerName: "Piyush",
    reviewDate: "25 Sept, 2024",
    title: "Great for the Price",
    content: "Bag is much better than I expected. I was not looking for an expensive bag as I find they wear out as much as the cheaper ones. For the price, this is a great bargain. I am short, but I ordered the large bag. It is big enough without making me look like I am lugging a suitcase.",
    ratingValue: 4.5,
    helpfulCount: 8,
    unhelpfulCount: 0,
  },
  {
    id: 2,
    avatarUrl: "/images/itemDetails/avatar2.png",
    reviewerName: "Aditi",
    reviewDate: "24 Sept, 2024",
    title: "Not Bad",
    content: "It's decent for the price. Good value overall.",
    ratingValue: 3.0,
    helpfulCount: 3,
    unhelpfulCount: 1,
  },
  // Add more reviews as needed...
];

export const ReviewSection: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          avatarUrl={review.avatarUrl}
          reviewerName={review.reviewerName}
          reviewDate={review.reviewDate}
          title={review.title}
          content={review.content}
          ratingValue={review.ratingValue}
          helpfulCount={review.helpfulCount}
          unhelpfulCount={review.unhelpfulCount}
        />
      ))}
    </div>
  );
};
