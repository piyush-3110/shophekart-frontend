import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useUserStore } from "@/store/userStore"; // Import Zustand store
import React from "react";

const Searchbar = () => {
  const setSearchTerm = useUserStore((state) => state.setSearchTerm);  // Get the setter from the store

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);  // Update the global search term
  };

  return (
    <div className="flex items-center relative h-12 w-full max-w-lg md:max-w-4xl">
      <div className="flex-1 h-full">
        <Input
          placeholder="Search products"
          className="py-4 pl-12 rounded-r-none rounded-l size-full peer"
          onChange={handleSearchInput}  // Update on input change
        />
        <Image
          width={18}
          height={18}
          src={"/icons/productNavbar/searchIcon.svg"}
          alt="search icon"
          className="absolute top-1/2 -translate-y-1/2 left-4"
        />
      </div>
    </div>
  );
};

export default Searchbar;
