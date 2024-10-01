import Image from 'next/image';
import React from 'react';
import Rating from './Rating';

interface ReviewCardProps {
  avatarUrl: string;  // URL for the reviewer's avatar
  reviewerName: string;  // Name of the reviewer
  reviewDate: string;  // Date of the review
  title: string;  // Title of the review
  content: string;  // Content of the review
  ratingValue: number;  // Rating value
  helpfulCount: number;  // Number of helpful votes
  unhelpfulCount: number;  // Number of unhelpful votes
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarUrl,
  reviewerName,
  reviewDate,
  title,
  content,
  ratingValue,
  helpfulCount,
  unhelpfulCount,
}) => {
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
          <Image src="/images/itemDetails/like.png" height={17} width={17} className='w-5 h-5 ml-3' alt='like' />
          <p className="text-[16px] font-[600] text-[#6B6F93]">{helpfulCount}</p>

          <Image src="/images/itemDetails/dislike.png" height={17} width={17} className='w-5 ml-3 h-5' alt='dislike' />
          <p className="text-[16px] font-[600] text-[#6B6F93]">{unhelpfulCount}</p>
        </div>
      </div>
    </div>
  );
};
