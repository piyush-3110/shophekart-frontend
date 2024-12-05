"use client";

import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { envConfig } from "@/config/envConfig";
import Loader from "../Form/Loader";
import { OpenAI } from "openai";

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
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
      setMessages([]); // Clear messages when modal opens
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
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
      <DialogTrigger asChild>{/* Optional trigger element */}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#160041] font-semibold text-center text-xl mb-4">
            Chatbot
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>
        <div className="flex-grow h-[95vh] md:h-[65vh] lg:h-[80vh] overflow-y-auto mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
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
      </DialogContent>
    </Dialog>
  );
};
