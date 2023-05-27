import { useState, useCallback, FormEvent, memo, useEffect, useRef} from 'react';
import styles from '../CSS/app.module.css';
import { Configuration, OpenAIApi } from "openai";
import Header from '../components/Header';
import { extractRelevantTopics } from './extract';
import { searchTopics } from './search';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const initialQuestions = [
  "What are the top 3 priorities in your life right now?",
  "Do you feel like you have a good work-life balance? Why or why not?",
  "What habits or routines do you currently have in place that support your goals and priorities?",
  "Are there any habits or routines that you believe are holding you back from achieving your goals? If so, what are they?",
  "How do you manage stress or difficult situations in your life?",
  "What do you believe are your personal strengths, and how do they help you achieve your goals?",
  "If you could change one decision you made in the past, what would it be and why? How do you think it would impact your life today?",
  "Imagine you have a year off from all obligations and unlimited resources. How would you spend that time?",
  "If you were to describe your life as a book without using your name, what would the title and the main theme be? What would you like the next chapter to be about?",
  "Think about a person you admire or who inspires you. What qualities do they possess that you would like to cultivate in yourself?",
];

function Home(): JSX.Element {
  const [answers, setAnswers] = useState<Array<string>>(Array(10).fill(''));
  const [plan, setPlan] = useState('');
  const [isAssessmentConfirmed, setIsAssessmentConfirmed] = useState<boolean | null>(null);
  const [additionalAnswers, setAdditionalAnswers] = useState<Array<string>>(Array(6).fill(''));
  const [generalAnswers, setGeneralAnswers] = useState<Array<string>>(Array(5).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [focusedIndexGeneral, setFocusedIndexGeneral] = useState<number | null>(null);
  const [isAssessmentSubmitted, setIsAssessmentSubmitted] = useState(false);
  const [showInitialAssessment, setShowInitialAssessment] = useState(true);
  const [actionableAdvice, setActionableAdvice] = useState('');
  const [showActionableAdvice, setShowActionableAdvice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [initialAssessment, setInitialAssessment] = useState('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSupportButton, setShowSupportButton] = useState(false);

  const handleInputChange = useCallback(
    (index: number, value: string, type: string) => {
      if (type === 'initial') {
        setAnswers(prevAnswers => {
          const newAnswers = [...prevAnswers];
          newAnswers[index] = value;
          return newAnswers;
        });
      } else if (type === 'additional') {
        setAdditionalAnswers(prevAnswers => {
          const newAdditionalAnswers = [...prevAnswers];
          newAdditionalAnswers[index] = value;
          return newAdditionalAnswers;
        });
      } else if (type === 'general') {
        setGeneralAnswers(prevAnswers => {
          const newGeneralAnswers = [...prevAnswers];
          newGeneralAnswers[index] = value;
          return newGeneralAnswers;
        });
      }
    },
    []
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
  
    const initialQA = answers.map((answer, index) => `Q${index + 1}: ${initialQuestions[index]}\nA${index + 1}: ${answer}`).join('\n');
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.95,
      max_tokens: 400,
      messages: [
        { role: "system", content: "You are a life coach analyzing my life based on my answers to a set of questions." },
        { role: "system", content: "I am a client who is seeking personalized guidance and support in my life based on my answers to a set of questions." },
        { role: "user", content: `Analyze these answers:\n\n${initialQA}`},
        { role: "user", content: `Consider these 6 areas of life: career development, personal growth, health and wellness, financial management, relationships, and education`},
        { role: "system", content: "Based on my answers, what are the top 3 areas of life that could benefit from the most guidance and support? Please provide your answer in a numbered list. Please be as creative as possible and provide ideas that they may not have thought of before"},
      ],
    });
  
    const plan = completion.data.choices?.[0]?.message?.content?.trim() || '';
    setPlan(plan);
    setInitialAssessment(plan);
    setIsLoading(false);
    setIsAssessmentSubmitted(true);
  };
  
  const generateAdditionalQuestions = async (assessment: string) => {
    try {
      const initialQA = answers.map((answer, index) => `Q${index + 1}: ${initialQuestions[index]}\nA${index + 1}: ${answer}`).join('\n');
  
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", //CHANGE BACK TO 4
        temperature: 0.95,
        max_tokens: 300,
        messages: [
          { role: "system", content: "You are a life coach asking me questions to assess my life." },
          { role: "user", content: `Analyze these answers to the initial set of questions:\n\n${initialQA}` },
          { role: "user", content: `Consider the fact that I agree with your initial assessment which was generated based on my answers to these initial questions: "${initialAssessment}"` },
          { role: "system", content: "Generate 6 additional questions related to my answers to the initial set of questions. Please provide them in a numbered list with the only text in your response being the questions themselves." },
        ],
      });
  
      const questions = completion.data.choices?.[0]?.message?.content?.split('\n').filter((question: string) => question.trim() !== '') || [];
      setGeneratedQuestions(questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
      alert('An error occurred while fetching additional questions. Please try again.');
    }
  };   

  const handleAdditionalAnswersSubmit = async (additionalAnswers: Array<string>) => {
    setIsLoading(true);
    try {
      const initialQA = answers.map((answer, index) => `Q${index + 1}: ${initialQuestions[index]}\nA${index + 1}: ${answer}`).join('\n');
      const additionalQA = additionalAnswers.map((answer, index) => `Q${index + 11}: ${generatedQuestions[index]}\nA${index + 11}: ${answer}`).join('\n');

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", //CHANGE BACK TO 4
        temperature: 0.95,
        max_tokens: 400,
        messages: [
          { role: "system", content: "You are a life coach providing me with advice on how I can make my life better based on my answers to two sets of questions and my agreement with an assessment of my life." },
          { role: "user", content: `Analyze my answers to an initial set of questions:\n\n${initialQA}` },
          { role: "user", content: `Consider the fact that I agree with your initial assessment which was generated based on my answers to these initial questions: "${initialAssessment}"` },
          { role: "user", content: `Analyze my answers to the additional questions:\n\n${additionalQA}` },
          { role: "system", content: "Based on my answers to both sets of questions and my agreement with your assessment, what are some actionable steps I can take to improve the areas identified in the initial assessment?" },
        ],
      });

      const advice = completion.data.choices?.[0]?.message?.content?.trim() || '';
      setActionableAdvice(advice);
      setShowSupportButton(true);

    } catch (error) {
      console.error('Error sending additional answers:', error);
      alert('An error occurred while processing your additional answers. Please try again.');
    } finally {
      setIsLoading(false);
    }
};


  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const formattedResults = JSON.stringify(searchResults, null, 2);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          subject: 'Your Personalized Support Information', 
          text: `Here is your advice:\n\n${actionableAdvice}\n\nHere are some additional resources:\n\n${formattedResults}`
        }),
      });
  
      if (response.ok) {
        alert("Email sent successfully");
        setShowEmailPopup(false);
        setEmail('');
      } else {
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
};

  const AdditionalQuestions = memo(() => {
    const [localAdditionalAnswers, setLocalAdditionalAnswers] = useState(additionalAnswers);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    useEffect(() => {
      if (focusedIndex !== null && inputRefs.current[focusedIndex]) {
        inputRefs.current[focusedIndex]?.focus();
      }
    }, [focusedIndex]);
  
    const handleAdditionalSubmit = (e: FormEvent) => {
      e.preventDefault();
      handleAdditionalAnswersSubmit(localAdditionalAnswers);
      setShowActionableAdvice(true);
    };
  
    const handleLocalInputChange = (index: number, value: string) => {
      const newAnswers = [...localAdditionalAnswers];
      newAnswers[index] = value;
      setLocalAdditionalAnswers(newAnswers);
    };

AdditionalQuestions.displayName = 'AdditionalQuestions';
  
return (
  <div className="container mx-auto px-4">
    <form onSubmit={handleAdditionalSubmit}>
      {generatedQuestions.map((question, index) => (
        <div key={index}>
          <label htmlFor={`additional-question-${index + 1}`}>{question}</label>
          <input
            type="text"
            id={`additional-question-${index + 1}`}
            className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-full mt-2"
            value={localAdditionalAnswers[index]}
            key={index}
            ref={(input) => inputRefs.current[index] = input}
            onChange={(e) => handleLocalInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <div className={styles.buttonWrapper}>
        <button type="submit" className="shadow__btn mt-4">
          Submit Additional Answers
        </button>
      </div>
    </form>
  </div>
);
});
  
  const GeneralQuestions = () => {
    const generalQuestions = [
      "What are some specific goals or aspirations you have for the next year?",
      "In what situations do you tend to feel the most stressed or overwhelmed?",
      "What are some activities or hobbies that you currently enjoy or would like to try?",
      "How do you typically manage your finances?",
      "What is your current living situation like, and are there any changes you would like to make in the future?",
    ];

    const inputRefsGeneral = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      if (focusedIndexGeneral !== null && inputRefsGeneral.current[focusedIndexGeneral]) {
        inputRefsGeneral.current[focusedIndexGeneral]?.focus();
      }
    }, [focusedIndexGeneral]);
  
    return (
      <form onSubmit={handleSubmit}>
        {generalQuestions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`general-question-${index + 1}`}>{question}</label>
            <input
              type="text"
              id={`general-question-${index + 1}`}
              value={generalAnswers[index]}
              ref={(input) => inputRefsGeneral.current[index] = input}
              className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-full mt-2"
              onFocus={() => setFocusedIndexGeneral(index)}
              onChange={(e) => handleInputChange(index, e.target.value, 'general')}
            />
          </div>
        ))}
        <div className={styles.buttonWrapper}>
  <button type="submit" className="shadow__btn mb-4 mt-2">
    Analyze Answers
  </button>
</div>
      </form>
    );
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className={styles.loader}>Thinking...</div>
      ) : (
        <div className="container mx-auto px-4">
          {!isAssessmentSubmitted && !isLoading && (
            <>
              <p className="text-center text-sm text-gray-400 mt-4 mb-6">
                The help we&apos;re able to provide depends entirely on how much you let us know! The more details you share, the better our help will be. Please share as much as you&apos;re comfortable with.
              </p>
              <form onSubmit={handleSubmit}>
                {initialQuestions.map((question, index) => (
                  <div key={index}>
                    <label htmlFor={`question-${index + 1}`}>{question}</label>
                    <input
                      type="text"
                      id={`question-${index + 1}`}
                      className="bg-slate-900 text-white border border-gray-700 rounded px-4 py-1 w-full mt-2"
                      value={answers[index]}
                      onChange={(e) => handleInputChange(index, e.target.value, "initial")}
                    />
                  </div>
                ))}
                <div className={styles.buttonWrapper}>
                  <button type="submit" className="shadow__btn mt-4 mb-6">
                    Analyze My Answers
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    
         {isAssessmentSubmitted && (
      <div>
        {showInitialAssessment && (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">MindMap Analysis</h2>
            <p className="text-xl mb-4 text-center">This is just a first guess to see where we stand. If we get this right, we&apos;ll ask you a few more questions to get a better idea of how we can help.</p>
            <p className="bg-slate-900 {plan} text-white border border-gray-700 px-4 py-2 rounded mb-4 text-center">{plan}</p>
            <h2 className="text-2xl font-bold mt-6 text-center">Is this assessment accurate?</h2>
            <div className={`${styles.buttonWrapper} ${styles.yesNoButtons}`}>
  <button
    className="bg-green-500 text-white px-4 py-2 rounded mt-4 mr-4"
    onClick={async () => {
      setIsLoading(true);
      setIsAssessmentConfirmed(true);
      setShowInitialAssessment(false);
      await generateAdditionalQuestions(plan);
      setIsLoading(false);
      setShowAdditionalQuestions(true);
    }}       
  >
    Yes
  </button>
  <button
    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
    onClick={() => {
      setIsLoading(true);
      setIsAssessmentConfirmed(false);
      setShowInitialAssessment(false);
      setIsLoading(false);
    }}    
  >
    No
  </button>
</div>
          </>
        )}
      </div>
    )}
    {isAssessmentConfirmed === false && <GeneralQuestions />}
{showAdditionalQuestions && !showActionableAdvice && <AdditionalQuestions />}
{actionableAdvice && showActionableAdvice && (
  <div className="container mx-auto px-4">
    <div>
      <h2 className="text-2xl font-bold text-center mb-4 mt-8">Actionable Advice</h2>
      <p className={`bg-slate-900 ${actionableAdvice} text-white border border-gray-700 px-4 py-2 rounded mb-4 text-center`}>{actionableAdvice}</p>
    </div>
    {showSupportButton && !isSearching && ( 
    <div className="flex justify-center">
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${styles.buttonWrapper} shadow__btn`}
        onClick={async () => {
          const topics = await extractRelevantTopics(actionableAdvice);
          const results = await searchTopics(topics);
          setSearchResults(results);
        }}
      >
        Get Personalized Support
      </button>
    </div>
    )}
    {isSearching && <div>Loading search results...</div>}
{searchResults && (
    <div>
    <h2>Search Results</h2>
    {searchResults.map((result: any, index: number) => (
      <div key={index}>
        <h3>{result.title}</h3>
        <a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>
      </div>
  ))}
</div>
    )}
    {searchResults && !showSupportButton && (
      <div className="flex justify-center">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${styles.buttonWrapper} shadow__btn`}
          onClick={() => {setShowSupportButton(false);setShowEmailPopup(true)}}
        >
          Send These to Me!
        </button>
      </div>
    )}
  </div>
)}
{showEmailPopup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <form
      onSubmit={handleEmailSubmit}
      className="bg-slate-900 text-white border border-gray-700 rounded p-6 w-1/2 max-w-lg"
    >
      <h2 className="text-xl mb-4">Email:</h2>
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
    setSearchResults(null);
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

export default Home;