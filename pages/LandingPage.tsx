import React, { MouseEvent, useState } from "react";
import styles from './LandingPage.module.css';
import Footer from "../components/Footer";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [isFading, setIsFading] = useState(false);

  const handleClick = (e: MouseEvent) => {
    setIsFading(true);
    setTimeout(() => {
      onStart();
    }, 1000);
  };

  return (
    <div className={`${styles.container} min-h-screen flex flex-col justify-center`}>
<div
  className={`${styles.landing} h-screen w-screen flex flex-col justify-center items-center text-center`}
  style={{
    opacity: isFading ? 0 : 1,
    transition: "opacity 1s",
  }}
>
  <div className="self-center">
    <p className="text-xl mb-8">
      Welcome to MindMap! We&apos;re here to help you self reflect and take actionable steps to make life better. First, we need to ask you some questions...
    </p>
    <button
      className={styles.homebutton}
      onClick={handleClick} 
    >
      Begin
    </button>
  </div>
</div>
      <Footer className="row-start-3 bg-slate-900 text-white h-14" />
    </div>
  );
};

export default LandingPage;
