import Image from 'next/image';
import React from 'react';
import { FaTelegramPlane, FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const FooterInfo: React.FC = () => {
  return (
    <div className="flex flex-col   items-start gap-8">

      <div className="text-center sm:text-left">
        <Image src="/images/shared/footerLogo.png" alt="Crypto Shophe" width={150} height={150} className="mb-4" />
      </div>

      <div className='flex flex-wrap gap-8'>
      <div>
      <p>+1 891 989-11-91</p>
      <p>info@cryptoshophe.com</p>
      </div>
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <a href="#" className="text-gray-400 hover:text-white">
          <FaTelegramPlane className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaWhatsapp className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaFacebookF className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaInstagram className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-400  hover:text-white">
          <FaTwitter className="w-6 h-6" />
        </a>
      </div>
      </div>

      <div className='mb-5'>
        <button className='px-3 py-2 border-2'>GET STARTED</button>
      </div>

    </div>
  );
};

export default FooterInfo;
