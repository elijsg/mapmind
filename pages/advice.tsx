import React, { useEffect, useState, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { extractRelevantTopics } from './extract';
import { searchTopics } from './search';
import axios from 'axios';

const AdvicePage = () => {
  const globalState = useContext(GlobalStateContext);
  const [advice, setAdvice] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      const adviceFromGlobalState = globalState.advice;

      setAdvice(adviceFromGlobalState);

      const extractedTopics = await extractRelevantTopics(adviceFromGlobalState);
      setTopics(extractedTopics);

      const results = await searchTopics(extractedTopics);
      setSearchResults(results);
    };

    fetchAdvice();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    await sendAdviceEmail(advice, searchResults, email);
  
    setShowEmailPopup(false);
    setEmail("");
  };  

  const sendAdviceEmail = async (advice: string, searchResults: any[], email: string) => {
    try {
      const searchResultsString = searchResults.map(result => JSON.stringify(result)).join('\n');
  
      const response = await axios.post('/api/send-email', {
        email: email,
        subject: 'New Advice Generated',
        text: `${advice}\n\nSearch Results:\n${searchResultsString}`
      });
      console.log(response.data.message);
    } catch (error) {
      console.log('Error sending advice email:', error);
    }
  };  

  return (
    <div>
      <h1>Advice</h1>
      <p>{advice}</p>
      <h2>Topics</h2>
      {topics.map((topic, index) => (
        <p key={index}>{topic}</p>
      ))}
      <h2>Search Results</h2>
      {searchResults.map((result, index) => (
        <p key={index}>{JSON.stringify(result)}</p>
      ))}
      <button onClick={() => setShowEmailPopup(true)}>Get Personalized Support</button>
      {showEmailPopup && (
        <div>
          <form onSubmit={handleEmailSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowEmailPopup(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdvicePage;
