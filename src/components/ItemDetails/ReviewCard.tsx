import Image from 'next/image';
import React, { useState } from 'react';
import Rating from './Rating';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useToast } from '@/hooks/use-toast';
import { envConfig } from '@/config/envConfig'; // Importing envConfig

interface ReviewCardProps {
  reviewId: string;
  avatarUrl: string;
  reviewerName: string;
  reviewDate: string;
  title: string;
  content: string;
  ratingValue: number;
  initialHelpfulCount: number;
  initialUnhelpfulCount: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewId,
  avatarUrl,
  reviewerName,
  reviewDate,
  title,
  content,
  ratingValue,
  initialHelpfulCount,
  initialUnhelpfulCount,
}) => {
  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
  const [unhelpfulCount, setUnhelpfulCount] = useState(initialUnhelpfulCount);

  const { user } = useUserStore();
  const { toast } = useToast(); // Get the toast function from the hook

  const handleLike = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      const response = await axios.patch(`${envConfig.BACKEND_URL}/review/increase-like/${reviewId}`, {
        userId: user._id,
      });

      if (response.data.success) {
        setHelpfulCount((prevCount) => prevCount + 1);
        toast({
          title: "Liked!",
          description: "Your like has been registered.",
          action: undefined,
        });
      } else {
        console.error('Failed to increase like:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast({
          title: "Already Liked",
          description: "You have already liked this review.",
          action: undefined,
        });
      } else {
        console.error('Error occurred while liking:', error);
      }
    }
  };

  const handleDislike = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      const response = await axios.patch(`${envConfig.BACKEND_URL}/review/increase-dislike/${reviewId}`, {
        userId: user._id,
      });

      if (response.data.success) {
        setUnhelpfulCount((prevCount) => prevCount + 1);
        toast({
          title: "Disliked!",
          description: "Your dislike has been registered.",
          action: undefined,
        });
      } else {
        console.error('Failed to increase dislike:', response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        toast({
          title: "Already Disliked",
          description: "You have already disliked this review.",
          action: undefined,
        });
      } else {
        console.error('Error occurred while disliking:', error);
      }
    }
  };

  return (
    <div className='flex gap-4 mt-6 py-3'>
      <Image src={avatarUrl} alt='avatar' height={74} width={74} className='h-12 w-12' />
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3'>
          <Rating ratingValue={ratingValue} />
          <div className="w-[1px] bg-[#6B6F93] h-4"></div>
          <h1 className="text-[#160041] font-[700] text-md">{`by ${reviewerName}`}</h1>
          <div className="w-[1px] bg-[#6B6F93] h-4"></div>
          <p className="text-[16px] font-[400] text-[#6B6F93]">{reviewDate}</p>
        </div>
        <h1 className="text-[#160041] font-[700] text-md">{title}</h1>
        <p className="text-[14px] font-[400] text-[#6B6F93] w-[90%]">{content}</p>

        <div className='flex gap-2 items-center'>
          <p className="text-[16px] font-[700] text-[#6B6F93]">Was this comment helpful?</p>
          <Image
            src="/images/itemDetails/like.png"
            height={17}
            width={17}
            className='w-5 h-5 ml-3 cursor-pointer'
            alt='like'
            onClick={handleLike}
          />
          <p className="text-[16px] font-[600] text-[#6B6F93]">{helpfulCount}</p>

          <Image
            src="/images/itemDetails/dislike.png"
            height={17}
            width={17}
            className='w-5 ml-3 h-5 cursor-pointer'
            alt='dislike'
            onClick={handleDislike}
          />
          <p className="text-[16px] font-[600] text-[#6B6F93]">{unhelpfulCount}</p>
        </div>
      </div>
    </div>
  );
};
