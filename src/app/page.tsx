import React from "react";

import { Hero } from "@/components/Homepage/Hero/Main/Hero";
import { Tokenomics } from "@/components/Homepage/Tokenomics/Tokenomics";
import { Roadmap } from "@/components/Homepage/Roadmap/Roadmap";
import Partners from "@/components/Homepage/Partners/Partners";
const page = () => {
  return (
    <div className="bg-[#f1f4ff]  ">
      <Hero />
      <Tokenomics />
      <Roadmap />
      <Partners />
    </div>
  );
};

export default page;
