import React, { MouseEvent, useState } from "react";
import styles from '../CSS/LandingPage.module.css';
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Home: React.FC = () => {
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    setIsFading(true);
    setTimeout(() => {
      router.push("/analysis");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className={`${styles.landing} flex-grow w-full flex flex-col justify-center items-center text-center`}>
        <div
          style={{
            opacity: isFading ? 0 : 1,
            transition: "opacity 1s",
          }}
        >
          <div className="self-center">
            <p className="text-[50px] font-extrabold mb-3">
              Get better at anything.
            </p>
            <p className="text-xl mb-6">
              Receive personalized guidance on any area of life in a matter of minutes.
            </p>
            <button
              className={styles.homebutton}
              onClick={handleClick}
            >
              Begin
            </button>
          </div>
        </div>
      </div>
      <Footer className="bg-slate-900 text-white h-14" />
    </div>
  );  
};

export default Home;
