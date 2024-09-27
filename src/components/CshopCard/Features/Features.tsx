import React from 'react';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  return (
    <div className="py-4 px-2 md:px-8 lg:px-16 bg-black min-h-[100vh]">
      <h1 className="text-white font-semibold py-8 md:text-3xl text-lg text-center">
        Key Features
      </h1>
      <div className="custom-grid-border">
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
        <div className="card"><FeatureCard /></div>
      </div>
    </div>
  );
};
