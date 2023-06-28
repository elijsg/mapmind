import React from 'react';
import styles from '../CSS/tryNow.module.css';
import { useRouter } from 'next/router';
import Lottie from "lottie-react";
import animationData from "../public/images/arrow.json";
import Image from 'next/image'; 

export default function TryNow() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/analysis');
    }
    
    return (
        <div className={styles.tryNowContainer}>
            <div className={styles.tryNowSubContainer}>
                <div className={styles.tryNowBlockLeft}>
                    <p className={styles.tryNowText}>
                      <span>MindMap</span> assists 
                      <span className={styles.boldWord}> anyone</span> discover their full potential. Sometimes we need a little help finding our true capability.
                    </p>
                    <p className={styles.tryNowText}>
                      Our <span className={styles.gradientWord}>next-gen</span> analysis provides a combination of introspection and an unbiased view from an outside perspective to propel you to new heights in <span className={styles.boldWord}>any</span> area of life. Add in <span className={styles.gradientWord}>actionable steps</span> and the best resources and you have a recipe for success.
                    </p>
                </div>
                <div className={styles.tryNowBlock}>
                    <div className={styles.tryNowImage}>
                        <Image src="/images/try.png" alt="Jump" width={500} height={300} />
                    </div>
                </div>
                <div className={styles.tryNowBlockRight}>
                    <p className={styles.tryNowTextRight}>
                        <span>Join others from around the world on the journey to becoming the </span> 
                        <span className={styles.gradientWord}> best version of yourself. </span>
                    </p>
                    <div className={styles.arrowAndButton}>
                        <Lottie animationData={animationData} style={{ width: 50, height: 50 }} />
                        <button className={styles.btn} onClick={handleClick}>Try Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
