import React from "react";
import styles from "../CSS/privacypolicy.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <h1 className= "text-2xl font-bold text-center mb-4 mt-6">Privacy Policy</h1>   
      <div className={`${styles.container} flex-grow`}>
        <div className="w-full text-center py-1"></div>
        <div className="flex flex-col items-center justify-center">
        <div className={`max-w-2xl ${styles.content}`}>
            <p style={{ marginBottom: '20px' }}>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from mymindmap.ca.</p>

            <p style={{ marginBottom: '20px' }}>1. Personal Information We Collect: When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about what websites or search terms referred you to the Site and information about how you interact with the Site.</p>

            <p style={{ marginBottom: '20px' }}>2. How Do We Use Your Personal Information? We use the information that we collect generally to fulfill any orders placed through the Site (including processing your payment information and providing you with invoices and/or order confirmations). Additionally, we use this information to: Communicate with you; Screen our orders for potential risk or fraud; and When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>

            <p style={{ marginBottom: '20px' }}>3. Sharing Your Personal Information: We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>

            <p style={{ marginBottom: '20px' }}>4. Your Rights: If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

            <p style={{ marginBottom: '20px' }}>5. Changes: We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>

            <p style={{ marginBottom: '20px' }}>6. Contact Us: For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at contact@mymindmap.ca or by mail using the details provided below: MindMap, 161 W Georgia St, Vancouver, BC, V6B 0K9, Canada</p>
          </div>
        </div>
      </div>
      <Footer className="bg-slate-900 text-white h-14" />
    </div>
  );
};

export default PrivacyPolicyPage;
