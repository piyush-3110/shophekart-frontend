import Image from 'next/image'
import React from 'react'

export const Roadmap = () => {
  return (
    <div className='bg-black lg:min-h-[80vh] flex flex-col items-center lg:justify-center py-10 gap-12'>
       <h1 className='text-lg md:text-3xl text-white lg:mb-14 font-semibold'>RoadMap</h1>
        <Image src="/images/homepage/roadmap.png" height={1024} width={1024} className='w-full h-auto' alt='Roadmap'></Image>
    </div>
  )
}
