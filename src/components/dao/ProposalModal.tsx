"use client";
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5'; // Close icon (install react-icons if not installed)

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalText: string;  // Text for the proposal
  showApproveButton: boolean; // Control visibility of the Approve button
  showRejectButton: boolean; 
  voteInFavor:number;
  voteAgainst:number; // Control visibility of the Reject button
}

export const ProposalModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  proposalText,
  showApproveButton,
  showRejectButton,
  voteInFavor,
  voteAgainst
}) => {
  // Close the modal when clicking outside of it
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = 'hidden'; // Prevent horizontal overflow
      document.body.style.overflowY = 'hidden';   // Allow vertical scrolling
    } else {
      document.body.style.overflowX = 'hidden';   // Restore horizontal scrolling
      document.body.style.overflowY = 'auto';   // Restore vertical scrolling
    }
    return () => {
      document.body.style.overflowX = 'hidden';   // Clean up to restore horizontal scrolling
      document.body.style.overflowY = 'auto';    // Clean up to restore vertical scrolling
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative max-w-[90vw] h-fit bg-white shadow-lg rounded-lg p-8">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto flex flex-col py-4 h-full">
          {/* Proposal Text */}
          <h1 className="text-[#160041] font-[700] text-center text-xl mb-4">Proposal</h1>
          <p className="text-black  mb-6">{proposalText}</p>
<div className='mb-3 flex items-center gap-10'>
  <p className="text-green-500 font-semibold hover:underline">Vote in favor: <span>{voteInFavor}%</span></p>
  <p className="text-red-500 font-semibold hover:underline">Vote Against: <span>{voteAgainst}%</span></p>
</div>
          {/* Approve and Reject buttons (conditionally rendered) */}
          <div className="flex  gap-6">
            {showApproveButton && (
              <button className="gradient-button !py-2 !px-6">
                Approve
              </button>
            )}
            {showRejectButton && (
              <button className="gradient-border !rounded-sm text-[#3f9bf7f8] font-[500] py-2 px-6  hover:text-[#4483e9]">
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
