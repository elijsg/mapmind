import React, { useEffect, useState, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { extractRelevantTopics } from './extract';
import { searchTopics } from './search';
import axios from 'axios';
import Header from '../components/Header';
import styles from '../CSS/app.module.css';

const AdvicePage = () => {
  const globalState = useContext(GlobalStateContext);
  const [advice, setAdvice] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [showSupportButton, setShowSupportButton] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResultsPopup, setShowSearchResultsPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      const adviceFromGlobalState = globalState.advice;

      setAdvice(adviceFromGlobalState);

      const extractedTopics = await extractRelevantTopics(adviceFromGlobalState);
      setTopics(extractedTopics);

      const results = await searchTopics(extractedTopics);
      setSearchResults(results);

      setShowSupportButton(true);
    };

    fetchAdvice();
  }, []);

  const handleGetPersonalizedAdvice = async () => {
    const extractedTopics = await extractRelevantTopics(advice);
    setTopics(extractedTopics);

    const results = await searchTopics(extractedTopics);
    setSearchResults(results);

    setShowSearchResultsPopup(true);
}

const handleSendToMeClick = () => {
  setShowEmailPopup(true);
}

const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const searchResultsString = searchResults.map(result => JSON.stringify(result)).join('\n');

  try {
      const response = await axios.post('/api/send-email', {
          email: email,
          subject: 'New Advice Generated',
          text: `${advice}\n\n Search Results:\n${searchResultsString}`
      });
      console.log(response.data.message);
  } catch (error) {
      console.log('Error sending advice email:', error);
  }

  setShowEmailPopup(false);
  setEmail("");
}

return (
  <div>
    <Header />
    <div className="container mx-auto px-4">
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
      {topics.map((topic, index) => (
        <p key={index}>{topic}</p>
      ))}
      {showSearchResultsPopup && (
        <div>
          <h2>Search Results</h2>
          {searchResults.map((result, index) => (
            <p key={index}>{JSON.stringify(result)}</p>
          ))}
          <button onClick={handleSendToMeClick}>Send These To Me!</button>
        </div>
      )}
    </div>
    {showEmailPopup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <form
      onSubmit={handleEmailSubmit}
      className="bg-slate-900 text-white border border-gray-700 rounded p-6 w-1/2 max-w-lg"
    >
      <h2 className="text-xl text-center mb-4">Get resources that help you <b><i>actually</i></b> reach your goals.</h2>
      <p className="mb-4 text-center">Enter your email below to get your personalized advice and a list of resources to help you hit your goals.</p>
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
  </div>
)};


export default AdvicePage;
