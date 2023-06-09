import React from "react";
import Header from "../components/Header";
import styles from "../CSS/tos.module.css"
import Footer from "../components/Footer";

const TermsOfService = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header/>
        <h1 className= "text-2xl font-bold text-center mb-4 mt-6">Privacy Policy</h1>   
        <div className={`${styles.container} flex-grow`}>
          <div className="w-full text-center py-1"></div>
          <div className="flex flex-col items-center justify-center">
          <div className={`max-w-2xl ${styles.content}`}>
              <p style={{ marginBottom: '20px' }}><b>Introduction: </b>Welcome to MindMap. By using our service, you are agreeing to these terms. Please read them carefully.</p>
  
              <p style={{ marginBottom: '20px' }}><b>Using Our Services: </b>You must follow any policies made available to you within the services. Do not misuse our services, for example, do not interfere with our services or try to access them using a method other than the interface and the instructions that we provide. </p>
  
              <p style={{ marginBottom: '20px' }}><b>Privacy and Copyright Protection: </b>MindMap&apos;s privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that MindMap can use such data in accordance with our privacy policies.</p>
  
              <p style={{ marginBottom: '20px' }}><b>Content in our Services: </b>The advice given by our application is for informational purposes only and is not intended to replace the advice of a healthcare professional. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.</p>
  
              <p style={{ marginBottom: '20px' }}><b>Modifying and Terminating our Services: </b>We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.</p>
  
              <p style={{ marginBottom: '20px' }}><b>Liability for our Services: </b>TO THE EXTENT PERMITTED BY LAW, MINDMAP WILL NOT BE RESPONSIBLE FOR LOST PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES, OR INDIRECT, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES.</p>
  
              <p style={{ marginBottom: '20px' }}><b>About these Terms: </b>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly.</p>
            </div>
          </div>
        </div>
        <Footer className="bg-slate-900 text-white h-14" />
      </div>
    );
  };
  
  export default TermsOfService;