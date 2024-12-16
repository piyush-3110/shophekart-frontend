import React from "react";

import { BidToken } from "../Homepage/Presale/BidToken";

const BidTokenForm = () => {
  return (
    <div className="bg-[#0f1113] py-3 px-3 h-[13rem] rounded-xl">
      <h1 className="text-[#635f5f] text-center font-semibold text-lg pb-2">
        Bid Amount
      </h1>
      <div className="flex text-[#635f5f] gap-1 items-center">
        <h1 className="  ">
          Referral Earning {"(BNB)"}: <span className="">0.00</span>
        </h1>
      </div>
      <div className="flex  text-[#635f5f]  gap-1 items-center">
        <h1 className=" ">
          Referral Earning {"(USDT)"}: <span className=" ">0.00</span>
        </h1>
      </div>
      <BidToken />
    </div>
  );
};

export default BidTokenForm;
