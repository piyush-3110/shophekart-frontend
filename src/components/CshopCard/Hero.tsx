import React from 'react'

export const Hero = () => {
  return (
    <div className='min-h-[100vh] flex items-center justify-center gap-12 '>
        <div className='bg-red-100 w-[50vw]'>
            {/* Div for content */}
            <h1 className='text-wrap w-full text-[23px] md:text-[44px] font-semibold'>CSHOP MasterCard: 
            The <span className='gradient-text !text-[22px] md:!text-[44px] '>Future of Convenient </span>Cryptocurrency Spending</h1>
            <button className='gradient-button my-8'>Get Your Card</button>
        </div>
        <div className='w-[40vw] bg-red-400 h-[70vh]'>

        </div>
{/* Div for mastercard */}
    </div>
  )
}
