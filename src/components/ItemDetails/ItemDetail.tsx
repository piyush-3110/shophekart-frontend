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
    <div className='bg-white px-4 lg:px-12 py-8'>
    <div className='flex flex-col items-center justify-center gap-8'>
      
        <div className='flex flex-col md:flex-row gap-4 lg:gap-12 items-center justify-center'> {/* {Item Details Section} */}
              
              <div >
   <ItemCard images={imageUrls} />
              </div>
<div className=''>  
    <ItemDescription/>
</div>
        </div>
        <div>
        <div className='flex pl-16 w-[80vw] justify-between items-center '>
      <h1 className="text-[#160041] font-[700] text-lg">Comments</h1>
      <button className='py-2 px-4 border-[1px] text-[#022AFF] text-sm border-[#022AFF]'> Write a comment</button>
            
        </div>
        <div className='pl-16 flex flex-col items-center gap-3'>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/>
        <button className='text-[#022AFF] font-[700] mx-auto text-sm underline text-center'>Load more</button>

        </div>

        </div>
    </div>
    </div>
  )
}
