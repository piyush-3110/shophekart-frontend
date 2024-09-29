import React, { useState, useRef, useEffect } from "react";

const BidSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <h1 className="text-[#160041] font-[700] text-xl">120 CSHOP</h1>
      <div className="w-[1px] bg-[#6B6F93] h-4"></div>
      <div className="flex gap-2 items-center">
        <div ref={dropdownRef} className="relative">
          <button
            className="font-[500] text-[12px] underline text-[#0235FF]"
            onClick={toggleDropdown}
          >
            Bid History
          </button>

          {isDropdownOpen && (
            <div className="absolute text-[12px] w-fit bg-white border border-gray-200 shadow-lg rounded-md mt-2 p-4 z-10">
              <ul className="min-w-[7rem]">
                <li className="px-4 py-2">110 CSHOP</li>
                <li className="px-4 py-2">115 CSHOP</li>
                <li className="px-4 py-2">120 CSHOP</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidSection;
