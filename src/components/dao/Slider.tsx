"use client";
import React from 'react';
import { CardSpotlightDemo } from '../tokenization/CardSpotlightDemo';

export const Slider = () => {

    return (
        <div 
            className="px-8 md:px-12 py-8 min-h-[100vh] bg-[#000] bg-cover bg-center "
        >
            <p className="text-2xl font-bold mb-6 text-center text-white">
        What will we tokenize?
      </p>
            <div className='flex flex-col lg:flex-row gap-6 lg:items-center '>

            <div className='grid grid-cols-1 gap-3 md:grid-cols-3 w-[90vw]'>
            <CardSpotlightDemo 
  heading="Total Proposals" 
  description="Track all proposals that are currently active, completed, or rejected within the DAO. This feature provides a clear overview of the status of all proposals.
" 
/>
<CardSpotlightDemo 
  heading="Voting Power" 
  description="Your voting power is based on the number of governance tokens you hold. More tokens mean more influence in decision-making!" 
/>
<CardSpotlightDemo 
  heading="Your Proposal Count" 
  description="Track all proposals that have been submitted by you. This feature allows you to keep a comprehensive record of all the proposals you've submitted."

/>



            </div>
            </div>
        </div>
    );
};
