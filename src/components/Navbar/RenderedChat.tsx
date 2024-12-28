"use client";

import { usePathname } from "next/navigation";

import ChatbotButton from "../chatbot/ChatbotButton";

const RenderedChat = () => {
  const pathname = usePathname();

  // if (pathname == "/products/buy-now") {
  //   return <Navbar className="mb-10" />;
  // }
  // return <FloatingNavbar />;
  if (pathname != "/chat") {
    return (
      <>
        <ChatbotButton />
      </>
    );
  }
  return "";
};

export default RenderedChat;
