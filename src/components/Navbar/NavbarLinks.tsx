import NavLink from "./NavLink";

const NavbarLinks = () => {
  return (
    <div className="flex space-x-8 items-center justify-center">
      <NavLink href="/">Buy $CSHOP</NavLink>
      <NavLink href="/staking">Staking</NavLink>
      <NavLink href="/products/auction">Product</NavLink>
      <NavLink href="/">CSHOP Card</NavLink>
      <NavLink href="/">Whitepaper</NavLink>
    </div>
  );
};

export default NavbarLinks;
