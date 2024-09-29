import React from 'react'
import Rating from './Rating'

export const ItemDescription = () => {
  return (
    <div>
        <div className='rounded-lg bg-[#022BFF] text-white text-sm'>Bags</div>
        <h1 className='text-[#160041] font-[700] text-lg'>Camera Sling Bag</h1>
        <Rating ratingValue={3.5} />

    </div>
  )
}
