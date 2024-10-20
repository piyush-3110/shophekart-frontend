"use client"
import React, { useState } from 'react';
import ModalContent from './ModalContent';
import ModalButton from './ModalButton';

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <ModalButton openModal={openModal} />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
            <ModalContent closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
