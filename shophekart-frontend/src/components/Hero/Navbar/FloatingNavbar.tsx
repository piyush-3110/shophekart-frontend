// components/FloatingNavbar.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes, FaShoppingCart, FaAnchor, FaProductHunt, FaFileAlt, FaBookOpen } from "react-icons/fa"; // Importing relevant icons
import ConnectButton from "./ConnectButton";

import NavbarLinks from "./NavbarLinks";

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll to determine the direction
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // If scrolling down, hide the navbar
      setIsVisible(false);
    } else {
      // If scrolling up, show the navbar
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed md:flex md:items-center md:justify-around   top-0 z-[4] left-0 right-0 transition-transform duration-300 ease-in-out bg-white shadow-md py-2 px-6 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="flex justify-between items-center space-x-36">
        <div>
          <Image
            src="/images/shared/logo.png"
            alt="Logo"
            className="h-[4rem]  "
            width={160}
            height={160}
          />
        </div>

        {/* Nav Links for Large Screens */}
        <div className="hidden lg:flex space-x-28">
        <NavbarLinks />

{/* Connect Wallet Button */}
<ConnectButton />
        </div>


        {/* Hamburger/Close Icon for Small and Medium Screens */}
        <div className="lg:hidden z-50">
          {menuOpen ? (
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="text-2xl text-black cursor-pointer"
            />
          ) : (
            <FaBars
              onClick={() => setMenuOpen(true)}
              className="text-2xl text-black cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      <div
        className={`absolute top-0 h-[100vh] right-0 w-full bg-white shadow-lg flex flex-col py-14 px-4 space-y-6 z-10 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100 transform translate-x-0"
            : "max-h-screen opacity-0 transform translate-x-full"
        }`}
      >
        {menuOpen && (
          <>
            <a href="#" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaShoppingCart />
              <span>Buy $CSHOP</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaAnchor />
              <span>Staking</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaProductHunt />
              <span>Product</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaFileAlt />
              <span>CSHOP Card</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaBookOpen />
              <span>Whitepaper</span>
            </a>
            {/* Connect Wallet button inside the dropdown */}
            <ConnectButton />
          </>
        )}
      </div>
    </nav>
  );
}
