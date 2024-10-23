
import NavLink from "./NavLink";

const NavbarLinks = () => {
  return (
    <div className="flex space-x-8 items-center justify-center">
      <NavLink href="#">Buy $CSHOP</NavLink>
      <NavLink href="#">Staking</NavLink>
      <NavLink href="#">Product</NavLink>
      <NavLink href="#">CSHOP Card</NavLink>
      <NavLink href="https://shophekart.gitbook.io/shophekart">Whitepaper</NavLink>
    </div>
  );
};

export default NavbarLinks;