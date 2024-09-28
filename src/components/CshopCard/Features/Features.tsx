'use client'
import React from 'react';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  return (
    <div className="py-4 px-2 md:px-8 lg:px-16 bg-black min-h-[100vh]">
      <h1 className="text-white font-semibold py-8 md:text-3xl text-lg text-center">
        Key Features
      </h1>

      {/* Custom grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-[90%] mx-auto custom-grid-border">
        <div id='card1' className="card"><FeatureCard /></div>
        <div id='card2' className="card"><FeatureCard /></div>
        <div id='card3' className="card"><FeatureCard /></div>
        <div id='card4' className="card"><FeatureCard /></div>
        <div id='card5' className="card"><FeatureCard /></div>
        <div id='card6' className="card"><FeatureCard /></div>
        <div id='card7' className="card"><FeatureCard /></div>
        <div id='card8' className="card"><FeatureCard /></div>
      </div>

      {/* Embedded styles for borders and gradients */}
      <style jsx>{`
        .custom-grid-border {
          border: 1px solid transparent;
          border-image-slice: 1;
        }

        .card {
          border-bottom: 1px solid #6b7280;
          border-right: 1px solid #6b7280;
        }
 @media (min-width: 768px) {
          .card:nth-child(4n) {
            border-right: 0;
          }
          .card:nth-last-child(-n + 4) {
            border-bottom: 0;
          }
          .card:nth-child(-n + 4) {
            border-top: 0;
          }
        }

        /* Medium screens (md) */
        @media (max-width: 768px) {
          .card {
            border-bottom: 1px solid #6b7280;
            border-right: 1px solid #6b7280;
            border-top: 1px solid #6b7280;
            border-left: 1px solid #6b7280;
          }

          /* Remove left border for cards 1, 4, and 7 */
          #card1,
          #card4,
          #card7 {
            border-left: 0;
          }

          /* Remove bottom border for cards 7 and 8 */
         

          .card:nth-child(3n) {
            border-right: 0;
          }
          .card:nth-last-child(-n + 3) {
            border-bottom: 0;
          }
          .card:nth-child(-n + 3) {
            border-top: 0;
          }
             #card7,
          #card8 {
            border-bottom: 0;
            border-right:1px solid #6b7280;
          }
        }

        /* Small screens (sm) */
        @media (max-width: 640px) {
         .card{
         border:0;
         }
              #card7,
          #card8 {
            border-bottom: 0;
            border-right:0;
          }
        }

        /* Large screens */
       
        /* Gradient border */
        .card-border-gradient {
          border: 1px solid transparent;
          background: linear-gradient(#101317, #101317) padding-box,
            linear-gradient(
              117.79deg,
              rgba(2, 171, 255, 0.8) -3.21%,
              rgba(255, 255, 255, 0) 30.3%,
              rgba(255, 255, 255, 0) 57.52%,
              rgba(2, 47, 208, 0.8) 101.5%
            ) border-box;
        }
      `}</style>
    </div>
  );
};
