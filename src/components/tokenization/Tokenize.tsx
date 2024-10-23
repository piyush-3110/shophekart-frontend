"use client";
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { CardSpotlightDemo } from './CardSpotlightDemo';

export const Tokenize = () => {
    const animationContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the animation
        const animationInstance = lottie.loadAnimation({
            container: animationContainer.current as Element, 
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/animation.json',
        });

        // Cleanup the animation on component unmount
        return () => {
            animationInstance.destroy(); // Destroys the animation instance
        };
    }, []);

    return (
        <div 
            className="px-8 md:px-12 py-8 min-h-[100vh] bg-[#000] bg-cover bg-center "
        >
            <p className="text-2xl font-bold mb-6 text-center text-white">
        What will we tokenize?
      </p>
            <div className='flex flex-col lg:flex-row gap-6 lg:items-center '>

        
            <div ref={animationContainer} className="w-[90vw] lg:h-[80vh] lg:w-[40vw] "></div>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:w-[50vw]'>
            <CardSpotlightDemo 
  heading="Luxury Cars" 
  description="Tokenize classic and high-end vehicles, enabling owners to sell either the entire car or fractional shares. This will make rare and vintage automobiles more accessible to a broader range of investors and collectors.
" 
/>
<CardSpotlightDemo 
  heading="Watches" 
  description="High-value timepieces will be tokenized to verify authenticity and secure ownership. Through NFTs, collectors can trade fractions of luxury watches, bringing greater flexibility to the market for prestigious watches.
" 
/>
<CardSpotlightDemo 
  heading="Fine Art" 
  description="Tokenize valuable artworks with digital certificates of authenticity through NFTs. Art enthusiasts will be able to invest in shares of fine art, creating a new frontier for fractional art ownership.
" 
/>
<CardSpotlightDemo 
  heading="Tokenized Collectibles" 
  description="Rare items like limited-edition sneakers, designer fashion, and unique collectibles will also be available for tokenization, allowing a vibrant marketplace for these in-demand products." 
/>



            </div>
            </div>
        </div>
    );
};
