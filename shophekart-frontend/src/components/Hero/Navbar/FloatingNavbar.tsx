// components/FloatingNavbar.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes, FaShoppingCart, FaAnchor, FaProductHunt, FaFileAlt, FaBookOpen } from "react-icons/fa"; // Importing relevant icons
import ConnectButton from "./ConnectButton";
import NavLink from "./NavLink";

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
      className={`fixed top-0 z-[4] left-0 right-0 transition-transform duration-300 ease-in-out bg-white shadow-md py-2 px-6 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="flex justify-between items-center">
        <div>
          <Image
            src="/images/shared/logo.png"
            alt="Logo"
            width={120}
            height={120}
          />
        </div>

        {/* Nav Links for Large Screens */}
        <div className="hidden lg:flex space-x-4">
                                 <NavLink href="#">

            Buy $CSHOP
          </NavLink>
                                 <NavLink href="#">

            Staking
          </NavLink>
                                 <NavLink href="#">

            Product
          </NavLink>
                                 <NavLink href="#">

            CSHOP Card
          </NavLink>
                                 <NavLink href="#">

            Whitepaper
          </NavLink>
          {/* Connect Wallet button */}
         <ConnectButton/>
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
            <NavLink href="#">
              <FaShoppingCart />
              <span>Buy $CSHOP</span>
            </NavLink>
            <NavLink href="#">
              <FaAnchor />
              <span>Staking</span>
            </NavLink>
            <NavLink href="#">

              <FaProductHunt />
              <span>Product</span>
            </NavLink>
                       <NavLink href="#">

              <FaFileAlt />
              <span>CSHOP Card</span>
            </NavLink>
                       <NavLink href="#">

              <FaBookOpen />
              <span>Whitepaper</span>
            </NavLink>
            {/* Connect Wallet button inside the dropdown */}
            <ConnectButton />
          </>
        )}
      </div>
    </nav>
  );
}
