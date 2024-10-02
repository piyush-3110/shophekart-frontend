"use client";

import { usePathname } from "next/navigation";
import FloatingNavbar from "./FloatingNavbar";
import Navbar from "../products/shared/navbar";

const RenderedNavbar = () => {
  const pathname = usePathname();

  if (pathname == "/" || pathname == "/cshopCard" || pathname == "/staking") {
    return <FloatingNavbar />;
  }
  return <Navbar className="mb-10" />;
};

export default RenderedNavbar;
