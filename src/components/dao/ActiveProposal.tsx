import React from 'react';

export const ActiveProposal = () => {
  
  const proposals = [
    "Proposal to reduce transaction fees for DAO members.",
    "Proposal to integrate a new governance token system.",
    "Proposal to launch a community rewards program.",
    "Proposal to improve voting transparency.",
    "Proposal to implement a decentralized identity solution."
  ];

  return (
    <div className="text-white space-y-6">
      {proposals.map((proposal, index) => (
        <div
          key={index}
          className="flex justify-between border border-white items-center py-2 px-4  rounded-lg"
        >
          {/* Left side: Proposal text */}
          <p className="max-w-md truncate">{proposal}</p>

          {/* Right side: Approve and Reject buttons */}
          <div>
            <button className="text-green-500  px-4 py-2 mr-2">
              Approve
            </button>
            <button className="text-red-500  px-4 py-2 rounded">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
