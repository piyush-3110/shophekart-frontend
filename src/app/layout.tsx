import type { Metadata } from "next";
import {DM_Sans} from "next/font/google"
import "./globals.css";
 const dm = DM_Sans({
  subsets:['latin'],
  weight:['400','500','700'],
 
 })


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
      <body
        className={`${dm.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
