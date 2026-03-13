"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function SpinningHead({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`${className}`}
      animate={{
        rotateY: 360,
        rotateX: [0, 15, -15, 0],
      }}
      transition={{
        rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ perspective: 800 }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/kum-head.png`}
        alt="Kum"
        width={size}
        height={size}
        className="rounded-full drop-shadow-[0_0_30px_rgba(255,105,180,0.8)]"
        style={{ width: size, height: size, objectFit: "cover" }}
        priority
      />
    </motion.div>
  );
}
