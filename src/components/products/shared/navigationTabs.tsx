"use client";

import Button, { ButtonVariant } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { PurchaseHistoryModal } from "@/components/purchaseHistory/PurchaseHistoryModal"; // Import the modal

const PRODUCTS_NAV_TABS: { label: string; link: string }[] = [
  { label: "Buy now", link: "/products/buy-now" },
];

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState(PRODUCTS_NAV_TABS[0].label);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#F1F4FF] w-full">
      <div className="px-4 lg:px-32 flex gap-2 justify-between items-center">
        <div className="flex gap-2">
          {PRODUCTS_NAV_TABS.map(({ label, link }, index) => {
            const isActive = activeTab === label;
            return (
              <Link key={index} href={link}>
                <Button
                  className="relative"
                  onClick={() => setActiveTab(label)}
                  variant={
                    isActive
                      ? ButtonVariant.TRANSPARENT
                      : ButtonVariant.SECONDARY
                  }
                >
                  {isActive && (
                    <motion.div
                      transition={{ duration: 0.3 }}
                      layoutId="tab-bg"
                      className={cn("absolute bg-primary-gradient inset-0")}
                    />
                  )}
                  <span className="relative z-[2]">{label}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Order History Button */}
        <Button
          className="relative gradient-button"
          onClick={openModal}>
          Order History
        </Button>
      </div>

      {/* Purchase History Modal */}
      <PurchaseHistoryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default NavigationTabs;
