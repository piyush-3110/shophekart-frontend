"use client";

import React, { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAccount } from "wagmi";
import { config } from "@/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const DROPDOWN_MENU_ITEMS: { label: string; icon: string }[] = [
  { label: "Profile", icon: "/icons/profileDropdown/userProfileIcon.svg" },
  { label: "Chat", icon: "/icons/profileDropdown/chatIcon.svg" },
  { label: "Support & helps", icon: "/icons/profileDropdown/helpIcon.svg" },
  { label: "Purchase history", icon: "/icons/profileDropdown/historyIcon.svg" },
  {
    label: "Shipping details",
    icon: "/icons/profileDropdown/shippingIcon.svg",
  },
  { label: "Logout", icon: "/icons/profileDropdown/logoutIcon.svg" },
];

const UserProfileDropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount({ config });
  return (
    <div className="flex items-center w-fit">
      <ConnectWalletButton />
      {isConnected && (
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
              {DROPDOWN_MENU_ITEMS.map(({ label, icon }, index) => {
                return (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Image
                      src={icon}
                      alt={label + " icon"}
                      width={18}
                      height={18}
                    />
                    <span>{label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdownButton;
