import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "@/context/Web3ModalProvider";

import NextTopLoader from "nextjs-toploader";

import RenderedNavbar from "@/components/Navbar/RenderedNavbar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RenderedChat from "@/components/Navbar/RenderedChat";

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
        <link
          href="https://db.onlinewebfonts.com/c/cefa2bca89ec27b6b9c51c215bce8ba2?family=Nexa-Regular"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/c9f309b3d47969ecac64a77a6c672594?family=Nexa+Bold"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />

        <link rel="icon" href="./images/shared/favicon.png" />
      </head>
      <body className={`${dm.className} antialiased overflow-x-hidden`}>
        <Web3ModalProvider>
          <TooltipProvider>
            <RenderedNavbar />
            <RenderedChat />

            <NextTopLoader color="#0163ff" />
            {children}
            <Toaster />
          </TooltipProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
