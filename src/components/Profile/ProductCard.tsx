import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
            // To pass the product id for redirection
  imageUrl: string;     // Image URL for the product
  category: string;     // Category of the product
  status: string;       // Status (e.g., "Sold", "Available", etc.)
  title: string;        // Product title
  description: string;  // Product description
}

export const ProductCard: React.FC<ProductCardProps> = ({

  imageUrl,
  category,
  status,
  title,
  description,
}) => {
  // Function to truncate the description to 9 words
  const truncateDescription = (desc: string) => {
    const words = desc.split(' ');
    if (words.length > 9) {
      return words.slice(0, 9).join(' ') + '...';
    }
    return desc;
  };

  return (
    <Link href={`/itemDetails`} className='block'>
      <div className='flex gap-2 items-center cursor-pointer hover:shadow-lg transition-shadow duration-300'>
        {/* Image Section */}
        <div className='h-[10rem] bg-[#F4F6FA] rounded-md w-[8rem]'>
          <Image
            src={imageUrl}
            alt={title}
            height={500}
            width={500}
            className='h-[90%] object-contain'
          />
        </div>

        {/* Details Section */}
        <div className='gap-2 flex flex-col w-[16rem]'>
          {/* Category and Status */}
          <div className='flex gap-2 items-center'>
            <div className='rounded-xl bg-[#022BFF] w-fit px-3 py-1 text-white text-sm'>
              {category}
            </div>
            <div className='rounded-full h-2 ml-2 w-2 bg-red-600'></div>
            <p className='text-sm font-[400] text-[#6B6F93]'>{status}</p>
          </div>

          {/* Product Title */}
          <h1 className='text-[#160041] font-[700] text-[16px]'>{title}</h1>

          {/* Truncated Description */}
          <p className='text-sm font-[400] text-[#6B6F93]'>
            {truncateDescription(description)}
          </p>
        </div>
      </div>
    </Link>
  );
};
