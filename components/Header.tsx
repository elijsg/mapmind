import React from "react";
import Link from "next/link";
import Image from 'next/image'
import Logo from "../public/images/Logo.png";

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 container mx-auto px-4">
      <Link href="/">
          <Image src={Logo} alt="Logo" height={42} width={42} />
      </Link>
      <Link href="/">
        <h1 className="header-title text-3xl font-semibold cursor-pointer relative">
          MindMap
          <span className="text-sm absolute top-0 right-0 transform -translate-y-1/2" style={{ left: '100%', marginLeft: '4px' }}>beta</span>
        </h1>
      </Link>
    </header>
  );
};

export default Header;
