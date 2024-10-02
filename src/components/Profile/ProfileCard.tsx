import Image from 'next/image'
import React from 'react'
import Rating from '../ItemDetails/Rating'

export const ProfileCard = () => {
  return (
  
        <div className='min-h-[40vh] pb-6 rounded-md bg-white border border-red-200 shadow-sm w-[80%] mx-auto'>
            <div className='h-[136px] relative w-full '>
                <Image src="/images/profile/cover.png" width={524} height={524} className='w-[99%] mx-auto h-full mt-1 object-cover' alt='images'/>
                <Image src="/images/profile/profile.png" alt='profile' height={500} width={500} className='h-24 absolute z-[1] -bottom-9 left-8 w-24'/>
            </div>
<div>
    <div className='mx-8 mt-12 flex flex-col gap-2'>

<h1 className="text-[#160041]  font-[700] text-xl">Piyush Das</h1>
<div className="flex gap-3 items-center">
        <h1 className="text-[#160041] font-[700] text-md">4.4</h1>
        <Rating ratingValue={4.4} />
        <h1 className="text-[#6B6F93] font-[700] text-sm">1980</h1>
        </div>
        <div className='border-t my-2 w-full bg-[#6B6F93]'></div>
        <p className='text-sm font-[400] text-[#6B6F93]'>
        Discover a curated selection of high-quality products designed to enhance your lifestyle. From the latest trends to everyday essentials, our store offers something for everyone.
        </p>
    </div>

</div>
        </div>

  )
}
