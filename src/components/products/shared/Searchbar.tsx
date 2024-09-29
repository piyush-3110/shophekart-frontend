// src/components/products/shared/Searchbar.tsx (1-44)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";
import { IoMenu } from "react-icons/io5";

const DROPDOWN_CATEGORIES: { label: string }[] = [
  { label: "Category" },
  { label: "Category" },
  { label: "Category" },
  { label: "Category" },
];

const Searchbar = () => {
  return (
    <div className="flex items-center relative h-12 w-full max-w-lg md:max-w-4xl">
      <div className="flex-1 h-full">
        <Input
          placeholder="Search products"
          className="py-4 pl-12 rounded-r-none rounded-l size-full peer"
        />
        <Image
          width={18}
          height={18}
          src={"/icons/productNavbar/searchIcon.svg"}
          alt="search icon"
          className="absolute top-1/2 -translate-y-1/2 left-4"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="py-4 h-full px-3 lg:px-6 flex items-center gap-2 rounded-r bg-primary-gradient">
          <IoMenu className="text-2xl hidden x" />
          <span className="min-w-fit">All categories</span>
          <ChevronDownIcon className="text-2xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {DROPDOWN_CATEGORIES.map(({ label }, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span>{label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Searchbar;
