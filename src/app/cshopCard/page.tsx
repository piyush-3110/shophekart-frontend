import { Features } from "@/components/CshopCard/Features/Features";
import { Hero } from "@/components/CshopCard/Hero";
import { Works } from "@/components/CshopCard/Works/Works";
import Footer from "@/components/Footer/Footer";
const page = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Works />
      <Footer/>
    </div>
  );
};

export default page;
