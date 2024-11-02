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
import { toast } from "react-toastify"; // Import toast
import ToastNotification from "../Form/ToastNotification";

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
  { label: "Chat", icon: <ChatIcon /> }, // Link is still included for consistency
  {
    label: "Support & helps",
    icon: <HelpIcon />,
    action: () => window.open("mailto:support@shophekart.com"), // Mailto action
  },
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

  const handleChatClick = () => {
    toast.info("Feature Coming Soon!!", {
      position: "top-right", // Position of the toast
      autoClose: 3000, // Duration for which the toast will be visible
      hideProgressBar: true, // Option to hide the progress bar
      closeOnClick: true, // Option to close the toast on click
      pauseOnHover: true, // Option to pause on hover
      draggable: true, // Allow dragging of the toast
      progress: undefined, // No progress bar
    });
  };

  return (
    <div className="flex items-center w-fit">
      <ToastNotification/>
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
                // Set the action for Chat
                if (label === "Chat") {
                  action = handleChatClick;
                }

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
