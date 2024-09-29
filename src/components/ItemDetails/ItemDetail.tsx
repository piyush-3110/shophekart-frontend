import React from 'react'
import { ItemReview } from './ItemReview'
import ItemCard from './ItemCard'
import Rating from './Rating';

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
      
        <div className='flex gap-6 items-center justify-center'>
              {/* {Item Details Section} */}
              <div>
          {/* Item Image Section */}

                <ItemCard images={imageUrls} />
              </div>
<div className='flex flex-col gap-3'>
         {/* Item Description Section */}
         <Rating ratingValue={3.5} />
</div>
        </div>
        <div>
<ItemReview/>
        </div>
    </div>
    </div>
  )
}
