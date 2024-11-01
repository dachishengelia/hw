import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [translationText, setTranslationText] = useState('რჩევის ტარგმნა.');

  const fetchAdvice = async () => {
    setIsLoading(true);
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setAdvice(data.slip.advice);
    setAdviceId(data.slip.id);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
    document.body.classList.toggle('light-mode', isDarkMode);
  };

  const handleTranslationClick = () => {
    setTranslationText(prevText => 
      prevText === 'რჩევის ტარგმნა.' ? 'მეტი საქმე არ მაქ რო ეს გითარგმნოთ!' : 'რჩევის ტარგმნა.'
    );
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="advice-card">
        <h2>ADVICE #{adviceId}</h2>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <p>"{advice}"</p>
        )}
        <button onClick={fetchAdvice}>ახალი რჩევა</button>
        <button onClick={toggleTheme} className="toggle-theme-button">
          {isDarkMode ? 'მას,ამას არ დააჭიროთ.' : 'ხო ვთქვი არ დააჭირო!'}
        </button>
        <button onClick={handleTranslationClick} className="translation-button">
          {translationText}
        </button>
      </div>
    </div>
  );
}

export default App;