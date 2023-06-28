import React, { useState, useEffect } from 'react';
import styles from '../CSS/comparison.module.css';
import Image from 'next/image';
import { Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';

interface ComparisonProps {
  leftImage: string;
  rightImage: string;
}

const Comparison: React.FC<ComparisonProps> = ({ leftImage, rightImage }) => {
    
    const [refLeft, inViewLeft] = useInView({
        triggerOnce: true,
        threshold: 0.1, 
      });
      
      const [refRight, inViewRight] = useInView({
        triggerOnce: true,
        threshold: 0.1, 
      });
  
  
      return (
        <div className={styles.comparisonContainer}>
          <div className={styles.comparisonSubContainer}>
            <h2 className={styles.title}>Coaches, trainers, and therapists:</h2>
            <div ref={refLeft} className={inViewLeft ? `${styles.body} ${styles.fadeIn}` : styles.body}>
              <ul>
                <li className={styles.emoji}>Expensive 💰</li>
                <li className={styles.regular}>These services often cost $100/hr or more.</li>
                <li className={styles.emoji}>Biased 🗣️</li>
                <li className={styles.regular}>It's impossible to find someone with a purely objective view.</li>
                <li className={styles.emoji}>Time-consuming ⏰</li>
                <li className={styles.regular}>It can take months, even years, to reach your goals.</li>
              </ul>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={leftImage} alt="Left Image" width={350} height={350} />
            </div>
          </div>
          <div className={styles.comparisonDivider} />
          <div className={styles.comparisonSubContainer}>
            <h2 className={styles.title}>MindMap:</h2>
            <div ref={refRight} className={inViewRight ? `${styles.body} ${styles.fadeIn}` : styles.body}>
              <ul>
                <li className={styles.emoji}>Free ✅</li>
                <li className={styles.regular}>Receive advice for absolutely zero cost.</li>
                <li className={styles.emoji}>Personalized without bias 🎯</li>
                <li className={styles.regular}>Our advanced analysis based purely on real world data.</li>
                <li className={styles.emoji}>Fast and easy to use 🏃🏽</li>
                <li className={styles.regular}>Get your MindMap in 5 minutes or less.</li>
              </ul>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={rightImage} alt="Right Image" width={350} height={350} />
            </div>
          </div>
        </div>
      )
      
      
      
  }
  
export default Comparison;
