"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { OpenAI } from "openai";
import { envConfig } from "@/config/envConfig";
import Loader from "../Form/Loader";

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

  const openai = new OpenAI({
    apiKey: envConfig.CHAT_API,
    dangerouslyAllowBrowser: true,
  });

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: inputText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setLoading(true);

    try {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] h-[80vh] bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <div className="flex-grow overflow-y-auto mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.role === "user"
                  ? "text-right text-blue-600"
                  : "text-left text-gray-700"
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
          {loading && <p className="text-gray-500">Typing...</p>}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg disabled:bg-blue-300"
            disabled={loading || !inputText.trim()}
          >
            {loading ? <Loader /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};
