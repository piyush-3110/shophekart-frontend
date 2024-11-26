"use client";
import { AiShopheLogo } from "@/icons";
import customToast from "@/utils/toasts";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { OpenAI } from "openai";
import { envConfig } from "@/config/envConfig";
import Loader from "./Loader";
import { useUserStore } from "@/store";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HypeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUserStore();
  console.log(user?.walletAddress);
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
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

  // Function to check the rate limit from the backend
  const checkRateLimit = async () => {
    if (!user?.walletAddress) {
      customToast.error("Wallet address is required.");
      return false;
    }

    try {
      const response = await axios.post(
        `${envConfig.BACKEND_URL}/check-limit`,
        { walletAddress: user.walletAddress }
      );
      console.log(response);
      if (response.data.data.allowed) {
        return true; // Allow to generate description
      } else {
        customToast.error("Limit exceeded! Please try again later.");
        return false; // Prevent from generating description
      }
    } catch (error) {
      console.error("Error checking rate limit:", error);
      customToast.error("Unable to check limit. Please try again.");
      return false;
    }
  };

  const handleGenerateDescription = async () => {
    if (!inputText.trim()) {
      customToast.error("Please enter a product description first.");
      return;
    }

    const isAllowed = await checkRateLimit();
    if (!isAllowed) return; // Prevent generation if limit exceeded

    setLoading(true);
    setGeneratedText("");

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

  const handleCopyResponse = () => {
    if (!generatedText) return;
    navigator.clipboard
      .writeText(generatedText)
      .then(() => {
        customToast.success("Response Copied!!");
      })
      .catch((error) => {
        console.error("Failed to copy response:", error);
        customToast.error("Failed to copy response. Please try again.");
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] h-[80vh] bg-white shadow-lg rounded-lg p-6">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <div className="overflow-y-auto flex flex-col py-4 h-full">
          <AiShopheLogo className="h-12 min-h-12 w-auto mx-auto mb-6" />

          <label className="text-gray-700 font-medium mb-2">
            Enter a short description of your product, include the most
            important advantages of the item
          </label>
          <textarea
            className="w-full min-h-16 max-h-40 p-4 border border-gray-300 rounded-lg mb-6 resize-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter product description here..."
          ></textarea>

          <label className="text-gray-700 font-medium mb-2">
            Here AIShophee will prepare a complete and advanced description for
            you
          </label>
          <div className="w-full min-h-28 p-4 border border-gray-300 rounded-lg mb-6 overflow-auto">
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

          <div className="flex justify-between mt-6">
            <button
              className={`gradient-button text-white flex items-center justify-center`}
              onClick={handleGenerateDescription}
              disabled={loading}
            >
              {loading ? <Loader /> : "Generate Description"}
            </button>

            <button
              className={`py-2 px-6 font-medium rounded-sm ${
                generatedText
                  ? "gradient-button text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleCopyResponse}
              disabled={!generatedText}
            >
              Copy Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
