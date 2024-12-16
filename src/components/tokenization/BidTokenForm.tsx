import React from "react";

import { BidToken } from "../Homepage/Presale/BidToken";

const BidTokenForm = () => {
  return (
    <div className="bg-[#0f1113] py-3 px-3 rounded-xl">
      <h1 className="text-[#635f5f] mb-2 ml-2">Bid Amount</h1>
      <BidToken />
    </div>
  );
};

export default BidTokenForm;
