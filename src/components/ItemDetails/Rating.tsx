"use client"
import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Full and half star icons
import {IconContext} from 'react-icons'; // For consistent icon sizing

interface RatingProps {
  ratingValue: number; // Rating value passed as prop (e.g., 3.5)
}

const Rating: React.FC<RatingProps> = ({ ratingValue }) => {
  // Determine if the star should be full, half, or empty
  const renderStars = () => {
    const stars = [];

    // Loop to render 5 stars
    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        // Full star
        stars.push(<FaStar key={i} color="#feca45" />);
      } else if (ratingValue >= i - 0.5) {
        // Half star for fractional rating
        stars.push(<FaStarHalfAlt key={i} color="#feca45" />);
      } else {
        // Empty star
        stars.push(<FaStar key={i} color="#dfdfde" />);
      }
    }

    return stars;
  };

  return (
    <div className="flex space-x-[2px]">
      {/* Render stars */}
      <IconContext.Provider value={{ size: '15px' }}>
        {renderStars()}
      </IconContext.Provider>
    </div>
  );
};

export default Rating;
