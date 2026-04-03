import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/LanguageSwitcher.css";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी",  flag: "🇮🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="switcher-wrapper">
      <span className="switcher-label">{t.language}</span>
      <div className="switcher-options">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className={`lang-btn ${language === lang.code ? "active" : ""}`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSwitcher;