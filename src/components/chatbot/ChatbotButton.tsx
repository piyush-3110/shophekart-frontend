"use client";
import React, { useState } from "react";
import { ChatbotModal } from "./ChatbotModal";
import { IoIosChatboxes } from "react-icons/io";

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 z-50 right-4">
      <button
        onClick={handleOpen}
        className="animate-bounce-vertical transition-all transform duration-300 hover:animate-none"
      >
        <IoIosChatboxes className="text-purple-600 !text-6xl" />
      </button>
      <ChatbotModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default ChatbotButton;
