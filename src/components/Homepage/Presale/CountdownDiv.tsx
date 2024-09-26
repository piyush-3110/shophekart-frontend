import React from 'react';

interface CountdownDivProps {
  value: number;
  label: string;
}

export const CountdownDiv: React.FC<CountdownDivProps> = ({ value, label }) => {
  return (
    <>
      <div className="h-fit py-8 px-4 w-[6rem] gradient-border countdown-background">
        <h1 className="gradient-text !text-center !text-lg">{value}</h1>
        <h2 className="text-[#6B6F93] text-center">{label}</h2>
      </div>
    </>
  );
};
