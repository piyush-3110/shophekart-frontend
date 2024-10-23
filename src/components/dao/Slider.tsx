"use client";
import React from 'react';
import { CardSpotlightDemo } from '../tokenization/CardSpotlightDemo';
import { ProposalSlider } from './ProposalSlider';

export const Slider = () => {

    return (
        <div 
            className="px-2 md:px-8 md:px-12 py-8 lg:py-12 min-h-[100vh] bg-[#000] bg-cover bg-center "
        >
            <p className="text-2xl font-bold mb-9 text-center text-white">
       Proposal and Voting
      </p>
            

            <div className='grid grid-cols-1 gap-3 md:grid-cols-3 w-[90vw]'>
            <CardSpotlightDemo 
  heading="Total Proposals" 
  description="Track all proposals that are currently active, completed, or rejected within the DAO. This feature provides overview of the status of all proposals."
  value="30" 
/>
<CardSpotlightDemo 
  heading="Voting Power" 
  description="Your voting power is based on the number of governance tokens you hold. More tokens mean more influence in decision-making!" 
  value="4.5"
/>
<CardSpotlightDemo 
  heading="Your Proposal Count" 
  description="Track all proposals that have been submitted by you. This feature allows you to keep a comprehensive record of all the proposals you've submitted."
value="2"
/>
   </div>
           
            <ProposalSlider/>
        </div>
    );
};
