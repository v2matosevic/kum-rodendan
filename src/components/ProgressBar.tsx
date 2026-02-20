"use client";

import { motion } from "motion/react";

export default function ProgressBar({
  progress,
  color = "#FF69B4",
}: {
  progress: number;
  color?: string;
}) {
  return (
    <div className="w-full h-6 rounded-full overflow-hidden bg-white/10 neon-border">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, #FFD700)` }}
        initial={{ width: "0%" }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </div>
  );
}
