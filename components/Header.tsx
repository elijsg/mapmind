import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="p-4">
      <Link href="/">
        <h1 className="header-title text-2xl font-semibold cursor-pointer">MindMap</h1>
      </Link>
    </header>
  );
};

export default Header;
