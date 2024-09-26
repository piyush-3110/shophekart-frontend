import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ConnectButton from '../Hero/Navbar/ConnectButton';

export const BuyToken: React.FC = () => {
  const [amount, setAmount] = useState<number | string>('');
  const [selectedToken, setSelectedToken] = useState<string>('USDT');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token);
    setDropdownOpen(false);
  };

  const handleMaxAmount = () => {

    const maxAmount = 100; 
    setAmount(maxAmount);
  };

  return (
    <div className="flex flex-col gap-4 bg-white w-full max-w-md">
      <div className="flex flex-row gap-4">
      <div className="flex w-[80%] relative">
  <input
    type="number"
    placeholder="Type an amount"
    value={amount}
    onChange={handleAmountChange}
    className="px-4 py-2 border w-full text-sm border-gray-300 rounded-md text-black placeholder-[#c7bfbf] focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
  <button
    onClick={handleMaxAmount}
    className="text-[#0246FF] font-400 text-[1rem] !text-sm absolute right-3 top-1/2 transform -translate-y-1/2"
  >
    Max
  </button>
</div>

        <div className="relative w-[43%]">
          <button
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md text-black flex justify-between items-center  focus:outline-none focus:ring-1 focus:ring-blue-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedToken}
            {dropdownOpen ? (
              <FaChevronUp className="text-[#b2a7a7]" />
            ) : (
              <FaChevronDown className="text-[#b2a7a7]" />
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-all duration-200 ease-in-out">
              <div
                className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                onClick={() => handleTokenSelect('USDT')}
              >
                USDT
              </div>
              <div
                className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
                onClick={() => handleTokenSelect('BNB')}
              >
                BNB
              </div>
            </div>
          )}
        </div>
      </div>
      <ConnectButton />
    </div>
  );
};
