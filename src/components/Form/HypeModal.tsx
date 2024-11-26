"use client";
import { AiShopheLogo } from "@/icons";
import customToast from "@/utils/toasts";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { OpenAI } from "openai";
import { envConfig } from "@/config/envConfig";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HypeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: envConfig.CHAT_API,
    dangerouslyAllowBrowser: true,
  });

  // Close the modal when clicking outside of it
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  // Show "Coming soon" message
  const handleComingSoon = () => {
    customToast.success("AIShophee Coming soon");
  };

  // Generate description using OpenAI API
  const handleGenerateDescription = async () => {
    if (!inputText.trim()) {
      customToast.error("Please enter a product description first.");
      return;
    }

    setLoading(true);
    setGeneratedText(""); // Clear previous generated text

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputText }],
      });

      setGeneratedText(response.choices[0]?.message?.content?.trim() || "");
    } catch (error) {
      console.error("Error generating description:", error);
      customToast.error("Failed to generate description. Please try again.");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] h-[80vh] bg-white shadow-lg rounded-lg p-6">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto flex flex-col py-4 h-full">
          {/* Logo */}
          <AiShopheLogo className="h-12 min-h-12 w-auto mx-auto mb-6" />
          {/* First Text Area */}
          <label className="text-gray-700 font-medium mb-2">
            Enter a short description of your product, include the most
            important advantages of the item
          </label>
          <textarea
            className="w-full h-28 p-4 border border-gray-300 rounded-lg mb-6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          {/* Second Text Area */}
          <label className="text-gray-700 font-medium mb-2">
            Here AIShophee will prepare a complete and advanced description for
            you
          </label>
          <div className="w-full h-28 p-4 border border-gray-300 rounded-lg mb-6">
            {loading ? (
              <p className="text-neutral-400">Generating description...</p>
            ) : generatedText ? (
              <p className="text-gray-700">{generatedText}</p>
            ) : (
              <p className="select-none text-neutral-400">
                AIShophee is preparing your description...
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="gradient-button text-white"
              onClick={handleGenerateDescription}
              disabled={loading}
            >
              Generate Description
            </button>
            <button
              className="gradient-border !rounded-sm text-[#3f5af7] font-[500] py-2 px-6 hover:text-[#445de9]"
              onClick={handleComingSoon}
            >
              Save & Use AIShophee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
