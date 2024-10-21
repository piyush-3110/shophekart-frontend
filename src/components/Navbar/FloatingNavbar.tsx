// components/FloatingNavbar.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaAnchor,
  FaProductHunt,
  FaFileAlt,
  FaBookOpen,
} from "react-icons/fa";

import NavbarLinks from "./NavbarLinks";
import Link from "next/link";
import UserProfileDropdownButton from "../shared/UserProfileDropdownButton";

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll to determine the direction
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // If scrolling down, hide the navbar
      setIsVisible(false);
    } else {
      // If scrolling up, show the navbar
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`sticky lg:flex lg:items-center lg:justify-around top-0 z-[4] left-0 transition-transform duration-300 ease-in-out bg-white py-2 px-6 ${
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
          <UserProfileDropdownButton />
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
            <Link
              href="/"
              className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
            >
              <FaShoppingCart />
              <span>Buy $CSHOP</span>
            </Link>
            <Link
              href="/staking"
              className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
            >
              <FaAnchor />
              <span>Staking</span>
            </Link>
            <Link
              href="/products/buy-now"
              className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
            >
              <FaProductHunt />
              <span>Product</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
            >
              <FaFileAlt />
              <span>CSHOP Card</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
            >
              <FaBookOpen />
              <span>Whitepaper</span>
            </Link>
            {/* Connect Wallet button inside the dropdown */}
            <UserProfileDropdownButton />
          </>
        )}
      </div>
    </nav>
  );
}
