import Image from "next/image";
import React, { useState } from "react";
import Rating from "./Rating";
import { useUserStore } from "@/store";
import { toast } from "@/hooks/use-toast";
import WalletAddressWithCopy from "../shared/WalletAddressWithCopy";
import { DislikeIcon, LikeIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { useDislikeReview, useLikeReview } from "@/hooks";
import { AxiosError } from "axios";
import TrustScoreWithTooltip from "../shared/TrustScoreWithTooltip";

export const ReviewCard: React.FC<ReviewCardProps> = (props) => {
    const [likeCount, setLikeCount] = useState(props.initialHelpfulCount);
    const [dislikeCount, setDislikeCount] = useState(props.initialUnhelpfulCount);
    const [isLiked, setIsLiked] = useState(props.isLikedByUser)
    const [isDisliked, setIsDisliked] = useState(props.isDislikedByUser)

    const { user } = useUserStore();

    const { likeReview } = useLikeReview()
    const { dislikeReview } = useDislikeReview()

    async function handleLike() {
        const originalIsLiked = isLiked;
        const originalIsDisliked = isDisliked;
        const originalLikeCount = likeCount;
        const originalDislikeCount = dislikeCount;
        try {
            if (originalIsLiked) {
                // User is unliking the review
                setIsLiked(false);
                setLikeCount(originalLikeCount - 1);
            } else if (originalIsDisliked) {
                // User was disliking the review, but now likes it
                setIsDisliked(false);
                setDislikeCount(originalDislikeCount - 1);
                setIsLiked(true);
                setLikeCount(originalLikeCount + 1);
            } else {
                // User likes the review
                setIsLiked(true);
                setLikeCount(originalLikeCount + 1);
            }
            await likeReview({ reviewId: props.reviewId, userId: user?._id, alreadyLiked: isLiked });
        } catch (error) {
            // Revert the state changes to maintain consistency
            setIsLiked(originalIsLiked);
            setIsDisliked(originalIsDisliked);
            setLikeCount(originalLikeCount);
            setDislikeCount(originalDislikeCount);
            if (error instanceof AxiosError) {
                toast({
                    title: "Error liking",
                    description: error.status === 401 ? "You are not logged in" : null,
                    variant: "destructive"
                });
                return
            }
            toast({
                title: "Error liking",
                variant: "destructive",
            });
        }
    }

    async function handleDislike() {
        const originalIsLiked = isLiked;
        const originalIsDisliked = isDisliked;
        const originalLikeCount = likeCount;
        const originalDislikeCount = dislikeCount;
        try {
            if (originalIsDisliked) {
                // User is undisliking the review
                setIsDisliked(false);
                setDislikeCount(originalDislikeCount - 1);
            } else if (originalIsLiked) {
                // User was liking the review, but now dislikes it
                setIsLiked(false);
                setLikeCount(originalLikeCount - 1);
                setIsDisliked(true);
                setDislikeCount(originalDislikeCount + 1);
            } else {
                // User dislikes the review
                setIsDisliked(true);
                setDislikeCount(originalDislikeCount + 1);
            }
            await dislikeReview({ reviewId: props.reviewId, userId: user?._id, alreadyDisliked: isDisliked });
        } catch (error) {
            // Revert the state changes to maintain consistency
            setIsLiked(originalIsLiked);
            setIsDisliked(originalIsDisliked);
            setLikeCount(originalLikeCount);
            setDislikeCount(originalDislikeCount);
            if (error instanceof AxiosError) {
                toast({
                    title: "Error disliking",
                    description: error.status === 401 ? "You are not logged in" : null,
                    variant: "destructive"
                });
                return
            }
            toast({ title: "Error disliking", variant: "destructive" });
        }
    }



    return (
        <div className="flex gap-4 mt-6 py-3">
            <Image
                src={props.avatarUrl}
                alt="avatar"
                height={74}
                width={74}
                className="h-12 w-12"
            />
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <Rating ratingValue={props.ratingValue} />
                    <div className="w-[1px] bg-[#6B6F93] h-4"></div>
                    <WalletAddressWithCopy walletAddress={props.walletAddress} className="text-[#160041] font-[700] text-md" />
                    <div className="w-[1px] bg-[#6B6F93] h-4"></div>
                    <p className="text-[16px] font-[400] text-[#6B6F93]">{props.reviewDate}</p>
                    <div className="w-[1px] bg-[#6B6F93] h-4"></div>
                    <TrustScoreWithTooltip trustScore={props.trustScore} />
                </div>
                <p className="text-[14px] font-[400] text-[#6B6F93] w-[90%]">
                    {props.content}
                </p>
                <div className="flex gap-2 items-center">
                    <p className="text-[16px] font-[700] text-[#6B6F93]">
                        Was this comment helpful?
                    </p>
                    <div className="flex items-center gap-2">
                        <button aria-label="like" onClick={handleLike}>
                            <LikeIcon className={cn("w-6 ml-3 h-6 cursor-pointer hover:fill-blue-600", isLiked && "fill-blue-600")} />
                        </button>
                        <p className="text-[16px] font-[600] text-[#6B6F93]">
                            {likeCount}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button aria-label="dislike" onClick={handleDislike}>
                            <DislikeIcon className={cn("w-6 ml-3 h-6 cursor-pointer hover:fill-red-600", isDisliked && "fill-red-600")} />
                        </button>
                        <p className="text-[16px] font-[600] text-[#6B6F93]">
                            {dislikeCount}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

interface ReviewCardProps {
    reviewId: string;
    avatarUrl: string;
    walletAddress: `0x${string}`;
    reviewDate: string;
    content: string;
    ratingValue: number;
    initialHelpfulCount: number;
    initialUnhelpfulCount: number;
    isLikedByUser: boolean
    isDislikedByUser: boolean
    trustScore: number
}
