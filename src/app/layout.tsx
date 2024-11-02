import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "@/context/Web3ModalProvider";

import NextTopLoader from "nextjs-toploader";

import RenderedNavbar from "@/components/Navbar/RenderedNavbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";


const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ShophEkart",
  description: "Your one-stop crypto shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./images/shared/favicon.png" />
      </head>
      <body className={`${dm.className} antialiased overflow-x-hidden`}>
        <Web3ModalProvider>
          <TooltipProvider>
            <RenderedNavbar />
            <NextTopLoader color="#0163ff" />
            {children}
            <Toaster />
          
          </TooltipProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
