import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  scrambleDuration?: number;
  trigger?: boolean; // Optional prop to re-trigger animation
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className, 
  scrambleSpeed = 40,
  scrambleDuration = 1000,
  trigger = true 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let startTime = Date.now();
    setIsScrambling(true);

    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / scrambleDuration, 1);

      // Determine how many characters should be "locked in" based on progress
      const lockedIndex = Math.floor(progress * text.length);

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < lockedIndex) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
      }
    }, scrambleSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, scrambleSpeed, scrambleDuration]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};