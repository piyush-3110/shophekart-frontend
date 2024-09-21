import Link from "next/link";

const NavbarLinks = () => {
  return (
    <div className="flex space-x-8">
      <Link href="#">Buy $CSHOP</Link>
      <Link href="#">Staking</Link>
      <Link href="#">Product</Link>
      <Link href="#">CSHOP Card</Link>
      <Link href="#">Whitepaper</Link>
    </div>
  );
};

export default NavbarLinks;