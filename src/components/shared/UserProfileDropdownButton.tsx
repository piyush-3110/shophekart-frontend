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
  ShippingIcon,
  UserProfileIcon,
} from "@/icons";
import { useUserStore } from "@/store";

const DROPDOWN_MENU_ITEMS: {
  label: string;
  icon: React.ReactNode;
  link?: string;
}[] = [
  {
    label: "Profile",
    icon: <UserProfileIcon />,
    link: "/profile",
  },
  { label: "Chat", icon: <ChatIcon /> },
  { label: "Support & helps", icon: <HelpIcon /> },
  { label: "Purchase history", icon: <HistoryIcon /> },
  {
    label: "Shipping details",
    icon: <ShippingIcon />,
    link: "/shipping-details",
  },
];

const UserProfileDropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, authStatus } = useUserStore();

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
              {DROPDOWN_MENU_ITEMS.map(({ label, icon, link }, index) => {
                if (link) {
                  return (
                    <Link href={link} key={index}>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        {icon}
                        <span>{label}</span>
                      </DropdownMenuItem>
                    </Link>
                  );
                }
                return (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {icon}
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
