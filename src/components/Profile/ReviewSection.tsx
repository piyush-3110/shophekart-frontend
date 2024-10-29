import { FC } from "react";
import { ReviewCard } from "../ItemDetails/ReviewCard";
import httpRequestService from "@/services/httpRequest.service";
import { useQuery } from "@tanstack/react-query";
import FetchError from "../shared/FetchError";

type TProps = {
  targetId: string;
};

export const ReviewSection: FC<TProps> = ({ targetId }) => {
  const {
    isLoading,
    data: reviews,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews", targetId],
    async queryFn() {
      const { data } = await httpRequestService.fetchApi<TReviewDocument[]>(
        `/review/target/${targetId}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (error || !reviews) return <FetchError refetch={refetch} />;

  if (reviews.length < 1) {
    return (
      <p className="text-lg text-gray-400 text-center  my-8">
        You haven&apos;t received any reviews yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          reviewId={review._id}
          avatarUrl={"/images/itemDetails/avatar.png"}
          reviewerName={review.reviewerId}
          reviewDate={new Date(review.createdAt).toLocaleDateString()}
          title={review.comment.substring(0, 20)}
          content={review.comment}
          ratingValue={review.rating}
          initialHelpfulCount={review.likes}
          initialUnhelpfulCount={review.dislikes}
        />
      ))}
    </div>
  );
};

type TReviewDocument = {
  _id: string;
  targetId: string; // Reference to Product or User based on targetType
  targetType: "product" | "user"; // Type of review target (Product or User)
  reviewerId: string; // Reference to User who is reviewing
  reviewType: "positive" | "neutral" | "negative"; // Type of review
  rating: number; // Rating between 1 and 5
  comment: string; // Review comment
  likes: number; // Number of likes on the review
  dislikes: number; // Number of dislikes on the review
  replyNumber: number | undefined;
  likedBy: string;
  dislikedBy: string;
  createdAt: Date; // Timestamp when review was created
  updatedAt: Date; // Timestamp when review was last updated
};
