"use client";
import React, { useState, useEffect } from 'react';
import ActiveProposal from './ActiveProposal'; // Component for Active Proposals
import CompletedProposal from './CompletedProposal'; // Component for Completed Proposals
import RejectedProposal from './RejectedProposal'; // Component for Rejected Proposals

export const ProposalSlider = () => {
  const [activeTab, setActiveTab] = useState('activeProposal');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size to adjust underline width/position for small screens
  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768); // Consider "md" as the breakpoint (768px)
  };

  useEffect(() => {
    // Initial check on mount
    updateScreenSize();
    // Add event listener to handle screen resize
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'activeProposal':
        return <ActiveProposal />;
      case 'completedProposal':
        return <CompletedProposal />;
      case 'rejectedProposal':
        return <RejectedProposal />;
      default:
        return null;
    }
  };

  // Function to dynamically calculate the underline width and position
  const getUnderlineStyle = () => {
    let width, translateX;

    if (isSmallScreen) {
      // Adjust values for small screens (sm)
      switch (activeTab) {
        case 'activeProposal':
          width = '100px'; // Underline width for "Active Proposal"
          translateX = '0%'; // Position of "Active Proposal" underline
          break;
        case 'completedProposal':
          width = '100px'; // Underline width for "Completed Proposal"
          translateX = '120px'; // Adjust position for "Completed Proposal"
          break;
        case 'rejectedProposal':
          width = '100px'; // Underline width for "Rejected Proposal"
          translateX = '240px'; // Adjust position for "Rejected Proposal"
          break;
        default:
          width = '4rem';
          translateX = '0%';
      }
    } else {
      // Default values for medium and large screens (md, lg)
      switch (activeTab) {
        case 'activeProposal':
          width = '160px';
          translateX = '0%';
          break;
        case 'completedProposal':
          width = '160px';
          translateX = '200px';
          break;
        case 'rejectedProposal':
          width = '160px';
          translateX = '400px';
          break;
        default:
          width = '4rem';
          translateX = '0%';
      }
    }

    return {
      width,
      transform: `translateX(${translateX})`,
    };
  };

  return (
    <div className="relative w-full">
      {/* Slider with clickable tabs */}
      <div className="text-lg font-[700] px-6 pt-6 text-white flex gap-10 justify-center relative">
        {/* Tab for Active Proposal */}
        <p
          onClick={() => setActiveTab('activeProposal')}
          className={`cursor-pointer relative ${activeTab === 'activeProposal' ? 'gradient-text !text-lg' : ''}`}
        >
          Active Proposal
        </p>
        {/* Tab for Completed Proposal */}
        <p
          onClick={() => setActiveTab('completedProposal')}
          className={`cursor-pointer relative ${activeTab === 'completedProposal' ? 'gradient-text !text-lg' : ''}`}
        >
          Completed Proposal
        </p>
        {/* Tab for Rejected Proposal */}
        <p
          onClick={() => setActiveTab('rejectedProposal')}
          className={`cursor-pointer relative ${activeTab === 'rejectedProposal' ? 'gradient-text !text-lg' : ''}`}
        >
          Rejected Proposal
        </p>

        {/* Underline effect */}
        <div
          className="absolute bottom-0 h-[2px] transition-all duration-300"
          style={{
            ...getUnderlineStyle(), // Apply the dynamic underline width and position
            background: 'linear-gradient(91.75deg, #01F6FF -12.59%, #017EFF 19.66%, #0127FF 68.04%)',
          }}
        />
      </div>

      {/* Render the content based on the selected tab */}
      <div className="px-6 pt-6">
        {renderContent()}
      </div>
    </div>
  );
};
