"use client";
import React from "react";
import Cards from "./Cards";

const Tokenize = () => {
  return (
    <div className="px-8 md:px-12 py-8 min-h-[100vh] bg-[#000] bg-cover bg-center ">
      <p className="text-2xl font-bold mb-6 text-center text-white">
        What will we tokenize?
      </p>
      <Cards />
    </div>
  );
};

export default Tokenize;
