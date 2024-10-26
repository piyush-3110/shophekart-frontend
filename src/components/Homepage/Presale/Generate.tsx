"use client";
import React, { useState } from 'react';
import { GenerateModal } from './GenerateModal';

const Generate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Generate Button */}
      <button
        className="gradient-button"
        onClick={openModal}
      >
        Generate
      </button>

      {/* SimpleModal component */}
      <GenerateModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Generate;
