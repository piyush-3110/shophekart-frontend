"use client";
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

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
            className="px-8 md:px-12 py-8 min-h-[100vh] bg-[url('/images/tokenization/bg.png')] bg-cover bg-center flex gap-6"
        >
            
            <div ref={animationContainer} className="w-[10rem]"></div>
        </div>
    );
};
