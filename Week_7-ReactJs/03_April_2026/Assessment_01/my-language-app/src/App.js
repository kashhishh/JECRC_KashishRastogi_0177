import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Greeting from "./components/Greeting";
import "./styles/global.css";
import "./styles/App.css";

function App() {
  return (
    <LanguageProvider>
      <div className="app-wrapper">
        <div className="app-container">
          <header className="app-header">
            <div className="app-logo">
              <span className="app-logo-dot" />
              LangSwitch
            </div>
          </header>

          <LanguageSwitcher />
          <Greeting />

          <footer className="app-footer">
            Built with React · Context API · CSS3
          </footer>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;