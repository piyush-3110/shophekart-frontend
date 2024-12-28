"use client";
import Messages from "@/components/chat/Messages";
import Sidebar from "@/components/chat/Sidebar";
import React, { useState, useEffect } from "react";

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

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Set isSmallScreen on client-side when window is defined
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div className={`flex flex-col sm:flex-row w-full`}>
        {/* Sidebar */}
        <Sidebar
          chats={messages}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          className={`${
            isSmallScreen && !selectedChat ? "block" : "hidden"
          } sm:block w-full min-h-[100vh] md:w-[40%] lg:w-[25%]`}
        />

        {/* Chat Messages */}
        <div
          className={`w-full  md:mx-4 md:mt-4  border border-[#D7DDE7] md:w-[60%] lg:w-[75%] ${
            isSmallScreen && selectedChat ? "p-4" : ""
          }`}
        >
          {selectedChat ? (
            <div className="flex flex-col h-full">
              {/* Back to chats button */}
              {isSmallScreen && (
                <button
                  className="text-sm text-blue-400 mb-4"
                  onClick={() => setSelectedChat(null)}
                >
                  ← Back to chats
                </button>
              )}

              {/* Messages Component */}
              <Messages
                chatId={selectedChat}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>
          ) : (
            <div className="p-4">Select a chat to view messages</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
