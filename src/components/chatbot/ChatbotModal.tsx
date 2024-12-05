"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { envConfig } from "@/config/envConfig";
import Loader from "../Form/Loader";
import { OpenAI } from "openai";
import { IoSend } from "react-icons/io5"; // Import the send icon from react-icons
import Image from "next/image";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMessages([]); // Reset messages when the modal opens
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { role: "user", content: inputText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: envConfig.CHAT_API,
        dangerouslyAllowBrowser: true,
      });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const assistantContent = response.choices[0]?.message?.content?.trim();
      if (assistantContent) {
        const assistantMessage: Message = {
          role: "assistant",
          content: assistantContent,
        };
        setMessages([...newMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "An error occurred. Please try again.",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!p-0 rounded-lg overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 ">
          <Image
            src="/images/shared/logo.png"
            alt="Logo"
            className="h-[4rem]"
            width={160}
            height={160}
          />
        </DialogHeader>

        {/* Conversation Area */}
        <div className="flex-grow h-[65vh] overflow-y-auto mb-4 p-4 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="w-10 h-10 rounded-full mx-2"
              />

              {/* Message */}
              <p
                className={`px-4 py-2 rounded-lg max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gradient-to-r from-green-400 to-green-600 text-white"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
          {loading && <p className="text-gray-500 text-center">Typing...</p>}
        </div>

        {/* Input Area */}
        <div className="relative flex items-center m-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow border border-gray-300 rounded-full p-3 pr-12 focus:outline-none focus:none focus:none"
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full hover:scale-105 transition-transform disabled:opacity-50"
            disabled={loading || !inputText.trim()}
          >
            {loading ? <Loader /> : <IoSend size={20} />}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
