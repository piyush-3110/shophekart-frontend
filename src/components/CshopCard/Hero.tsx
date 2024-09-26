import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <div className='min-h-[90vh] flex items-center justify-center gap-28 '>
        <div className=' w-[40vw]'>
            {/* Div for content */}
            <h1 className='text-wrap w-full text-[23px] md:text-[40px] font-semibold'>CSHOP MasterCard: 
            The <span className='gradient-text !text-[22px] md:!text-[40px] '>Future of Convenient </span>Cryptocurrency Spending</h1>
            <button className='gradient-button my-8'>Get Your Card</button>
        </div>
        <div className='lg:block hidden mb-16 z-[1] relative mt-8 '>
          <Image
            alt='MasterCard'
            src='/images/homepage/Partners/mastercard2.png'
            height={524}
            width={524}
            className='h-[55vh] w-auto rotate-left'
          />
          <Image
            alt='MasterCard'
            src='/images/homepage/Partners/mastercard1.png'
            height={524}
            width={524}
            className='h-[45vh] w-auto absolute z-[1] top-0 -right-10 rotate-right'
          />
        </div>
        <div className="blob1" />
{/* Div for mastercard */}
    </div>
  )
}
