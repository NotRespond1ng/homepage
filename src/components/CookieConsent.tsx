'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    setAccepted(consent === 'true');
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className={styles.cookieConsent}>
      <p>本站使用 Google Analytics 统计访问数据，继续使用即表示您同意该项功能。</p>
      <button onClick={handleAccept}>我知道了</button>
    </div>
  );
} 