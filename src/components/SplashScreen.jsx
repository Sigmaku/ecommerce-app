import React, { useEffect, useState } from 'react';
import '../styles/App.css'; // Import dari App.css, bukan SplashScreen.css

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="logo-animation">
          <div className="logo-circle"></div>
          <div className="logo-text"><span className="logo-red">NARS</span>STORE</div>
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="loading-text">Loading modern shopping experience...</p>
      </div>
    </div>
  );
};

export default SplashScreen;