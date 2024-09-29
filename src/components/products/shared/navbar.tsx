import Image from "next/image";
import logo from "../../../../public/images/shared/logo.png";
import UserProfileDropdownButton from "@/components/shared/UserProfileDropdownButton";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-5 gap-8 w-full items-center justify-around">
      <div className="h-14 w-fit">
        <Image src={logo} alt="logo" className="object-contain w-full h-full" />
      </div>
      <div className="col-span-2">
        <Searchbar />
      </div>
      <div className="flex items-center gap-4 w-fit">
        <span>News</span>
        <Image
          src={"/icons/productNavbar/cartIcon.svg"}
          alt="cart"
          width={16}
          height={16}
          className="h-4 object-contain w-fit"
        />
        <Image
          src={"/icons/productNavbar/translateIcon.svg"}
          alt="cart"
          width={16}
          height={16}
          className="h-4 object-contain w-fit"
        />
      </div>
      <div className="w-fit">
        <UserProfileDropdownButton />
      </div>
    </nav>
  );
};

export default Navbar;
