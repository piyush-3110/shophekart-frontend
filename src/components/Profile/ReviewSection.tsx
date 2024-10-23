import React, { useEffect, useState } from 'react';
import { ReviewCard } from '../ItemDetails/ReviewCard';
import httpRequestService from '@/services/httpRequest.service'; 

export const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const targetId = '67192457d7dc8fc2f77376f7'; 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await httpRequestService.fetchApi<any[]>(`/review/target/${targetId}`);

        const mappedReviews = response.data.map(review => ({
          id: review._id,
          avatarUrl: "/images/itemDetails/avatar.png",
          reviewerName: review.reviewerId,
          reviewDate: new Date(review.createdAt).toLocaleDateString(),
          title: review.comment.substring(0, 20), 
          content: review.comment,
          ratingValue: review.rating,
          helpfulCount: review.likes,
          unhelpfulCount: review.dislikes,
        }));
        setReviews(mappedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [targetId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews found.</p>;
  }

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
