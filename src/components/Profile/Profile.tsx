"use client";

import React from "react";
import { ProfileCard } from "./ProfileCard";
import { Slider } from "./Slider";
import { useUserStore } from "@/store";
import AccessDeniedMessage from "../shared/AccessDeniedMessage";

export const Profile = () => {
  const { user } = useUserStore();

  if (!user || !user._id || !user.walletAddress) return <AccessDeniedMessage />;

  return (
    <div className="w-full pb-12">
      <div
        className="w-full  h-[14rem] bg-gradient-to-r"
        style={{
          background: "linear-gradient(to right, #25a5f6, #5aa1f6, #aabff9)",
        }}
      >
        <div className="transform translate-y-[20%] md:translate-y-[25%] ">
          <ProfileCard
            walletAddress={user.walletAddress}
            trustScore={user.trustScore}
            description={user.description}
          />
        </div>
        <Slider />
      </div>
    </div>
  );
};
