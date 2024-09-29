import React from 'react'

import ItemCard from './ItemCard'
import { ItemDescription } from './ItemDescription';
import { ReviewCard } from './ReviewCard';

export const ItemDetail = () => {
    const imageUrls = [
        '/images/itemDetails/bag.png',
        '/images/itemDetails/bag.png',
        '/images/itemDetails/bag.png',
        '/images/itemDetails/bag.png',
      ];
  return (
    <div className='bg-white px-12 py-8'>
    <div className='flex flex-col items-center justify-center gap-8'>
      
        <div className='flex gap-12 items-center justify-center'> {/* {Item Details Section} */}
              
              <div >
   <ItemCard images={imageUrls} />
              </div>
<div className=''>  
    <ItemDescription/>
</div>
        </div>
        <div>
        <div className='flex w-[70vw] justify-between items-center '>
      <h1 className="text-[#160041] font-[700] text-lg">Comments</h1>
      <button className='py-2 px-4 border-[1px] text-[#022AFF] text-sm border-[#022AFF]'> Write a comment</button>
            
        </div>
<ReviewCard/>
        </div>
    </div>
    </div>
  )
}
