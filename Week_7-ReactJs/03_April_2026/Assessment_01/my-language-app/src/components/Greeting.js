import React from "react";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Greeting.css";

function Greeting() {
  const { t } = useLanguage();

  return (
    <div className="greeting-wrapper">
      <span className="greeting-tag">i18n · Context API</span>
      <h1 className="greeting-title">{t.greeting}</h1>
      <h2 className="greeting-subtitle">{t.welcome}</h2>
      <p className="greeting-body">{t.about}</p>
      <div className="greeting-divider" />
      <div className="greeting-badge-row">
        <span className="greeting-badge">React 18</span>
        <span className="greeting-badge">Context API</span>
        <span className="greeting-badge highlight">✦ Live Translation</span>
      </div>
    </div>
  );
}

export default Greeting;