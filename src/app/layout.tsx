import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "@/context/Web3ModalProvider";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import RenderedNavbar from "@/components/Navbar/RenderedNavbar";
import Footer from "@/components/Footer/Footer";

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
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./images/shared/favicon.png" />
      </head>
      <body className={`${dm.className} antialiased overflow-x-hidden`}>
        <Web3ModalProvider initialState={initialState}>
          <RenderedNavbar />
          {children}
          <Footer/>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
