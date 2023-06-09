import React from "react";
import styles from "../CSS/AboutPage.module.css";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
        <h1 className= "text-2xl font-bold text-center mb-4 mt-6">About Us</h1>   
      <div className={`${styles.container} flex-grow`}>
        <div className="w-full text-center py-1"></div>
        <div className="flex flex-col items-center justify-center">
          <div className={`max-w-2xl ${styles.content}`}>
            <p className="font-semibold text-center text-lg mb-4">
              MindMap is a personalized coaching and support platform
              designed to help you live your best life. Our mission is to
              empower you to take control of your life by providing personalized
              guidance and support to help you achieve your goals and improve
              your overall wellbeing.
            </p>

            <p className="mb-4 text-center">
              At MindMap, we believe that everyone has the potential to live
              their best life, but sometimes we all need a little help getting
              there. That&apos;s why we&apos;ve created a platform that combines
              cutting-edge technology with insights from experts
              to provide you with the tools and resources you need to achieve
              your goals.
            </p>

            <p className="mb-4 text-center">
              Our platform uses artificial intelligence and machine learning to
              analyze your responses to questions, and then
              provides you with personalized guidance and support based on your
              unique needs and preferences. We&apos;re constantly improving our
              platform to ensure that it provides the most relevant and
              effective support possible.
            </p>

            <p className="mb-4 text-center">
              We&apos;re passionate about helping our users live their best lives,
              and we&apos;re committed to providing you with the best possible
              experience. We&apos;re always here to answer your questions and provide
              support whenever you need it.
            </p>

            <p className="font-semibold text-center">
              Thank you for choosing MindMap. Let&apos;s work together to achieve
              your goals and create a better future!
            </p>
            </div>
  <div>
    <Link href="/privacypolicy">
      <button className="mt-4 font-bold focus:outline-none">Privacy Policy</button>
    </Link>
    <span className="mx-2">|</span>
    <Link href="/termsofservice">
      <button className="mt-4 font-bold focus:outline-none">Terms of Service</button>
    </Link>
  </div>
</div>
</div>
<Footer className="bg-slate-900 text-white h-14" />
</div>
);

};

export default AboutPage;
