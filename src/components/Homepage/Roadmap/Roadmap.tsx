"use client";

import Image from "next/image";

export const Roadmap = () => {
  return (
    <div className="bg-black lg:min-h-[80vh] flex flex-col items-center lg:justify-center py-10 gap-6 relative">
      <h1 className="text-lg md:text-3xl text-white font-semibold mb-4">
        RoadMap
      </h1>

      {/* Roadmap Image */}
      <Image
        src="/images/homepage/roadmap.png"
        height={1024}
        width={1024}
        className="w-full h-auto mt-24" // Margin to avoid overlap
        alt="Roadmap"
      />
    </div>
  );
};
