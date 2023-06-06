import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../CSS/app.module.css';

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/sendfeedback', {
        email: 'feedback@mymindmap.ca',
        subject: 'New Feedback Submitted',
        text: `From: ${name}\nEmail: ${email}\nFeedback: ${feedback}`
      });
      
      console.log(response.data.message);
      setShowPopup(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    setName("");
    setEmail("");
    setFeedback("");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4">
        <div className="w-1/2 mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 mt-8">Contact</h2>
          <p className="text-center mb-4">We value your feedback! Please share any comments or concerns below and we will address them the best we can.</p>
          <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-full mt-2 focus:bg-slate-900 focus:text-white"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your Email"
              className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-full mt-2 focus:bg-slate-900 focus:text-white"
              required
            />
            <textarea
              name="feedback"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Your Feedback"
              className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-full mt-2 h-80 focus:bg-slate-900 focus:text-white"
              required
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${styles.buttonWrapper} shadow__btn`}
            >
              Submit
            </button>
          </form>
          </div>
      </div>
      <Footer className="bg-slate-900 text-white h-14" />
      {showPopup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-slate-900 text-white border border-gray-700 rounded p-6 w-1/2 max-w-lg text-center flex flex-col items-center">
      <p>Thank you for your feedback! Our team will review this as soon as possible.</p>
      <button onClick={handleClosePopup} className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${styles.buttonWrapper} shadow__btn`}>Close</button>
    </div>
  </div>
)}
    </div>
  );
};

export default ContactPage;