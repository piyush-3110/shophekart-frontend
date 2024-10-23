"use client";

import { usePathname } from "next/navigation";
import FloatingNavbar from "./FloatingNavbar";
import Navbar from "../products/shared/navbar";

const RenderedNavbar = () => {
  const pathname = usePathname();

  if (pathname == "/" || pathname == "/cshopCard" || pathname == "/staking"||pathname=="/tokenization"||pathname=="/dao") {
    return <FloatingNavbar />;
  }
  return <Navbar className="mb-10" />;
};

export default RenderedNavbar;
