import React, { useState, useEffect  } from 'react';
import AnimateSphereBackground from "../components/Animate";
import styles from "../styles/index.module.scss";
import { useRouter } from "next/router";
import Header from "../components/LandingHeader";
import Footer from "../components/Footer"; 
import SocialProof from "../components/SocialProof";
import Comparison from "../components/Comparison";
import TryNow from '../components/tryNow'


interface TypewriterTextProps {
  text: Array<{ part: string, bold?: boolean }>;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<Array<{ part: string, bold?: boolean }>>([]);
  const [index, setIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if(index < text.length) {
      const timeoutId = setTimeout(() => {
        if (charIndex < text[index].part.length) {
          setDisplayedText([
            ...displayedText,
            { part: text[index].part[charIndex], bold: text[index].bold },
          ]);
          setCharIndex(charIndex + 1);
        } else {
          setCharIndex(0);
          setIndex(index + 1);
        }
      }, 25);

      return () => clearTimeout(timeoutId);
    } else {
      setTypingDone(true);
    }
  }, [index, charIndex, displayedText, text]);

  return (
    <p className={typingDone ? `${styles.description} ${styles.done}` : styles.description}>
      {displayedText.map((item, idx) => item.bold 
        ? <strong key={idx}>{item.part}</strong> 
        : <span key={idx}>{item.part}</span>
      )}
    </p>
  );
};


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsFading(true);
    setTimeout(() => {
      router.push("/analysis");
    }, 1000);
  };

  return (
    <>
      <Header/>
    
      <div className={styles.wrapper}>
        <div className={styles.background} />
        <div className={styles.orbCanvas}>
          <AnimateSphereBackground />
        </div>
        <div className={styles.mainContainer}
         style={{
          opacity: isFading ? 0 : 1,
          transition: "opacity 1s",
        }}
          >
          <div className={styles.overlay}>
            <div className={styles.content}>
              <div className={styles.inner}
              
              >
                <h1 className={styles.title}>
                  Get better at
                  <span className={styles.textGradient}> anything</span>.
                </h1>
                
                <div style={{ height: '120px', width: '500px' }}>
                  <TypewriterText text={[
                    { part: "Take the guesswork out of self-improvement. Receive ", bold: false },
                    { part: "personalized", bold: true },
                    { part: ", actionable, advice and resources to help you hit your goals. Get help from an unbiased expert on ", bold: false },
                    { part: "any", bold: true },
                    { part: " topic.", bold: false }
                  ]} />
                </div>
                <div className={styles.btns}>
                  <button className={classNames(styles.btn, styles.transparent)}>
                    View Demo
                  </button>
  
                  <button className={classNames(styles.btn, styles.colors)} onClick={handleClick}>
                    <span>Begin</span>
                    <span className={styles.emoji}>🗺️</span>
                  </button>
                </div>
              </div>
              <div className={styles.imageContainer}>
                <img src="/images/Character.png" alt="Descriptive alt text" />
              </div>
            </div>
          </div>
          <Comparison leftImage="/images/Therapist.png" rightImage="/images/Upwards.png" />
          <SocialProof />
          <TryNow /> 
        </div>
        <Footer /> 
      </div>
    </>
  );
}
