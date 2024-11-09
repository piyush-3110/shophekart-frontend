"use client";
import React, { useState } from "react";
import { ProposalModal } from "./ProposalModal"; // Import your modal component

export const CompletedProposal = () => {
  // Proposals array
  const proposals = [""];

  // State for modal control
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProposal, setCurrentProposal] = useState<string>(""); // To store the current proposal text

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
          className="flex justify-between border border-neutral-800 items-center py-4 px-4 rounded-lg cursor-pointer" // Add cursor-pointer to indicate it's clickable
          onClick={() => openModal(proposal)} // Open modal with current proposal when the div is clicked
        >
          {/* Left side: Proposal text */}
          <p className="max-w-md truncate">{proposal}</p>

          {/* Right side: Approve and Reject buttons */}
          <p className="text-green-600">Completed</p>
        </div>
      ))}

      {/* Modal Component */}
      <ProposalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        proposalText={currentProposal} // Pass the current proposal text
        showApproveButton={false} // Show the Approve button
        showRejectButton={false}
        voteInFavor={0} // Show the Reject button
        voteAgainst={0}
      />
    </div>
  );
};
