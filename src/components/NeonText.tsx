"use client";

import { motion } from "motion/react";

export default function NeonText({
  children,
  className = "",
  variant = "pink",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "pink" | "gold";
}) {
  return (
    <motion.h1
      className={`${variant === "gold" ? "neon-glow-gold" : "neon-glow"} ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.h1>
  );
}
