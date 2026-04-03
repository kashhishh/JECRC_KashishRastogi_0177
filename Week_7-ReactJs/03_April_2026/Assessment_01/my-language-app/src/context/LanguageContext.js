import React, { createContext, useState, useContext } from "react";
import en from "../locales/en";
import hi from "../locales/hi";
import fr from "../locales/fr";

const translations = { en, hi, fr };

// 1. Create the context
const LanguageContext = createContext();

// 2. Create the Provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = translations[language]; // current translation object

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Custom hook for easy access
export function useLanguage() {
  return useContext(LanguageContext);
}