import React from "react";
import Cards from "./Cards";

const Tokenization = () => {
  return (
    <div className="grid mx-auto  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <Cards />
      <Cards />
      <Cards />
    </div>
  );
};

export default Tokenization;
