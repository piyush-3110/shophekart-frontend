import Image from 'next/image'
import React from 'react'

export const Tokenomics = () => {
  return (
    <div className='bg-white overflow-hidden flex flex-col items-center py-12 lg:pt-40 gap-8'>
       
        <Image src="/images/homepage/tokenomics.png" height={1024} width={1024} className='h-auto w-[95vw] md:h-[50vh] md:w-auto lg:h-[85vh] lg:w-auto ' alt='Tokenomics'></Image>
    </div>
  )
}
