import React from "react";
import Countdown from "./Countdown";

const ProjectTiming = () => {
  return (
    <div className="bg-[#0f1113] flex flex-col justify-center py-3 px-3 h-[13rem] rounded-xl">
      <h1 className="text-[#635f5f] mb-2 ml-2">
        Casper AI registration ends in:{" "}
      </h1>
      <Countdown targetDate="2025-02-15T12:30:45Z" />
      <button className="gradient-button my-4 w-full">Connect Wallet</button>
    </div>
  );
};

export default ProjectTiming;
