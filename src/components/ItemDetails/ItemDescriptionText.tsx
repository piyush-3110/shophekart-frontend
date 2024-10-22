import React from "react";

interface ItemDescriptionTextProps {
  description: string;
  details: string;
}

const ItemDescriptionText: React.FC<ItemDescriptionTextProps> = ({ description, details }) => {
  return (
    <div>
      <p className="text-sm font-[400] text-[#6B6F93] mb-2">{description}</p>
      {/* Render the 'details' as HTML */}
      <div
        className="text-sm font-[400] text-[#6B6F93]"
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </div>
  );
};

export default ItemDescriptionText;
