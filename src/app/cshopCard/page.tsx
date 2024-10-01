import { Features } from "@/components/CshopCard/Features/Features"
import { Hero } from "@/components/CshopCard/Hero"
import { Works } from "@/components/CshopCard/Works/Works"
import FloatingNavbar from "@/components/Navbar/FloatingNavbar"

const page = () => {
  return (
    <div>
          <FloatingNavbar />

        <Hero/>
        <Features/>
        <Works/>
    </div>
  )
}

export default page