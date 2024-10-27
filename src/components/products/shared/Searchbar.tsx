"use client";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store"; // Import Zustand store
import Image from "next/image";
import { useState } from "react";

const Searchbar = () => {
  const setSearchTerm = useUserStore((state) => state.setSearchTerm); // Set search term in Zustand store
  const [localSearch, setLocalSearch] = useState(""); // Local state for input value

  // Handle search button click
  const handleSearch = () => {
    setSearchTerm(localSearch); // Set the search term only when the search button is clicked
  };

  return (
    <div className="flex items-center relative h-12 w-full max-w-lg md:max-w-4xl">
      <Input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)} // Update local state with input value
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
      <button
        onClick={handleSearch} // Trigger search when the button is clicked
        className="gradient-button text-white"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
