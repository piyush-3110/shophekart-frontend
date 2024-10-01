import React from 'react'
import Rating from '../ItemDetails/Rating'

interface RatingFetcherProps {
  ratingValue: number;
  ratingNumber: number;
}

export const RatingFetcher: React.FC<RatingFetcherProps> = ({ ratingValue, ratingNumber }) => {
  return (
    <div>
      <h1 className="text-[#160041] font-[700] text-md">{ratingValue}</h1>
      <Rating ratingValue={ratingValue} />
      <h1 className="text-[#6B6F93] font-[700] text-sm">{ratingNumber}</h1>
    </div>
  )
}
