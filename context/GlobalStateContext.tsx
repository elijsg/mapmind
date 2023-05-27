import React, { createContext, useState, ReactNode } from 'react';

type GlobalStateContextType = {
  advice: string;
  setAdvice: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalStateContext = createContext<GlobalStateContextType>({
  advice: "",
  setAdvice: () => {},
});

interface GlobalStateProviderProps {
    children: ReactNode;
  }

  const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [advice, setAdvice] = useState("");

  return (
    <GlobalStateContext.Provider value={{ advice, setAdvice }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
