import React from "react";
import Cards from "./Cards";

const Tokenization = () => {
  const cardsData = [
    {
      imgLink: "/images/tokenization/comingsoon.svg",
      totalRaise: "N/A",
      endsIn: "N/A",
      salesType: "Tokenization",
      hostedBy: "N/A",
      backedBy: [],
      comments: "N/A",
    },
    {
      imgLink: "/images/tokenization/comingsoon.svg",

      totalRaise: "N/A",
      endsIn: "N/A",
      salesType: "Tokenization",
      hostedBy: "N/A",
      backedBy: [],
      comments: "N/A",
    },
    {
      imgLink: "/images/tokenization/comingsoon.svg",

      totalRaise: "N/A",
      endsIn: "N/A",
      salesType: "Tokenization",
      hostedBy: "N/A",
      backedBy: [],
      comments: "N/A",
    },
  ];

  return (
    <div className="grid mx-auto grid-cols-1 w-[90vw] md:w-full  gap-5 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
      {cardsData.map((cardValues, index) => (
        <Cards key={index} cardValues={cardValues} />
      ))}
    </div>
  );
};

export default Tokenization;
