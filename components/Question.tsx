// components/Question.tsx
import { useState, ChangeEvent } from "react";

interface QuestionProps {
  question: string;
  onSubmit: (answer: string) => void;
}

const Question = ({ question, onSubmit }: QuestionProps): JSX.Element => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <div>
      <p>{question}</p>
      <input type="text" value={answer} onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;