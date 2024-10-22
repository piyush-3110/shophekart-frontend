"use client";
import React, { useState } from 'react';
import { ProposalModal } from './ProposalModal'; // Import your modal component

export const ActiveProposal = () => {
  // Proposals array
  const proposals = [
    "Proposal to reduce transaction fees for DAO members. Proposal to reduce transaction fees for DAO membersProposal to reduce transaction fees for DAO members",
    "Proposal to integrate a new governance token system.",
    "Proposal to launch a community rewards program.",
    "Proposal to improve voting transparency.",
    "Proposal to implement a decentralized identity solution."
  ];

  // State for modal control
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProposal, setCurrentProposal] = useState<string>(''); // To store the current proposal text

  // Handlers to open/close modal
  const openModal = (proposal: string) => {
    setCurrentProposal(proposal); // Set the clicked proposal text
    setModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
  };

  return (
    <div className="text-white pt-6 space-y-6">
      {proposals.map((proposal, index) => (
        <div
          key={index}
          className="flex justify-between border border-neutral-800 items-center py-2 px-4 rounded-lg cursor-pointer" // Add cursor-pointer to indicate it's clickable
          onClick={() => openModal(proposal)} // Open modal with current proposal when the div is clicked
        >
          {/* Left side: Proposal text */}
          <p className="max-w-md truncate">{proposal}</p>

          {/* Right side: Approve and Reject buttons */}
          <div className='flex items-center'>
            <button
              className="text-green-500 hidden md:block px-4 py-2 mr-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the div click from firing when clicking this button
                openModal(proposal); // Optional: If you want to open the modal for button clicks too
              }}
            >
              Approve
            </button>
            <button
              className="text-red-500 hidden md:block px-4 py-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the div click from firing when clicking this button
                openModal(proposal); // Optional: If you want to open the modal for button clicks too
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {/* Modal Component */}
      <ProposalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        proposalText={currentProposal} // Pass the current proposal text
        showApproveButton={true} // Show the Approve button
        showRejectButton={true}  // Show the Reject button
      />
    </div>
  );
};
