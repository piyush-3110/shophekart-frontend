import Image from 'next/image'
import React from 'react'

export const ProductCard = () => {
  return (
    <div className='flex gap-2 items-center'>
<div className='h-[10rem] w-[8rem]'>
    <Image src="/images/itemDetails/bag.png" alt='bag' height={500} width={500} className='h-[90%] object-contain'/>
</div>
<div>
    <div className='flex gap-4'>
    <div className="rounded-xl bg-[#022BFF] w-fit px-3 py-1 text-white text-sm">
        Bags
      </div>
      <p className='text-sm font-[400] text-[#6B6F93]'>
      Sold</p>
    </div>
</div>
    </div>
  )
}
