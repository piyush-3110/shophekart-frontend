"use client";
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5'; // Close icon (install react-icons if not installed)

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalText: string;  // Text for the proposal
  showApproveButton: boolean; // Control visibility of the Approve button
  showRejectButton: boolean;  // Control visibility of the Reject button
}

export const ProposalModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  proposalText,
  showApproveButton,
  showRejectButton
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Clean up when modal is closed
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] h-[60vh] bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto flex flex-col py-4 h-full">
          {/* Proposal Text */}
          <h1 className="text-[#160041] font-[700] text-center text-xl mb-4">Proposal</h1>
          <p className="text-black text-center mb-6">{proposalText}</p>

          {/* Approve and Reject buttons (conditionally rendered) */}
          <div className="flex justify-center gap-10">
            {showApproveButton && (
              <button className="text-green-500 font-semibold hover:underline">
                Approve
              </button>
            )}
            {showRejectButton && (
              <button className="text-red-500 font-semibold hover:underline">
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
