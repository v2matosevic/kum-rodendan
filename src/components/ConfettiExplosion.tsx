"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function ConfettiRain({ numberOfPieces = 300 }: { numberOfPieces?: number }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!dimensions.width) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={numberOfPieces}
      recycle={true}
      colors={["#FF69B4", "#FFD700", "#00CED1", "#FF6347", "#9B59B6", "#32CD32"]}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
    />
  );
}
