"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images/shared/logo.png";
import UserProfileDropdownButton from "@/components/shared/UserProfileDropdownButton";
import Searchbar from "./Searchbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

interface INavbarProps extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
}

const Navbar: React.FC<INavbarProps> = ({ className, ...props }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={cn("flex w-full items-center justify-between sm:justify-start", className)} {...props}>
      {/* Logo - Always visible */}
      <Link href={"/"} className="w-44">
        <Image src={logo} alt="logo" className="object-contain w-full" />
      </Link>

      {/* Hamburger Menu for small screens */}
      <div className="sm:hidden z-50 flex items-center mr-[1rem] ml-auto">
        {menuOpen ? (
          <FaTimes onClick={() => setMenuOpen(false)} className="text-2xl text-black cursor-pointer" />
        ) : (
          <FaBars onClick={() => setMenuOpen(true)} className="text-2xl text-black cursor-pointer" />
        )}
      </div>

      {/* Full Navbar content for medium and large screens */}
      <div className="hidden sm:flex gap-8 w-full items-center justify-around">
        <div className="min-w-[300px] w-[600px]">
          <Searchbar />
        </div>

        {/* Add Product Button */}
        <Link href="/form">
          <button className="text-white gradient-button">
            Add Product
          </button>
        </Link>

        <div className="w-fit">
          <UserProfileDropdownButton />
        </div>
      </div>

      {/* Dropdown Menu for small screens */}
      <div
        className={`absolute top-0 h-[100vh] right-0 w-full bg-white shadow-lg flex flex-col py-14 px-4 space-y-6 z-10 transition-all duration-300 ease-in-out sm:hidden ${
          menuOpen ? "max-h-screen opacity-100 transform translate-x-0" : "max-h-screen opacity-0 transform translate-x-full"
        }`}
      >
        {menuOpen && (
          <>
               <div className="min-w-[300px] w-full">
              <Searchbar />
            </div>

            <UserProfileDropdownButton />
       
            {/* Add Product Button inside hamburger menu */}
            <Link href="/form">
              <button className="text-white gradient-button">
                Add Product
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
