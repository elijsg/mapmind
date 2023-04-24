import axios from 'axios';
import { useState, useCallback, FormEvent, memo, useEffect, useRef} from 'react';

const initialQuestions = [
  "What is your current occupation and how satisfied are you with it?",
  "Do you feel like you have a good work-life balance? Why or why not?",
  "How often do you engage in physical activity or exercise?",
  "How would you rate your current level of financial stability?",
  "Have you recently experienced any major life changes or events?",
  "Do you have any personal goals that you are currently working towards?",
  "How would you rate the current state of your personal relationships?",
  "What are some challenges or obstacles that you are currently facing in your life?",
  "Have you ever sought professional help or guidance in any of the areas listed above?",
  "How much time do you typically dedicate to self-improvement or personal development activities?",
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

    console.log('API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);

    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: `You have been tasked with providing me with advice in order to make their life better. Based on the following answers to 10 questions, please provide a personal, in-depth, and informative analysis of the top 3 areas of life I could work on the most, along with a brief explanation of why these areas were selected and what specific steps could be taken to help work on them, following this format: “Based on your answers, it seems like the three areas that could benefit from the most guidance and support are: [list the three areas here, separated by commas]. For [first area], guidance in this area could include [suggested actions for improvement]. For [second area], guidance in this area could include [suggested actions for improvement]. And for [third area], guidance in this area could include [suggested actions for improvement]
        ${answers.join('\n')}
        Areas of life: career development, personal growth, health and wellness, financial management, relationships, and education.
    
        Answers analysis:
        `,
        max_tokens: 300,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    setPlan(response.data.choices[0].text);
    setIsAssessmentSubmitted(true);
  };

  const handleAdditionalAnswersSubmit = async (additionalAnswers: Array<string>) => {
    try {
      const initialAnswersText = answers.map((answer, index) => `Answer ${index + 1}: ${answer}`).join('\n');
      const additionalAnswersText = additionalAnswers.map((answer, index) => `Additional answer ${index + 1}: ${answer}`).join('\n');
      const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
  {
    prompt: `Based on my answers to the initial 10 questions: \n${initialAnswersText}\nand the additional 6 questions: \n${additionalAnswersText}\n, please provide a short plan with actionable advice on what I can do to improve the areas identified in the initial assessment.`,
    max_tokens: 500,
  },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
  
      const advice = response.data.choices[0].text.trim();
      setActionableAdvice(advice);
    } catch (error) {
      console.error('Error sending additional answers:', error);
      alert('An error occurred while processing your additional answers. Please try again.');
    }
  };  

  const questionsForArea = (area: string) => {
    const questions: { [key: string]: string[]; } = {
      "Career development": [
        "Question 1 related to career development",
        "Question 2 related to career development",
      ],
      "Personal growth": [
        "Question 1 related to personal growth",
        "Question 2 related to personal growth",
      ],
      "Health and wellness": [
        "Question 1 related to health and wellness",
        "Question 2 related to health and wellness",
      ],
      "Financial management": [
        "Question 1 related to financial management",
        "Question 2 related to financial management",
      ],
      "Relationships": [
        "Question 1 related to relationships",
        "Question 2 related to relationships",
      ],
      "Education": [
        "Question 1 related to education",
        "Question 2 related to education",
      ],
    };

    return questions[area] || [];
  };

  const generateAdditionalQuestions = async (assessment: string) => {
    try {
      const initialQA = answers.map((answer, index) => `Q${index + 1}: ${initialQuestions[index]}\nA${index + 1}: ${answer}`).join('\n');

      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Based on my answers to the questions asked here, ask me 6 more questions to dive deeper into the areas of life i need support and guidance with.
            \n${initialQA}\n`,
          max_tokens: 300,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
  
      const questions = response.data.choices[0].text.split('\n').filter((question: string) => question.trim() !== '');
    setGeneratedQuestions(questions);
  } catch (error) {
    console.error('Error fetching additional questions:', error);
    alert('An error occurred while fetching additional questions. Please try again.');
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
    };
  
    const handleLocalInputChange = (index: number, value: string) => {
      const newAnswers = [...localAdditionalAnswers];
      newAnswers[index] = value;
      setLocalAdditionalAnswers(newAnswers);
    };
  
    return (
      <form onSubmit={handleAdditionalSubmit}>
        {generatedQuestions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`additional-question-${index + 1}`}>{question}</label>
            <input
              type="text"
              id={`additional-question-${index + 1}`}
              className="border border-gray-280 rounded px-4 py-2 w-full mt-2"
              value={localAdditionalAnswers[index]}
              key={index}
              ref={(input) => inputRefs.current[index] = input}
              onChange={(e) => handleLocalInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Submit Additional Answers
        </button>
      </form>
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
              className="border border-gray-280 rounded px-4 py-2 w-full mt-2"
              onFocus={() => setFocusedIndexGeneral(index)}
              onChange={(e) => handleInputChange(index, e.target.value, 'general')}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Submit General Answers
        </button>
      </form>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">MindMap</h1>
      {!isAssessmentSubmitted && (
  <form onSubmit={handleSubmit}>
    {initialQuestions.map((question, index) => (
      <div key={index}>
        <label htmlFor={`question-${index + 1}`}>{question}</label>
        <input
          type="text"
          id={`question-${index + 1}`}
          className="border border-gray-280 rounded px-4 py-1 w-full mt-2"
          value={answers[index]}
          onChange={(e) => handleInputChange(index, e.target.value, 'initial')}
        />
      </div>
    ))}
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
      Analyze Answers
    </button>
  </form>
)}
         {isAssessmentSubmitted && (
      <div>
        {showInitialAssessment && (
          <>
            <h2 className="text-2xl font-bold mb-4">ChatGPT Analysis</h2>
            <p>{plan}</p>
            <h2 className="text-2xl font-bold mb-4 mt-8">Is this assessment accurate?</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 mr-4"
              onClick={() => {
                setIsAssessmentConfirmed(true);
                setShowAdditionalQuestions(true);
                generateAdditionalQuestions(plan);
                setShowInitialAssessment(false);
              }}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => {
                setIsAssessmentConfirmed(false);
                setShowInitialAssessment(false);
              }}
            >
              No
            </button>
          </>
        )}
      </div>
    )}
    {isAssessmentConfirmed === false && <GeneralQuestions />}
    {showAdditionalQuestions && <AdditionalQuestions />}
    {actionableAdvice && (
  <div>
    <h2 className="text-2xl font-bold mb-4 mt-8">Actionable Advice</h2>
    <p>{actionableAdvice}</p>
  </div>
)}
  </div>
)};

export default Home;