import Image from 'next/image'
import React from 'react'

export const Tokenomics = () => {
  return (
    <div className='bg-white flex flex-col items-center py-10 gap-8'>
       
        <Image src="/images/homepage/tokenomics.png" height={1024} width={1024} className='h-[80vh] w-auto'></Image>
    </div>
  )
}
