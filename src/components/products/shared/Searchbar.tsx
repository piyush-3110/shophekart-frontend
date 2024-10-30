"use client";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store";
import Image from "next/image";
import { useState, KeyboardEvent } from "react";

const Searchbar = () => {
  const setSearchTerm = useUserStore((state) => state.setSearchTerm);
  const [localSearch, setLocalSearch] = useState<string>("");

  const handleSearch = () => {
    if (localSearch.trim()) {
      setSearchTerm(localSearch);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center relative h-12 w-full max-w-lg md:max-w-4xl">
      <Input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={handleKeyDown} 
        placeholder="Search products"
        className="py-4 pl-12 rounded-r-none rounded-l size-full peer"
      />
      <Image
        width={18}
        height={18}
        src={"/icons/productNavbar/searchIcon.svg"}
        alt="search icon"
        className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer"
        onClick={handleSearch}
      />

      <button
        onClick={handleSearch}
        className="hidden gradient-button text-white md:inline"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
