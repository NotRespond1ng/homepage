'use client';

import { useState } from 'react';
import styles from './FallingBurgers.module.css';
import Image from 'next/image';

interface Burger {
  id: number;
  x: number;
  size: number;
}

export default function FallingBurgers() {
  const [burgers, setBurgers] = useState<Burger[]>([]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 检查点击目标
    const target = e.target as HTMLElement;
    if (target.closest('.profile') || target.closest(`.${styles.themeToggle}`)) {
      return;
    }

    // 生成随机大小 (40px 到 80px)
    const randomSize = Math.floor(Math.random() * 41) + 40;

    const newBurger = {
      id: Date.now(),
      x: e.clientX - (randomSize / 2), // 居中显示
      size: randomSize
    };

    setBurgers(prev => [...prev, newBurger]);

    setTimeout(() => {
      setBurgers(prev => prev.filter(burger => burger.id !== newBurger.id));
    }, 2000);
  };

  return (
    <div className={styles.container} onClick={handleBackgroundClick}>
      {burgers.map(burger => (
        <div
          key={burger.id}
          className={styles.burger}
          style={{ 
            left: `${burger.x}px`,
            width: `${burger.size}px`,
            height: `${burger.size}px`
          }}
        >
          <img
            src="/favicon_io/android-chrome-192x192.png"
            alt="burger"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ))}
    </div>
  );
} 