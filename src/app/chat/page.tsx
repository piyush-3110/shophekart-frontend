"use client";
import React, { useState } from "react";

const Page = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
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

  const chatDetails: {
    [key: string]: { name: string; status: string; lastSeen: Date };
  } = {
    "1": {
      name: "Alice",
      status: "online",
      lastSeen: new Date(Date.now() - 5 * 60 * 1000),
    }, // 5 minutes ago
    "2": {
      name: "Bob",
      status: "offline",
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    }, // 2 hours ago
    "3": { name: "Charlie", status: "online", lastSeen: new Date() }, // Currently online
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat && selectedChat in messages) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [
          ...prevMessages[selectedChat],
          { id: Date.now().toString(), sender: "You", content: newMessage },
        ],
      }));
      setNewMessage("");
    }
  };

  const getLastSeenText = (lastSeen: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
    return lastSeen.toLocaleDateString();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Messages</h2>
        {Object.keys(messages).map((chatId) => (
          <div
            key={chatId}
            className={`p-2 mb-2 rounded cursor-pointer ${
              selectedChat === chatId ? "bg-gray-700" : "bg-gray-900"
            }`}
            onClick={() => setSelectedChat(chatId)}
          >
            <div className="relative">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <h3 className="text-sm font-semibold">
                    {chatDetails[chatId].name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate max-w-[12rem]">
                    {messages[chatId][messages[chatId].length - 1]?.content}
                  </p>
                </div>
              </div>

              <p
                className={`text-xs absolute top-0 right-2 ${
                  chatDetails[chatId].status === "online"
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {chatDetails[chatId].status === "online"
                  ? "Online"
                  : getLastSeenText(chatDetails[chatId].lastSeen)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col">
        {/* Header */}
        {selectedChat && (
          <div className="bg-gray-200 p-4 flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <h3 className="text-lg font-semibold">
                {chatDetails[selectedChat].name}
              </h3>
              <p
                className={`text-sm ${
                  chatDetails[selectedChat].status === "online"
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {chatDetails[selectedChat].status}
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 bg-gray-100 p-4 mb-12 overflow-y-scroll">
          {selectedChat ? (
            messages[selectedChat].map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 ${
                  msg.sender === "You" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[70%] text-left px-4 py-2 rounded ${
                    msg.sender === "You"
                      ? "gradient-background text-white"
                      : "bg-gray-300"
                  } break-words overflow-hidden`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Select a chat to start messaging.</p>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-gray-200 flex items-center fixed bottom-0 w-3/4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded mr-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
