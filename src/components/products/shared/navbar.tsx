"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images/shared/logo.png";
import { FaBars, FaTimes, FaAnchor, FaProductHunt, FaFileAlt, FaBookOpen, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import NavbarLinks from "../../Navbar/NavbarLinks";
import UserProfileDropdownButton from "@/components/shared/UserProfileDropdownButton";
import Searchbar from "./Searchbar";
import { cn } from "@/lib/utils";

interface INavbarProps extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
}

const Navbar: React.FC<INavbarProps> = ({ className, ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isStakingOpen, setIsStakingOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY < lastScrollY);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className={cn(`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out bg-white ${isVisible ? "translate-y-0" : "-translate-y-full"}`, className)} {...props}>
      {/* Logo */}
      <div className="flex items-center justify-around">
        <Link href="/" className="w-44">
          <Image src={logo} alt="logo" className="object-contain w-full" />
        </Link>

        {/* Full Navbar content for large screens */}
        <div className="hidden lg:flex items-center justify-center gap-8">
          <NavbarLinks />
          <UserProfileDropdownButton />
        </div>

        {/* Hamburger Menu for screens up to large */}
        <div className="lg:hidden z-50 flex items-center justify-around mr-[1rem] ml-auto">
          {menuOpen ? (
            <FaTimes onClick={() => setMenuOpen(false)} className="text-2xl text-black cursor-pointer" />
          ) : (
            <FaBars onClick={() => setMenuOpen(true)} className="text-2xl text-black cursor-pointer" />
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-4 lg:px-32 mt-4">
        <div className="w-[45vw] lg:w-[600px]">
          <Searchbar />
        </div>
        <Link href="/form" className="">
          <button className="text-white gradient-button w-auto lg:w-auto">Add Product</button>
        </Link>
      </div>

      <div className={`absolute top-0 h-[100vh] right-0 w-full bg-white shadow-lg flex flex-col py-14 px-4 space-y-6 z-10 transition-all duration-300 ease-in-out lg:hidden ${menuOpen ? "max-h-screen opacity-100 transform translate-x-0" : "max-h-screen opacity-0 transform translate-x-full"}`}>
        {menuOpen && (
          <>
            <div className="flex flex-col">
              <button onClick={() => setIsStakingOpen(!isStakingOpen)} className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
                <FaAnchor />
                <span>Staking</span>
                <FaChevronDown className={`transition-transform duration-300 ease-in-out ${isStakingOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {isStakingOpen && (
                <div className="flex flex-col space-y-2 mt-2">
                  <Link href="/staking" className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">Staking</Link>
                  <Link href="/dao" className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">DAO</Link>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <button onClick={() => setIsPlatformOpen(!isPlatformOpen)} className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
                <FaProductHunt />
                <span>Platform</span>
                <FaChevronDown className={`transition-transform duration-300 ease-in-out ${isPlatformOpen ? "rotate-180" : "rotate-0"}`} />
              </button>
              {isPlatformOpen && (
                <div className="flex flex-col space-y-2 mt-2">
                  <Link href="/products/buy-now" className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">Crypto Shop</Link>
                  <Link href="/tokenization" className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">Tokenization</Link>
                </div>
              )}
            </div>

            <Link href="#" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaFileAlt />
              <span>CSHOP Card</span>
            </Link>
            <Link href="https://shophekart.gitbook.io/shophekart" target="_blank" className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded">
              <FaBookOpen />
              <span>Whitepaper</span>
            </Link>

            <UserProfileDropdownButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;