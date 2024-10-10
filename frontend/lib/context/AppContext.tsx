"use client"

import { createContext, useState, useContext, ReactNode, SetStateAction, Dispatch } from "react";


interface AppContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  return (
    <AppContext.Provider
      value={{ theme, setTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};
