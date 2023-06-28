import React from "react";
import Link from "next/link";
import Image from 'next/image'
import Logo from "../public/images/Logo.png";
import styles from '../CSS/LandingHeader.module.css';
import { useRouter } from 'next/router';  

const Header: React.FC = () => {
  const router = useRouter();

  const goToAnalysis = () => {
    router.push('/analysis'); 
  }

  return (
    <header className={styles.header}>
      <Link href="/">
          <h1 className={styles.title}>
            <Image src={Logo} alt="Logo" height={36} width={36} />
            MindMap
            <span className={styles.beta}>beta</span>
          </h1>
      </Link>
      <button className={`${styles.btn} ${styles.transparent}`} onClick={goToAnalysis}>Try for Free</button>
    </header>
  );
};

export default Header;
