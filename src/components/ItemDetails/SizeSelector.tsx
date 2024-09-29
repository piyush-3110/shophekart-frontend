import React from "react";

interface SizeSelectorProps {
  selectedSize: string;
  handleSizeClick: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, handleSizeClick }) => {
  const sizes = ["S", "M", "L"];
  return (
    <div>
      <p className="text-sm font-[400] text-[#6B6F93]">Size</p>
      <div className="flex gap-1 mt-2">
        {sizes.map((size) => (
          <div
            key={size}
            className={`text-center text-md font-[700] py-1 px-2 cursor-pointer ${
              selectedSize === size ? "bg-[#160041] text-white" : "bg-[#F4F6FA] text-black"
            }`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
