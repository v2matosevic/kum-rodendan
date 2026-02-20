"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const EMOJIS = ["🎈", "🎂", "🎉", "🎁", "🎊", "🥳", "🍰", "💖"];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingEmojis({ count = 15 }: { count?: number }) {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    setEmojis(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 1.5 + Math.random() * 2,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {emojis.map((e) => (
        <motion.div
          key={e.id}
          initial={{ y: "110vh", x: `${e.x}vw`, opacity: 0.8 }}
          animate={{ y: "-10vh", opacity: 0 }}
          transition={{
            duration: e.duration,
            repeat: Infinity,
            delay: e.delay,
            ease: "linear",
          }}
          style={{
            position: "fixed",
            fontSize: `${e.size}rem`,
            left: 0,
          }}
        >
          {e.emoji}
        </motion.div>
      ))}
    </div>
  );
}
