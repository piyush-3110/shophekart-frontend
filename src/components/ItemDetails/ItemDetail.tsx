import React from 'react'
import { ItemReview } from './ItemReview'

export const ItemDetail = () => {
  return (
    <div className='bg-white px-12 py-8'>
    <div className='flex flex-col items-center justify-center gap-8'>
      
        <div className='flex gap-6 items-center justify-center'>
              {/* {Item Details Section} */}
              <div>
          {/* Item Image Section */}

                <ItemDetail/>
              </div>
<div className='flex flex-col gap-3'>
         {/* Item Description Section */}
</div>
        </div>
        <div>
<ItemReview/>
        </div>
    </div>
    </div>
  )
}
