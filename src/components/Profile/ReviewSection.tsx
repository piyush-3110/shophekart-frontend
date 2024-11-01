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
            <p
                className="text-lg text-gray-400 text-center my-8 p-4"
            >
                No reviews yet!
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
                    walletAddress={review.reviewer.walletAddress}
                    reviewDate={new Date(review.createdAt).toLocaleDateString()}
                    content={review.comment}
                    ratingValue={review.rating}
                    initialHelpfulCount={review.likes}
                    initialUnhelpfulCount={review.dislikes}
                    isLikedByUser={review.isLikedByUser}
                    isDislikedByUser={review.isDislikedByUser}
                    trustScore={review.reviewer.trustScore}
                />
            ))}
        </div>
    );
};

type TReviewDocument = {
    _id: string;
    dislikes: number;
    createdAt: Date;
    reviewer: {
        walletAddress: `0x${string}`;
        trustScore: number;
    };
    reviewType: "positive" | "negative" | "neutral";
    rating: number;
    comment: string;
    likes: number;
    isLikedByUser: boolean
    isDislikedByUser: boolean
}
