import { Features } from "@/components/CshopCard/Features/Features"
import { Hero } from "@/components/CshopCard/Hero"
import { Works } from "@/components/CshopCard/Works/Works"

const page = () => {
  return (
    <div>
        <Hero/>
        <Features/>
        <Works/>
    </div>
  )
}

export default page