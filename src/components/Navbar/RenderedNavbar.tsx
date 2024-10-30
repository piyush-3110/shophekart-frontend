"use client";

import { usePathname } from "next/navigation";
import FloatingNavbar from "./FloatingNavbar";
import Navbar from "../products/shared/navbar";

const RenderedNavbar = () => {
  const pathname = usePathname();

  if (pathname == "/products/buy-now") {
    return <Navbar className="mb-10" />;
  }
  return <FloatingNavbar />;
};

export default RenderedNavbar;
