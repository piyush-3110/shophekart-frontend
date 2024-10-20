// components/Modal/ModalButton.tsx
import React from 'react';

interface ModalButtonProps {
  openModal: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({ openModal }) => {
  return (
    <button 
      type='button'
      onClick={openModal} 
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
      Open Modal
    </button>
  );
};

export default ModalButton;
