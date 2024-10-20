import React from 'react';
import { LiaTelegram, LiaWhatsapp, LiaFacebook, LiaInstagram, LiaLinkedinIn } from "react-icons/lia";

export const Footer = () => {
  return (
    <div className='px-6 bg-[#151718] text-white py-16 md:px-16'>
      <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-8 lg:gap-0 lg:justify-between '>
        {/* First Column */}
        <div className='flex flex-col gap-2'>
          <div className=''>
            <img src='/images/shared/footerlogo.png' alt='LOGO' className='h-[3rem] w-auto  -translate-x-4'></img>
          </div>
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

        {/* Social Media Icons Column */}
        
        <div className='flex gap-3 items-center h-full '>
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className='hover:text-blue-500 bg-[#27272A] py-2 px-2 rounded-full'>
            <LiaTelegram size={24} />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className='hover:text-green-500 bg-[#27272A] py-2 px-2 rounded-full'>
            <LiaWhatsapp size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-700 bg-[#27272A] py-2 px-2 rounded-full'>
            <LiaFacebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='hover:text-pink-500 bg-[#27272A] py-2 px-2 rounded-full'>
            <LiaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='hover:text-blue-600 bg-[#27272A] py-2 px-2 rounded-full'>
            <LiaLinkedinIn size={24} />
          </a>
        </div>
<div className='flex flex-row justify-between'>


        {/* Home Section Column */}
        <div className='flex flex-col lg:ml-8 font-[400] gap-2'>
          <h4 className='text-[12px] mb-2 font-[300]'>Home</h4>
          <p className='text-[14px] font-[400]'>Presale</p>
          <p className='text-[14px] font-[400]'>Tokenomics</p>
          <p className='text-[14px] font-[400]'>Roadmap</p>
          <p className='text-[14px] font-[400]'>Partnerships</p>
          <p className='text-[14px] font-[400]'>Payment Card</p>
        </div>

        {/* Useful Information Section Column */}
        <div className='flex flex-col ml-8  gap-2'>
          <h4 className='text-[12px] mb-2 font-[300]'>Useful Information</h4>
          <p className='text-[14px] font-[400]'>Whitepaper</p>
          <p className='text-[14px] font-[400]'>Privacy Policy</p>
          <p className='text-[14px] font-[400]'>Terms and Conditions</p>
        </div>
        </div>
      </div>
    </div>
  );
};
