"use client";

import Button, { ButtonVariant } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

const PRODUCTS_NAV_TABS: { label: string; link: string }[] = [
  { label: "Auction", link: "/products/auction" },
  { label: "Buy now", link: "/products/buy-now" },
];

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState(PRODUCTS_NAV_TABS[0].label);

  return (
    <div className="bg-[#F1F4FF] w-full">
      <div className="px-4 lg:px-32 flex gap-2">
        {PRODUCTS_NAV_TABS.map(({ label, link }, index) => {
          const isActive = activeTab === label;
          return (
            <Link key={index} href={link}>
              <Button
                className="relative"
                onClick={() => setActiveTab(label)}
                variant={
                  isActive ? ButtonVariant.TRANSPARENT : ButtonVariant.SECONDARY
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
    </div>
  );
};

export default NavigationTabs;