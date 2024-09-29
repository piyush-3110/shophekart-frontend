import React from "react";

interface ColorSelectorProps {
  selectedColor: string;
  handleColorClick: (color: string) => void;
  colors: { color: string; hex: string }[];
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  selectedColor,
  handleColorClick,
  colors,
}) => {
  return (
    <div>
      <p className="text-sm font-[400] text-[#6B6F93]">Colors</p>
      <div className="flex gap-2 items-center mt-4">
        {colors.map((color) => (
          <div
            key={color.color}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              selectedColor === color.color ? "outline outline-2 outline-[#0235FF]" : ""
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorClick(color.color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
