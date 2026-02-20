"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function FireworksBackground() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const duration = 60 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#FF69B4", "#FFD700", "#00CED1"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#FF6347", "#9B59B6", "#32CD32"],
      });
    };

    intervalRef.current = setInterval(frame, 200);

    // Emoji confetti bursts
    const emojiInterval = setInterval(() => {
      const scalar = 2;
      const shapes = ["🎂", "🎈", "🎉"].map((text) =>
        confetti.shapeFromText({ text, scalar })
      );
      confetti({
        shapes,
        scalar,
        particleCount: 8,
        spread: 120,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(emojiInterval);
    };
  }, []);

  return null;
}
