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
import Link from "next/link";
import {
  ChatIcon,
  HelpIcon,
  HistoryIcon,
  LogoutIcon,
  ShippingIcon,
  UserProfileIcon,
} from "@/icons";
import { useMutation } from "@tanstack/react-query";
import { SiweService } from "@/services";
import { toast } from "@/hooks/use-toast";
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
  // { label: "Logout", icon: <LogoutIcon /> },
];

const UserProfileDropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount({ config });

  const { user, setUser } = useUserStore();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await SiweService.logout();
      setUser(response.data);
      return response;
    },
    onError() {
      toast({
        title: "There was some problem while logging out",
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: "Logged out successfully",
      });
    },
  });

  return (
    <div className="flex items-center w-fit">
      <ConnectWalletButton />
      {isConnected && (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/images/navbar/defaultUserAvatar.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {user && (
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
                {/* <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <LogoutIcon />
                  <button
                    onClick={() => {
                      mutateAsync();
                    }}
                  >
                    Logout
                  </button>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdownButton;
