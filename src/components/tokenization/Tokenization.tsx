import React from "react";
import Cards from "./Cards";

const Tokenization = () => {
  const cardsData = [
    {
      totalRaise: "$5M",
      endsIn: "7 Days",
      salesType: "Private Sale",
      hostedBy: "Company X",
      backedBy: ["back1.png", "back2.png", "back3.png"],
      comments: "No Comments Yet",
    },
    {
      totalRaise: "$3M",
      endsIn: "10 Days",
      salesType: "Public Sale",
      hostedBy: "Company Y",
      backedBy: ["back1.png", "back2.png"],
      comments: "Few comments.",
    },
    {
      totalRaise: "$10M",
      endsIn: "5 Days",
      salesType: "Auction",
      hostedBy: "Company Z",
      backedBy: ["back1.png", "back3.png", "back4.png"],
      comments: "Highly anticipated.",
    },
  ];

  return (
    <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cardsData.map((cardValues, index) => (
        <Cards key={index} cardValues={cardValues} />
      ))}
    </div>
  );
};

export default Tokenization;
