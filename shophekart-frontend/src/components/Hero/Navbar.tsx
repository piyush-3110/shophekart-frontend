// components/Navbar.tsx
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-around bg-white py-4 px-6">
      {/* Logo */}
      <div>
        <Image
          src="/logo.png" // Replace with your logo path
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Nav Links */}
      <div className="flex space-x-8">
        <a href="#" className="text-black hover:text-blue-500">
          Buy $CSHOP
        </a>
        <a href="#" className="text-black hover:text-blue-500">
          Staking
        </a>
        <a href="#" className="text-black hover:text-blue-500">
          Product
        </a>
        <a href="#" className="text-black hover:text-blue-500">
          CSHOP Card
        </a>
        <a href="#" className="text-black hover:text-blue-500">
          Whitepaper
        </a>
      </div>

      {/* Connect Wallet Button */}
      <button className="border border-[#2546fe] text-black py-2 px-4 rounded hover:bg-[#2546fe] hover:text-white">
        Connect Wallet
      </button>
    </nav>
  );
}
