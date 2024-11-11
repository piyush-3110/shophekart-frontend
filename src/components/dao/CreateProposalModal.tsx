/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "@/hooks/use-toast"; // Assuming you have a toast hook
import { envConfig } from "@/config/envConfig";
import { useUserStore } from "@/store";
import ConnectWalletButton from "../shared/ConnectWalletButton";
import Loader from "../Form/Loader";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProposalModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false); // Manually handle loading state
  const { user } = useUserStore();

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
      setProposal(""); // Reset proposal when modal opens
    } else {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  // Handle proposal submission
  const handleSubmit = async () => {
    if (!proposal.trim()) {
      toast({ title: "Proposal cannot be empty", variant: "destructive" });
      return;
    }
    if (!user || !user.walletAddress) {
      toast({ title: "Please connect your wallet", variant: "destructive" });
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${envConfig.BACKEND_URL}/email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: user?.walletAddress,
          proposal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send proposal");
      }
      const data = await response.json();
      if (data.success !== "ok") {
        throw new Error(data.error || "Failed to send proposal");
      }

      toast({ title: "Proposal sent successfully" });
      setProposal(""); // Clear proposal text
      onClose(); // Close modal
    } catch (error) {
      toast({ title: "Error sending proposal", variant: "destructive" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div className="relative w-[90vw] md:w-[80vw] h-fit py-5 bg-white shadow-lg rounded-lg p-6">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <div className="overflow-y-auto flex flex-col py-4 h-full">
          <h1 className="text-[#160041] font-[700] text-center text-xl">
            Suggest Proposal
          </h1>
          <textarea
            className="border rounded-lg p-4 mb-4 w-full h-40 placeholder-gray-400"
            placeholder="Write Proposal"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          />

          {user?.walletAddress ? (
            loading ? ( // Check if loading
              <Loader /> // Show Loader component while loading
            ) : (
              <button
                onClick={handleSubmit}
                className="gradient-button text-white hover:cursor-pointer mt-4 w-full py-2 rounded transition duration-150"
              >
                Submit
              </button>
            )
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </div>
    </div>
  );
};
