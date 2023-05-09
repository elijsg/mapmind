import React from "react";
import styles from "./AboutPage.module.css";
import Header from "./Header";

const AboutPage = () => {
  return (
    <>
      <Header/>
        <h1 className={styles.pageTitle}>About Us</h1>   
      <div className={`${styles.container} min-h-screen`}>
        <div className="w-full text-center py-6"></div>
        <div className="flex flex-col items-center justify-center">
          <div className={`max-w-2xl ${styles.content}`}>
            <p className="font-semibold text-lg mb-4">
              Welcome to MindMap, a personalized coaching and support platform
              designed to help you live your best life. Our mission is to
              empower you to take control of your life by providing personalized
              guidance and support to help you achieve your goals and improve
              your overall wellbeing.
            </p>

            <p className="mb-4">
              At MindMap, we believe that everyone has the potential to live
              their best life, but sometimes we all need a little help getting
              there. That&apos;s why we&apos;ve created a platform that combines
              cutting-edge technology with the expertise of our team of experts
              to provide you with the tools and resources you need to achieve
              your goals.
            </p>

            <p className="mb-4">
              Our platform uses artificial intelligence and machine learning to
              analyze your responses to our initial questions, and then
              provides you with personalized guidance and support based on your
              unique needs and preferences. We&apos;re constantly improving our
              platform to ensure that it provides the most relevant and
              effective support possible.
            </p>

            <p className="mb-4">
              We&apos;re passionate about helping our users live their best lives,
              and we&apos;re committed to providing you with the best possible
              experience. We&apos;re always here to answer your questions and provide
              support whenever you need it.
            </p>

            <p className="font-semibold">
              Thank you for choosing MindMap. Let&apos;s work together to achieve
              your goals and create a better future!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
