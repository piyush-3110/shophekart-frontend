"use client"
import React from 'react'
import Rating from './Rating'
import Image from 'next/image'
import Link from 'next/link'
import Countdown from './CountDown'

export const ItemDescription = () => {
  return (
    <div className='flex flex-col gap-3  w-[40vw]'>
        <div className='rounded-xl  bg-[#022BFF] w-fit px-3 py-1 text-white text-sm'>Bags</div>
        <h1 className='text-[#160041] font-[700] text-xl'>Camera Sling Bag</h1>
        <div className='flex gap-2 items-center'>
        <h1 className='text-[#160041] font-[700] text-md'>3.5</h1>

        <Rating ratingValue={3.5} />
        <h1 className='text-[#6B6F93] font-[700] text-sm'>1980</h1>
        <div className='w-[1px] bg-[#6B6F93] h-4'></div>
<h1 className='text-[#160041] font-[700] text-md'>by Piyush</h1>
<div className='w-[1px] bg-[#160041] h-4'></div>
<div className='flex gap-1 items-center'>
    <Image src="/images/itemDetails/contact.png" alt='logo' width={19} height={19} />
    <Link href="/" className='font-[700] text-sm text-[#0235FF]'>Contact Seller</Link>
</div>
        </div>
        <p className='text-sm font-[400] text-[#6B6F93]'>
Made by new technic corduroy, sturdier than normal fabric. Super soft and lightweight. Water resistance and reinforced bottom. Not only the durability of the product, but also maintains its lightness.
</p>
<div className='flex justify-between items-center'>
    <div className='flex gap-2 items-center'>
        <h1 className='text-sm text-[#160041] font-[400]'>Auction Ends In:</h1>
        <Countdown targetDate="2024-10-10T15:30:00Z" />
    </div>
    <div className='flex gap-2 items-center'>
        <Image src="/images/itemDetails/shipping.png" alt="logo" width={19} height={19}/>
    <p className='text-sm font-[400] text-[#6B6F93]'>Global Shipping</p>

    </div>
</div>
    </div>
  )
}
