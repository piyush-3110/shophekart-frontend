"use client";
import Messages from "@/components/chat/Messages";
import Sidebar from "@/components/chat/Sidebar";
import React, { useState } from "react";

const Page = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<{
    [key: string]: { id: string; sender: string; content: string }[];
  }>({
    "1": [
      { id: "1", sender: "Alice", content: "Hey, how are you?" },
      { id: "2", sender: "You", content: "I'm good, thanks!" },
    ],
    "2": [
      { id: "1", sender: "Bob", content: "Did you check the report?" },
      { id: "2", sender: "You", content: "Yes, I did!" },
    ],
    "3": [
      {
        id: "1",
        sender: "Charlie",
        content: "What are your plans for the weekend?",
      },
    ],
  });

  const handleSendMessage = (message: string, file: File | null) => {
    if (selectedChat && selectedChat in messages) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [
          ...prevMessages[selectedChat],
          {
            id: Date.now().toString(),
            sender: "You",
            content: file ? `${message} [Attached: ${file.name}]` : message,
          },
        ],
      }));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={messages}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <Messages
        chatId={selectedChat}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Page;
