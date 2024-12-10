"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QA {
  question: string;
  answer: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<QA[]>([]); // Store the displayed questions and answers
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of questions
  const [clickedQuestions, setClickedQuestions] = useState<Set<number>>(
    new Set()
  ); // Track clicked questions

  const questionsAndAnswers: QA[] = [
    {
      question: "What is Shophekart and what does it offer?",
      answer:
        "Shophekart is a decentralized Web3 platform that enables users to buy, sell, and trade both digital and physical goods, with a focus on tokenizing luxury assets like vintage cars, luxury watches, and fine art.",
    },
    {
      question:
        "How does Shophekart revolutionize e-commerce through blockchain and Web3 technology?",
      answer:
        "Shophekart revolutionizes e-commerce by creating a decentralized marketplace that leverages blockchain technology, NFTs, and cryptocurrency payments.",
    },
    {
      question:
        "How does Shophekart provide a unique and secure shopping experience in the Web3 era?",
      answer:
        "Shophekart delivers a unique and secure shopping experience by combining blockchain technology, cryptocurrency payments, and decentralized communication.",
    },
    {
      question:
        "What are the steps to successfully buy and sell on Shophekart?",
      answer:
        "For Sellers: Create a detailed product listing and mint an NFT for authenticity. For Buyers: Make secure purchases and track orders.",
    },
    {
      question: "What types of luxury assets do we tokenize on Shophekart?",
      answer:
        "We tokenize a range of high-value luxury assets, including:\n\nLuxury Cars: Fractional ownership of vintage and high-end vehicles.\nWatches: Tokenized high-value timepieces for secure trading.\nArtworks: Fractional investment in fine art with NFTs for authenticity.\nCollectibles: Limited-edition sneakers, designer items, and rare collectibles.\nOur platform enables secure and transparent transactions, fractional ownership, and global accessibility through blockchain technology.",
    },
    {
      question:
        "How does Shophekart integrate AI and NFTs to enhance e-commerce?",
      answer:
        "Shophekart combines NFTs and AI to transform e-commerce by:\n\nNFTs for Authenticity: Each product, digital or physical, comes with a unique NFT, ensuring verified ownership and authenticity. Physical goods include proof of ownership, while digital assets allow creators to monetize securely with royalties via smart contracts.\nAI-Powered Personalization: AI analyzes user behavior to provide tailored product recommendations and optimize seller listings.\nFraud Detection: AI monitors transactions to prevent fraud, ensuring a secure marketplace.\nThis integration creates a secure, transparent, and personalized shopping experience for all users.",
    },
    {
      question: "What are the key features that make Shophekart unique?",
      answer:
        "Shophekart stands out with its innovative features, including:\n\nDecentralized Marketplace: Transparent and secure blockchain-based trading.\nNFT-Integrated Listings: Digital certificates of authenticity for all physical goods.\nCryptocurrency Payments: Seamless transactions with multiple cryptocurrencies, including the native CSHOP token.\nEscrow Service: Funds and NFTs are held securely until both parties fulfill obligations.\nUser-Friendly Interface: Intuitive design for easy navigation by all users.\nCSHOP MasterCard: Direct crypto spending without conversion fees.\nStaking and Rewards: Earn rewards and discounts by staking CSHOP tokens.\nGlobal Accessibility: A marketplace connecting users worldwide.\nThese features ensure a secure, transparent, and accessible e-commerce experience.",
    },
    {
      question: "What are the key milestones in Shophekart's roadmap?",
      answer:
        "Shophekart's roadmap outlines significant milestones:\n\n2024 Q4:\n\nFully functional store (MVP)\nP2P Messaging\nAIShophe (MVP)\niOS/Android SDK implementation\nMulti-chain support\n\n2025 Q1:\n\nAI tools for dispute resolution\nDataFi integration\nLaunch of Shophekart Card\nMetadata protection\n\n2025 Q2:\n\nDeveloper API for store plugins and offers\nShophekart for institutions\nGlobal expansion with new features and services\n\n2025 Q3:\n\nMainnet launch\nOpen-source protocol introduction\nData node incentives\nDistributed data mines\nThese milestones demonstrate Shophekart's commitment to innovation, global reach, and enhanced user experience.",
    },
    {
      question:
        "How is the total supply of CSHOP tokens distributed, and what are the key vesting schedules?",
      answer:
        "The total supply of 800 million CSHOP tokens is allocated across various functions, including Seed Round (20%), Private Round (12%), Public Round (8%), and others, with specific vesting schedules to promote long-term growth. For example, Seed Round tokens unlock 40% at TGE with a 1-month cliff and 0.5% daily vesting, while Team Allocation has a 10-month cliff and linear vesting over 12 months.",
    },
    {
      question:
        "What are the staking benefits and how does the profit-sharing mechanism reward top CSHOP investors?",
      answer:
        "Staking CSHOP tokens offers rewards, reduced fees, exclusive features, and enhanced platform security. The profit-sharing mechanism allocates 50% of platform profits to the top 100 token holders based on a tiered structure. This model ensures transparent rewards, promotes community loyalty, and supports long-term passive income.",
    },
    {
      question:
        "How can I participate in the presale of CSHOP tokens, and what are the different presale phases?",
      answer:
        "To participate in the presale, sign up on the Shophekart website, prepare a compatible wallet, and deposit the required cryptocurrency. The presale is divided into three phases:\n\nSeed Round (20% allocation, price: $0.0030, fundraising target: $480,000).\nPrivate Round (12% allocation, price: $0.0040, fundraising target: $384,000).\nPublic Round (8% allocation, price: $0.0050, fundraising target: $320,000). Unsold tokens will be burned in each phase. Early participation offers discounted prices, early access to tokens, and the ability to participate in the Shophekart DAO for governance decisions.",
    },
    {
      question: "Who are the partners and supporters of Shophekart?",
      answer:
        "Shophekart has partnered with several well-known organization and platforms, including Blue Whales Agency, UNCX Network, MasterCard, OpenSea, WOW Earn, OpenAI, Binance Smart Chain, Gecko Terminal BSC, CoinGecko, CoinMarketCap, DEX Scanner, DEX Tools, PancakeSwap, PinkSale, MetaMask, TrustWallet, and Snapshot, among others. These partnerships support the growth and development of the Shophekart ecosystem.",
    },
  ];

  const loadNextQuestions = () => {
    const nextIndex = currentIndex + 3;
    const nextQuestions = questionsAndAnswers.slice(currentIndex, nextIndex);
    setMessages((prevMessages) => [...prevMessages, ...nextQuestions]);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages(questionsAndAnswers.slice(0, 3)); // Reset to show first 3 questions
      setCurrentIndex(3); // Set index after the first 3 questions
      setClickedQuestions(new Set()); // Reset clicked questions when modal opens
    }
  }, [isOpen]);

  // Handle click on a question to display the answer
  const handleQuestionClick = (index: number) => {
    setClickedQuestions((prev) => new Set(prev.add(index)));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!p-0 rounded-lg overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-black px-4">
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
            <div key={index} className="mb-4">
              {/* Question - Always show on the right side */}
              {msg.question && (
                <div
                  className="flex items-start mb-2 justify-end cursor-pointer"
                  onClick={() => handleQuestionClick(index)}
                >
                  <p
                    className={`px-4 py-2 rounded-lg max-w-[75%] bg-gradient-to-r from-blue-500 to-purple-500 text-black`}
                  >
                    {msg.question}
                  </p>
                </div>
              )}

              {/* Answer - Show on the left side when clicked */}
              {clickedQuestions.has(index) && msg.answer && (
                <div className="flex items-start mb-2 justify-start">
                  <p className="px-4 py-2 rounded-lg max-w-[75%] bg-gradient-to-r from-green-400 to-green-600 text-black">
                    {msg.answer}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Button to load next set of questions */}
          {currentIndex < questionsAndAnswers.length && (
            <button
              onClick={loadNextQuestions}
              className="bg-blue-500 text-black p-2 rounded-full mt-4"
            >
              Show More Questions
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
