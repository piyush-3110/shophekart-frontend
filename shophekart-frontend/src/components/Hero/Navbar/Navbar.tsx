// components/Navbar.tsx
import Image from 'next/image';
import NavbarLinks from './NavbarLinks';
import ConnectButton from './ConnectButton';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-around shadow-md bg-[#fefffe] py-2 px-6">
      {/* Logo */}
      <div>
        <Image
          src="/images/shared/logo.png" // Replace with your logo path
          alt="Logo"
          className="h-[4rem]"
          width={160}
          height={180}
        />
      </div>

      {/* Navigation Links */}
      <NavbarLinks />

      {/* Connect Wallet Button */}
      <ConnectButton />
    </nav>
  );
}
