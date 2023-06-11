import React, { useEffect, useState, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { extractRelevantTopics } from '../functions/extract';
import { searchTopics } from '../functions/search';
import axios from 'axios';
import Header from '../components/Header';
import styles from '../CSS/app.module.css';
import Footer from '../components/Footer';

const AdvicePage = () => {
  const globalState = useContext(GlobalStateContext);
  const [advice, setAdvice] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [showSupportButton, setShowSupportButton] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResultsPopup, setShowSearchResultsPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);


  useEffect(() => {
    if (globalState.advice) {
      localStorage.setItem('advice', globalState.advice);
    }
  }, [globalState.advice]);
  

  useEffect(() => {
    const fetchAdvice = async () => {
      console.log("fetchAdvice is being called");
      let adviceFromGlobalState = globalState.advice || localStorage.getItem('advice') || '';
  
      if (!adviceFromGlobalState) {
      }
  
      setAdvice(adviceFromGlobalState);
  
      const extractedTopics = await extractRelevantTopics(adviceFromGlobalState);
      setTopics(extractedTopics);
  
      const results = await searchTopics(extractedTopics);
      setSearchResults(results);
  
      setShowSupportButton(true);
    };
  
    fetchAdvice();
  }, []);
  
  
const handleSendToMeClick = () => {
  setShowEmailPopup(true);
}

const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let searchResultsHTML = '';

  for (let i = 0; i < searchResults.length; i++) {
    const [title, link] = searchResults[i].split('\n');
    searchResultsHTML += `<p style="text-align:center; color:black; font-family: 'Inter', sans-serif;"><strong>${title}</strong></p>
                          <p style="text-align:center; color:black; font-family: 'Inter', sans-serif;"><a href="${link}">${link}</a></p><br>`;
  }
    
  const closingSentence = '<p style="text-align:center; color:black; font-family: \'Inter\', sans-serif;"><strong>Thank you for using MindMap. We hope this advice helps you become a better version of yourself!</strong></p>';

  const address = '<p style="text-align:center; color:black; font-family: \'Inter\', sans-serif;">MindMap, 161 W Georgia St, Vancouver, BC, V6B 0K9.</p>';

  const title = '<h1 style="text-align:center; font-size: 1.5em; color:black; font-family: \'Inter\', sans-serif;"><strong>Here\'s your advice:</strong></h1><br>';
  const resourcesTitle = '<h1 style="text-align:center; font-size: 1.5em; color:black; font-family: \'Inter\', sans-serif;"><strong>Here are some resources to help you accomplish your goals:</strong></h1><br>';
    
  try {
    const response = await axios.post('/api/send-email', {
      email: email,
      subject: 'Your MindMap',
      html: `${title}<p style="text-align:center; color:black; font-family: 'Inter', sans-serif;">${advice}</p><br>${resourcesTitle}${searchResultsHTML}<br>${closingSentence}<br>${address}`,
    });
    
    console.log(response.data.message);
    setIsEmailSent(true); 
  } catch (error) {
    console.log('Error sending advice email:', error);
  }

  setShowEmailPopup(false);
  setEmail("");
};

return (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="flex-grow container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-4 mt-8">Advice</h2>
      <p className={`bg-slate-900 ${advice} text-white border border-gray-700 px-4 py-2 rounded mb-4 text-center`}>{advice}</p>
      <div className="flex justify-center">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${styles.buttonWrapper} shadow__btn`}
          onClick={() => setShowEmailPopup(true)}
        >
          Get Personalized Support
        </button>
      </div>
      <p className="text-center font-semibold mt-20">Have questions, comments, or anything else or your mind? Please let us know below!</p>
      <div className="flex justify-center mt-4">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${styles.buttonWrapper} feedback__btn`}
          onClick={() => window.location.href='/contact'}
        >
          Send Feedback
        </button>
      </div>
      {/* 
{topics.map((topic, index) => (
  <p key={index}>{topic}</p>
))}
*/}
      {showSearchResultsPopup && (
        <div>
          {searchResults.map((result, index) => (
            <p key={index}>{JSON.stringify(result)}</p>
          ))}
        </div>
      )}
    </div>
    {showEmailPopup && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form
          onSubmit={handleEmailSubmit}
          className="bg-slate-900 text-white border border-gray-700 rounded p-6 w-full max-w-lg"
        >
          <h2 className="text-xl text-center mb-4">Get resources that help you <b><i>actually</i></b> reach your goals.</h2>
          <p className="mb-4 text-center">Enter your email below to get a copy of your personalized advice and a list of resources to help you hit your goals.</p>
          <p className="mb-4"> Email:</p>
          <input
            type="email"
            required
            className="bg-gray-200 text-gray-900 border border-gray-300 rounded px-4 py-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
              onClick={() => {
                setShowEmailPopup(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )}
        {isEmailSent && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-slate-900 text-white border border-gray-700 rounded p-6 w-full max-w-lg">
          <h2 className="text-xl text-center mb-4">Email Sent!</h2>
          <p className="mb-4 text-center">Your advice and resources have been sent to your email.</p>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsEmailSent(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    <Footer className="bg-slate-900 text-white h-14" />
  </div>
)};



export default AdvicePage;
