/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

interface Message {
  id: string;
  sender: string;
  content: string;
}

interface MessagesProps {
  chatId: string | null;
  messages: { [key: string]: Message[] };
  onSendMessage: (message: string, file: File | null) => void;
}

const Messages: React.FC<MessagesProps> = ({
  chatId,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (newMessage.trim() || attachedFile) {
      onSendMessage(newMessage, attachedFile);
      setNewMessage("");
      setAttachedFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]);
    }
  };

  const addEmoji = (emojiObject: any) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatId]);

  return (
    <div className="w-full min-h-[100vh] flex flex-col">
      {chatId ? (
        <>
          {/* Header */}
          <div className="bg-gray-200 p-4 flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold">Chat {chatId}</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-gray-100 p-4 mb-12 overflow-y-scroll">
            {messages[chatId]?.map((msg) => (
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
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 bg-gray-200 flex items-center fixed bottom-0 md:w-3/4 w-full">
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
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded mr-2"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="gradient-button  !px-4 !py-2 !text-[1rem]"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 p-4">Select a chat to start messaging.</p>
      )}
    </div>
  );
};

export default Messages;
