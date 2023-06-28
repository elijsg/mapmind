import React from "react";
import Link from "next/link";
import Image from 'next/image'
import Logo from "../public/images/Logo.png";
import styles from '../CSS/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>
          <Image src={Logo} alt="Logo" height={36} width={36} />
          MindMap
          <span className={styles.beta}>beta</span>
        </h1>
      </Link>
    </header>
  );
};

export default Header;
