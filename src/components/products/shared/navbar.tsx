import Image from "next/image";
import logo from "../../../../public/images/shared/logo.png";
import UserProfileDropdownButton from "@/components/shared/UserProfileDropdownButton";
import Searchbar from "./Searchbar";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { CartIcon, TranslateIcon } from "@/icons";

interface INavbarProps extends React.HtmlHTMLAttributes<HTMLElement> {
  className?: string;
}

const Navbar: React.FC<INavbarProps> = ({ className, ...props }) => {
  return (
    <nav
      className={cn("flex gap-8 w-full items-center justify-around", className)}
      {...props}
    >
      <Link href={"/"} className="w-44">
        <Image src={logo} alt="logo" className="object-contain w-full" />
      </Link>
      <div className="min-w-[300px] w-[600px]">
        <Searchbar />
      </div>
      <div className="flex items-center gap-4 w-fit">
        <Link href={"/"}>News</Link>
        <Link href={"/checkout"}>
          <CartIcon />
        </Link>
        <button type="button" aria-label="translate">
          <TranslateIcon />
        </button>
      </div>
      <div className="w-fit">
        <UserProfileDropdownButton />
      </div>
    </nav>
  );
};

export default Navbar;
