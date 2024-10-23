import React from "react";

import { Hero } from "@/components/Homepage/Hero/Main/Hero";
import { Tokenomics } from "@/components/Homepage/Tokenomics/Tokenomics";
import { Roadmap } from "@/components/Homepage/Roadmap/Roadmap";
import Partners from "@/components/Homepage/Partners/Partners";
import Footer from "@/components/Footer/Footer";
const page = () => {
  return (
    <div className="bg-[#f1f4ff] w-full overflow-x-hidden">
      <Hero />
      <Tokenomics />
      <Roadmap />
      <Partners />
      <Footer/>
    </div>
  );
};

export default page;
