import { createContext, useContext, useState } from 'react';

const IdContext = createContext();

export function useIdContext() {
  return useContext(IdContext);
}

export function IdProvider({ children }) {
  const [accountId, setAccountId] = useState(null); 

  return (
    <IdContext.Provider value={{ accountId, setAccountId }}>
      {children}
    </IdContext.Provider>
  );
}
