// components/FloatingNavbar.tsx
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out bg-white shadow-md py-2 px-6 ${
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

        {/* Nav Links for Medium and Small Screens */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-black hover:text-blue-500">
            Buy $CSHOP
          </a>
          <a href="#" className="text-black hover:text-blue-500">
            Staking
          </a>
          <a href="#" className="text-black hover:text-blue-500">
            Product
          </a>
          <a href="#" className="text-black hover:text-blue-500">
            CSHOP Card
          </a>
          <a href="#" className="text-black hover:text-blue-500">
            Whitepaper
          </a>
        </div>

        {/* Connect Wallet Button */}
        <button className="border-[#2546fe] text-[#2546fe] border-2 py-2 px-4 rounded hover:text-[#253384]">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
