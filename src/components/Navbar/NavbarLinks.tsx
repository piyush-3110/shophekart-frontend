import { useState, useEffect, useRef } from "react";
import NavLink from "./NavLink";
import { FaChevronDown } from "react-icons/fa"; // Icons for toggling

const NavbarLinks = () => {
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isStakingOpen, setIsStakingOpen] = useState(false);
  const platformRef = useRef<HTMLDivElement>(null);
  const stakingRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        platformRef.current &&
        !platformRef.current.contains(event.target as Node)
      ) {
        setIsPlatformOpen(false);
      }

      if (
        stakingRef.current &&
        !stakingRef.current.contains(event.target as Node)
      ) {
        setIsStakingOpen(false);
      }
    };

    if (isPlatformOpen || isStakingOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPlatformOpen, isStakingOpen]);

  return (
    <div className="flex space-x-8  items-center justify-center">
      <NavLink href="https://www.shophekart.com/">Buy $CSHOP</NavLink>

      {/* Staking Dropdown */}
      <div ref={stakingRef} className="relative">
        <button
          className="flex items-center focus:outline-none"
          onClick={() => setIsStakingOpen(!isStakingOpen)}
        >
          Token Side
          <span
            className={`ml-2 transition-transform duration-300 ease-in-out ${
              isStakingOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </button>

        {/* Dropdown Menu for Staking */}
        <div
          className={`absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform ${
            isStakingOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <NavLink
            href="https://product.shophekart.com/staking"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            Staking
          </NavLink>
          {/* <NavLink
            href="/staking"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            Vesting
          </NavLink> */}
          <NavLink
            href="https://product.shophekart.com/dao"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            DAO
          </NavLink>
        </div>
      </div>

      {/* Platform Dropdown */}
      <div ref={platformRef} className="relative">
        <button
          className="flex items-center focus:outline-none"
          onClick={() => setIsPlatformOpen(!isPlatformOpen)}
        >
          Platform
          <span
            className={`ml-2 transition-transform duration-300 ease-in-out ${
              isPlatformOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </span>
        </button>

        {/* Dropdown Menu for Platform */}
        <div
          className={`absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform ${
            isPlatformOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <NavLink
            href="https://product.shophekart.com/products/buy-now"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            Crypto Shop
          </NavLink>
          <NavLink
            href="https://product.shophekart.com/tokenization"
            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            Tokenization
          </NavLink>
        </div>
      </div>

      <NavLink href="https://product.shophekart.com/cshopCard">
        CSHOP Card
      </NavLink>
      <NavLink target="_blank" href="https://shophekart.gitbook.io/shophekart">
        Whitepaper
      </NavLink>
    </div>
  );
};

export default NavbarLinks;
