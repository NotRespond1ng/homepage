import styles from "./page.module.css";
import { FaGithub } from "react-icons/fa";
import { SiBilibili } from "react-icons/si";
import { FaPenNib } from "react-icons/fa";
import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";
import FallingBurgers from "../components/FallingBurgers";
import UsagiCursor from "../components/UsagiCursor";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { 
    icon: <SiBilibili />, 
    url: "https://space.bilibili.com/33929997", 
    label: "bilibili" 
  },
  { 
    icon: <FaGithub />, 
    url: "https://github.com/NotRespond1ng", 
    label: "github" 
  },
  { 
    icon: <FaPenNib />, 
    url: "https://blog.notrespond1ng.top", 
    label: "blog" 
  }
];

export default function Home() {
  return (
    <div className={styles.container}>
      <ThemeToggle />
      <FallingBurgers />
      <UsagiCursor />
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <Image 
            src="/avatar.jpg"
            alt="avatar"
            width={120}
            height={120}
            priority
          />
        </div>
        <h1 className={styles.name}>板烧鸡腿堡</h1>
        <p className={styles.bio}>咖啡不断加加加加到厌倦</p>
        <div className={styles.social}>
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
