import React from 'react';

interface WorksCardProps {
  heading: string;
  content: string;
}

const WorksCard: React.FC<WorksCardProps> = ({ heading, content }) => {
  return (
    <div className="relative text-white w-[30vw] h-fit py-6 px-7 card-border-gradient">
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-md font-[700] mb-4">{heading}</h2>
        <p className="text-sm text-[#6B6F93]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default WorksCard;
