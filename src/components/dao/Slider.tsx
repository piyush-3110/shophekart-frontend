"use client";
import React from "react";
import { CardSpotlightDemo } from "../tokenization/CardSpotlightDemo";
import { ProposalSlider } from "./ProposalSlider";
import useGetUserTokenBalance from "@/hooks/web3/useGetUserBalance";
import { useUserStore } from "@/store";
export const Slider = () => {
  // Get the cshop balance from the custom hook
  const { user } = useUserStore();

  const { cshopBalance, isLoading } = useGetUserTokenBalance(
    user?.walletAddress
  );

  const votingPower = isLoading ? "Loading..." : cshopBalance ?? "0";
  return (
    <div className="px-2 md:px-8 py-8 lg:py-12 min-h-[100vh] bg-[#000] bg-cover bg-center ">
      <p className="text-2xl font-bold mb-9 text-center text-white">
        Proposal and Voting
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 w-[90vw]">
        <CardSpotlightDemo
          heading="Total Proposals"
          description="Track all proposals that are currently active, completed, or rejected within the DAO. This feature provides overview of the status of all proposals."
          value="0"
        />
        <CardSpotlightDemo
          heading="Voting Power"
          description="Your voting power is based on the number of governance tokens you hold. More tokens mean more influence in decision-making!"
          value={votingPower} // Use the cshop balance here
        />
        <CardSpotlightDemo
          heading="Your Proposal Count"
          description="Track all proposals that have been submitted by you. This feature allows you to keep a comprehensive record of all the proposals you've submitted."
          value="0"
        />
      </div>

      <ProposalSlider />
    </div>
  );
};
