import React from 'react'

export const Footer = () => {
  return (
    <div className='px-6 bg-[#151718] text-white py-16 md:px-16'>
        <div className='grid grid-cols-4  justify-between items-center'>
            <div className='flex flex-col gap-2'>
            <div className='mb-4'>LOGO</div>
            <p className='text-sm font-[400]'>+1 891 989-11-91</p>
            <p className='text-sm font-[400]'>info@cryptoshophe.com</p>
            <a 
  href='#' 
  className='py-3 mt-2 text-sm font-[400] px-4 w-fit inline-block text-white bg-transparent hover:bg-gradient-to-r hover:from-[#01F6FF] hover:via-[#017EFF] hover:to-[#0127FF] transition-all duration-500 ease-in-out'
  style={{
    border: '1px solid',
    borderImageSource: 'linear-gradient(91.65deg, #01F6FF -1.48%, #017EFF 26.31%, #0127FF 67.99%)',
    borderImageSlice: 1
  }}
>
  Get Started
</a>


            </div>
           
        </div>
    </div>
  )
}
