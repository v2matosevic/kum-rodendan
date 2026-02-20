"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Head {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function FloatingHeads({ count = 12 }: { count?: number }) {
  const [heads, setHeads] = useState<Head[]>([]);

  useEffect(() => {
    setHeads(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 90,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        size: 40 + Math.random() * 60,
        rotation: Math.random() * 720 - 360,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {heads.map((h) => (
        <motion.div
          key={h.id}
          initial={{
            y: "-10vh",
            x: `${h.x}vw`,
            rotate: 0,
            opacity: 0.9,
          }}
          animate={{
            y: "110vh",
            rotate: h.rotation,
            opacity: 0,
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
          style={{ position: "fixed", left: 0 }}
        >
          <Image
            src="/kum-head.png"
            alt="Kum"
            width={h.size}
            height={h.size}
            className="rounded-full"
            style={{ width: h.size, height: h.size, objectFit: "cover" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
