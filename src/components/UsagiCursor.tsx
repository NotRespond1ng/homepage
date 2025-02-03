'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './UsagiCursor.module.css';

export default function UsagiCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, {
      passive: true,
      capture: true
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div 
      className={styles.usagi}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Image
        src="/usagi.png"
        alt="usagi"
        width={30}
        height={30}
        priority
        unoptimized
      />
    </div>
  );
} 