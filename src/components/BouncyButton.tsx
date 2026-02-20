"use client";

import { motion } from "motion/react";

export default function BouncyButton({
  children,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      className={`px-8 py-4 rounded-2xl font-bold text-xl cursor-pointer
        bg-gradient-to-r from-pink to-gold text-[#0a0a1a]
        pulse-glow disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      disabled={disabled}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}
