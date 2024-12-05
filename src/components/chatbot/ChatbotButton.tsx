"use client";
import React, { useState } from "react";
import { ChatbotModal } from "./ChatbotModal";

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleOpen}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Open Chatbot
      </button>
      <ChatbotModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default ChatbotButton;
