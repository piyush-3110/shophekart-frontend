"use client"
import { PurchaseHistoryModal } from '@/components/purchaseHistory/PurchaseHistoryModal';
import React, { useState } from 'react';

export const PurchaseHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    return (
      <div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={openModal}
        >
          View Purchase History
        </button>
  
        <PurchaseHistoryModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
  };