/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react"; // Import emoji picker

const Page = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null); // State for the attached file
  const [messages, setMessages] = useState<{
    [key: string]: { id: string; sender: string; content: string }[]; // Messages content
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

  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Control emoji picker visibility
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (
      (newMessage.trim() || attachedFile) &&
      selectedChat &&
      selectedChat in messages
    ) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [
          ...prevMessages[selectedChat],
          {
            id: Date.now().toString(),
            sender: "You",
            content: attachedFile
              ? `${newMessage} [Attached: ${attachedFile.name}]`
              : newMessage,
          },
        ],
      }));
      setNewMessage("");
      setAttachedFile(null); // Reset the attached file
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
    }
  };

  const addEmoji = (emojiObject: any) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false); // Hide the emoji picker after selection
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedChat]);

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
                  <h3 className="text-sm font-semibold">Chat {chatId}</h3>
                  <p className="text-xs text-gray-400 truncate max-w-[12rem]">
                    {messages[chatId][messages[chatId].length - 1]?.content}
                  </p>
                </div>
              </div>
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
              <h3 className="text-lg font-semibold">Chat {selectedChat}</h3>
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
          <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-gray-200 flex items-center fixed bottom-0 w-3/4">
          <button
            className="mr-2 text-gray-500"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 z-10">
              <EmojiPicker onEmojiClick={addEmoji} />
            </div>
          )}
          <label className="mr-2 text-gray-500 cursor-pointer">
            📎
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded mr-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="gradient-button !px-4 !py-2 !text-[1rem]"
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
