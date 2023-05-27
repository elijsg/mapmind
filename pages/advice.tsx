import React, { useEffect, useState, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { extractRelevantTopics } from './extract';
import { searchTopics } from './search';

const AdvicePage = () => {
  const globalState = useContext(GlobalStateContext);
  const [advice, setAdvice] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);  
  
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
    </div>
  );
}

export default AdvicePage;
