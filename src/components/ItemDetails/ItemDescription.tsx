"use client";
import React, { useState, useEffect, useRef } from 'react';
import Rating from './Rating';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from './CountDown';

export const ItemDescription = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>('S'); // State to track the selected size

  // Toggle dropdown open/close on click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size); // Update selected size when user clicks on a size
  };

  return (
    <div className='flex flex-col gap-3 w-[40vw]'>
      <div className='rounded-xl bg-[#022BFF] w-fit px-3 py-1 text-white text-sm'>Bags</div>
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
          <Image src="/images/itemDetails/shipping.png" alt="logo" width={19} height={19} />
          <p className='text-sm font-[400] text-[#6B6F93]'>Global Shipping</p>
        </div>
      </div>
      <p className='text-sm font-[400] mt-3 text-[#6B6F93]'>Current Bid</p>
      <div className='flex gap-2 items-center'>
        <h1 className='text-[#160041] font-[700] text-xl'>120 CSHOP</h1>
        <div className='w-[1px] bg-[#6B6F93] h-4'></div>
        <div className='flex gap-2 items-center'>
          <Image src="/images/itemDetails/bidding.png" alt='logo' height={12} width={12} />
          <div ref={dropdownRef} className="relative">
            <button 
              className='font-[500] text-[12px] underline text-[#0235FF]' 
              onClick={toggleDropdown}
            >
              Bid History
            </button>

            {/* Dropdown content */}
            {isDropdownOpen && (
              <div className="absolute text-[12px] w-fit bg-white border border-gray-200 shadow-lg rounded-md mt-2 p-4 z-10">
                <ul className='min-w-[7rem]'>
                  <li className='px-4 py-2 '>110 CSHOP</li>
                  <li className='px-4 py-2'>115 CSHOP</li>
                  <li className='px-4 py-2'>120 CSHOP</li>
                  {/* Add more bid history here */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex gap-8 items-start'>
        <div>
          <p className='text-sm font-[400] text-[#6B6F93]'>Size</p>
          <div className='flex gap-1 mt-2'>
            {/* Add bg-[#160041] when a size is selected */}
            <div 
              className={`text-center text-md font-[700] py-1 px-2 cursor-pointer ${selectedSize === 'S' ? 'bg-[#160041] text-white' : 'bg-[#F4F6FA] text-black'}`}
              onClick={() => handleSizeClick('S')}
            >
              S
            </div>
            <div 
              className={`text-center text-md font-[700] py-1 px-2 cursor-pointer ${selectedSize === 'M' ? 'bg-[#160041] text-white' : 'bg-[#F4F6FA] text-black'}`}
              onClick={() => handleSizeClick('M')}
            >
              M
            </div>
            <div 
              className={`text-center text-md font-[700] py-1 px-2 cursor-pointer ${selectedSize === 'L' ? 'bg-[#160041] text-white' : 'bg-[#F4F6FA] text-black'}`}
              onClick={() => handleSizeClick('L')}
            >
              L
            </div>


        </div>
        </div>
        <div>
        <p className='text-sm font-[400]  text-[#6B6F93]'>Colors</p>
        {/* {add colors like yellow , blue , green , red add the circle of the colors like standard website do and make the selected color outline turn blue by default yellow is selected  } */}
        </div>
      </div>
    </div>
  );
};
