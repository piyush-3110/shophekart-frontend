import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string; // Add className as an optional prop
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={twMerge("text-black hover:text-blue-500", className)}
    >
      {children}
    </Link>
  );
};

export default NavLink;
