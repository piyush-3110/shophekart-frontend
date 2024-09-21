// components/Navbar.tsx
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-around shadow-md bg-[#fefffe] py-2 px-6">
      {/* Logo */}
      <div>
        <Image
          src="/images/shared/logo.png" // Replace with your logo path
          alt="Logo"
          className='h-[4rem]'
          width={160}
          height={180}
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
      <button className=" border-[#2546fe] text-[#2546fe] border-2 text-[2546fe] py-2 px-4 rounded hover:text-[#253384]">
        Connect Wallet
      </button>
    </nav>
  );
}
