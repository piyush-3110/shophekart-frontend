import Image from 'next/image'
import React from 'react'
import Rating from './Rating'

export const ReviewCard = () => {
  return (
    <div className='flex gap-4 mt-6'>
        <Image src="/images/itemDetails/avatar.png" alt='avatar' height={74} width={74} className='h-12 w-12'/>
        <div className='flex flex-col gap-2 '>
            <div className=' flex items-center gap-3'>
                <Rating ratingValue={4.5}/>
                <div className="w-[1px] bg-[#6B6F93] h-4"></div>
                <h1 className="text-[#160041] font-[700] text-md">by Piyush</h1>
                <div className="w-[1px] bg-[#6B6F93] h-4"></div>
                <p className="text-[16px] font-[400] text-[#6B6F93]">
      25 Sept,2024
    </p>
            </div>
            <h1 className="text-[#160041] font-[700] text-md">Great for the Price</h1>
            <p className="text-[14px] font-[400] text-[#6B6F93] w-[90%]">

            Bag is much better than I expected. I was not looking for an expensive bag as I find they wear out as much as the cheaper ones. For the price, this is a great bargain. I am short, but I ordered the large bag. It is big enough without making me look like I am lugging a suitcase.</p>
            <div className='flex gap-2 items-center'>
        <p className="text-[16px] font-[700] text-[#6B6F93]">
        Was this comment helpful?</p>
        <Image src="/images/itemDetails/like.png" height={17} width={17} className='w-5 h-5 ml-3' alt='like'/>
        <p className="text-[16px] font-[600] text-[#6B6F93]">8</p>

        <Image src="/images/itemDetails/dislike.png" height={17} width={17} className='w-5 ml-3 h-5' alt='like'/>
        <p className="text-[16px] font-[600] text-[#6B6F93]">0
</p>

        </div>
       
        </div>
        
        
    </div>
  )
}
