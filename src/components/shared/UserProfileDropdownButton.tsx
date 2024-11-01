"use client";

import React, { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  ChatIcon,
  HelpIcon,
  HistoryIcon,
  UserProfileIcon,
} from "@/icons";
import { useUserStore } from "@/store";
import { PurchaseHistoryModal } from "../purchaseHistory/PurchaseHistoryModal";
const DROPDOWN_MENU_ITEMS: {
  label: string;
  icon: React.ReactNode;
  link?: string; // Keep link for navigation options
  action?: () => void; // For modal or other actions
}[] = [
  {
    label: "Profile",
    icon: <UserProfileIcon />,
    link: "/profile",
  },
  { label: "Chat", icon: <ChatIcon />, link: "/chat" },
  { label: "Support & helps", icon: <HelpIcon />, link: "/support" },
  {
    label: "Purchase history",
    icon: <HistoryIcon />,
    action: () => {}, // Placeholder for modal action
  },
];

const UserProfileDropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  const { user, authStatus } = useUserStore();

  const handlePurchaseHistoryClick = () => {
    setIsModalOpen(true);
    setIsOpen(false); // Close dropdown when modal opens
  };

  return (
    <div className="flex items-center w-fit">
      <ConnectWalletButton />
      {authStatus === "authenticated" && user && (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/images/navbar/defaultUserAvatar.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <ChevronDownIcon
                className={`duration-300 ${isOpen && "rotate-180"}`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-translate-x-1/4 mt-4">
              {DROPDOWN_MENU_ITEMS.map(({ label, icon, link, action }, index) => {
                // Set the action for Purchase History
                if (label === "Purchase history") {
                  action = handlePurchaseHistoryClick;
                }

                return (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      if (action) {
                        action(); // Trigger action if defined
                      }
                      if (link) {
                        setIsOpen(false); // Close dropdown if link is clicked
                      }
                    }}
                  >
                    {icon}
                    {link ? (
                      <Link href={link}>
                        <span>{label}</span>
                      </Link>
                    ) : (
                      <span>{label}</span>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <PurchaseHistoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> {/* Render the modal */}
    </div>
  );
};

export default UserProfileDropdownButton;
