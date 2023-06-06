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
        <h1 className="header-title text-3xl font-semibold cursor-pointer">MindMap</h1>
      </Link>
    </header>
  );
};

export default Header;
