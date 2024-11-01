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
    FaChevronDown,
} from "react-icons/fa";

import NavbarLinks from "./NavbarLinks";
import Link from "next/link";
import UserProfileDropdownButton from "../shared/UserProfileDropdownButton";
// import AuthButton from "../shared/AuthButton";
// import { useUserStore } from "@/store/";

export default function FloatingNavbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const [isPlatformOpen, setIsPlatformOpen] = useState(false);
    const [isStakingOpen, setIsStakingOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // const { user } = useUserStore();

    return (
        <nav
            className={`sticky lg:flex lg:items-center w-full  lg:justify-around top-0 z-[4] left-0 transition-transform duration-300 ease-in-out bg-white py-2 px-6 ${isVisible ? "translate-y-0" : "-translate-y-full"
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
                    {/* {!user && <AuthButton />} */}

                    {/* Connect Wallet Button */}
                    <UserProfileDropdownButton />

                    {/* Login & Logout Button */}
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
                className={`absolute top-0 h-[100vh] right-0 w-full bg-white shadow-lg flex flex-col py-14 px-4 space-y-6 z-10 overflow-hidden transition-all duration-300 ease-in-out ${menuOpen
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

                        {/* Staking Dropdown for Mobile */}
                        <div className="flex flex-col">
                            <button
                                className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                onClick={() => setIsStakingOpen(!isStakingOpen)}
                            >
                                <FaAnchor />
                                <span>Token Side</span>
                                <FaChevronDown
                                    className={`transition-transform duration-300 ease-in-out ${isStakingOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>
                            {isStakingOpen && (
                                <div className="flex flex-col space-y-2 mt-2">
                                    <Link
                                        href="/staking"
                                        className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                    >
                                        Staking
                                    </Link>
                                    {/* <Link
                    href="/staking"
                    className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                  >
                    Vesting
                  </Link> */}
                                    <Link
                                        href="/dao"
                                        className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                    >
                                        DAO
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Platform Dropdown for Mobile */}
                        <div className="flex flex-col">
                            <button
                                className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                onClick={() => setIsPlatformOpen(!isPlatformOpen)}
                            >
                                <FaProductHunt />

                                <span>Platform</span>

                                <FaChevronDown
                                    className={`transition-transform duration-300 ease-in-out ${isPlatformOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>
                            {isPlatformOpen && (
                                <div className="flex flex-col gap-2 space-y-2 mt-2">
                                    <Link
                                        href="/products/buy-now"
                                        className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                    >
                                        Crypto Shop
                                    </Link>
                                    <Link
                                        href="/tokenization"
                                        className="text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                                    >
                                        Tokenization
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="#"
                            className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                        >
                            <FaFileAlt />
                            <span>CSHOP Card</span>
                        </Link>
                        <Link
                            href="https://shophekart.gitbook.io/shophekart"
                            target="_blank"
                            className="flex items-center space-x-2 text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded"
                        >
                            <FaBookOpen />
                            <span>Whitepaper</span>
                        </Link>

                        {/* Connect Wallet button inside the dropdown */}
                        <UserProfileDropdownButton />
                        {/* {!user && <AuthButton />} */}
                    </>
                )}
            </div>
        </nav>
    );
}
