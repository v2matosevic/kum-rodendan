"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import confetti from "canvas-confetti";
import AuroraBackground from "@/components/AuroraBackground";
import GlassCard from "@/components/GlassCard";
import NeonText from "@/components/NeonText";
import BouncyButton from "@/components/BouncyButton";
import GradientText from "@/components/GradientText";
import useSfx from "@/components/useSfx";

function Challenge1({ onComplete }: { onComplete: () => void }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [fails, setFails] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickCountRef = useRef(0);
  const sfx = useSfx();

  const failMessages = [
    "Haha pustio si! 😂",
    "Slabi prsti a? 🤣",
    "Nema šanse 💀",
    "Ajde opet 😈",
    "Baba bi izdržala 👵",
  ];

  const startHold = useCallback(() => {
    if (completed) return;
    setHolding(true);
    tickCountRef.current = 0;
    sfx.pop();
    intervalRef.current = setInterval(() => {
      tickCountRef.current++;
      if (tickCountRef.current % 3 === 0) sfx.tick();
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setCompleted(true);
          sfx.success();
          confetti({
            particleCount: 80,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: ["#FF69B4", "#FFD700", "#00CED1"],
          });
          onComplete();
          return 100;
        }
        return p + 10 / 3;
      });
    }, 100);
  }, [completed, onComplete, sfx]);

  const stopHold = useCallback(() => {
    if (completed) return;
    setHolding(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progress > 0 && progress < 100) {
      sfx.fail();
      setFails((f) => f + 1);
      setProgress(0);
    }
  }, [completed, progress, sfx]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const glowIntensity = Math.floor((progress / 100) * 60);
  const headRotation = holding ? progress * 3.6 : 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <NeonText className="text-2xl md:text-4xl text-center">
        Pritisni! 💪
      </NeonText>
      <p className="text-white/50 text-sm">3 sekunde. Nemoj pustit.</p>

      <motion.div
        className="relative select-none"
        style={{ touchAction: "manipulation", cursor: completed ? "default" : "pointer" }}
        onPointerDown={startHold}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        animate={{
          scale: completed ? 1.3 : holding ? 0.9 + (progress / 100) * 0.4 : 1,
          rotate: completed ? 360 : headRotation,
        }}
        transition={completed ? { type: "spring", stiffness: 200 } : { duration: 0.1 }}
      >
        <Image
          src="/kum-head.png"
          alt="Kum"
          width={140}
          height={140}
          className="rounded-full"
          style={{
            width: 140,
            height: 140,
            objectFit: "cover",
            filter: `drop-shadow(0 0 ${glowIntensity}px rgba(255,105,180,0.8))`,
            transition: "filter 0.1s",
          }}
        />
        <svg
          className="absolute inset-0 -m-2 pointer-events-none"
          width="156"
          height="156"
          viewBox="0 0 156 156"
        >
          <circle cx="78" cy="78" r="74" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
          <circle
            cx="78" cy="78" r="74" fill="none"
            stroke="url(#progressGrad)" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 74}`}
            strokeDashoffset={`${2 * Math.PI * 74 * (1 - progress / 100)}`}
            transform="rotate(-90 78 78)"
            style={{ transition: "stroke-dashoffset 0.1s" }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF69B4" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div className="text-center min-h-[3rem]">
        {completed ? (
          <motion.p className="text-2xl font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <GradientText>Gg 😎</GradientText>
          </motion.p>
        ) : holding ? (
          <motion.p
            className="text-4xl font-bold neon-glow"
            key={Math.floor(progress / 33.3)}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
          >
            {Math.min(3, Math.ceil((progress / 100) * 3))}/3
          </motion.p>
        ) : fails > 0 ? (
          <motion.p
            className="text-lg text-coral font-bold"
            key={fails}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {failMessages[(fails - 1) % failMessages.length]}
          </motion.p>
        ) : (
          <p className="text-white/40">Stisni mu glavu 👇</p>
        )}
      </motion.div>
    </div>
  );
}

function Challenge2({ onComplete }: { onComplete: () => void }) {
  const [clicks, setClicks] = useState(0);
  const [completed, setCompleted] = useState(false);
  const TARGET = 31;
  const sfx = useSfx();

  const handleClick = () => {
    if (completed) return;
    const next = clicks + 1;
    setClicks(next);
    sfx.pop();

    if (next % 10 === 0) {
      sfx.bonk();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#FF69B4", "#FFD700", "#00CED1"],
      });
    }

    if (next >= TARGET) {
      setCompleted(true);
      sfx.success();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#FF69B4", "#FFD700", "#FF6347", "#9B59B6"],
      });
      onComplete();
    }
  };

  const headScale = 1 + (clicks / TARGET) * 1.5;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-md">
      <NeonText className="text-2xl md:text-4xl text-center">
        Tapkaj! 👆
      </NeonText>
      <p className="text-white/50 text-sm">Jednom za svaki rođendan 🎂</p>

      <motion.div
        className="text-5xl sm:text-6xl md:text-8xl font-bold"
        key={clicks}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <GradientText>{clicks}</GradientText>
        <span className="text-xl sm:text-2xl text-white/50">/{TARGET}</span>
      </motion.div>

      <motion.button
        className="cursor-pointer rounded-full"
        animate={{ scale: headScale }}
        transition={{ type: "spring" }}
        onClick={handleClick}
        whileTap={{ scale: headScale * 0.85 }}
        disabled={completed}
      >
        <Image
          src="/kum-head.png"
          alt="Kum"
          width={100}
          height={100}
          className="rounded-full drop-shadow-[0_0_20px_rgba(255,105,180,0.6)] hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      </motion.button>

      {completed && (
        <motion.p className="text-2xl font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <GradientText>Gg 😎</GradientText>
        </motion.p>
      )}
    </div>
  );
}

function Challenge3({ onComplete }: { onComplete: () => void }) {
  const [catches, setCatches] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [completed, setCompleted] = useState(false);
  const TARGET = 5;
  const speed = useRef(800);
  const sfx = useSfx();
  const lastPos = useRef({ x: 50, y: 50 });

  useEffect(() => {
    if (completed) return;
    const moveTarget = () => {
      sfx.whoosh();
      let nx, ny;
      do {
        nx = 5 + Math.random() * 80;
        ny = 5 + Math.random() * 75;
      } while (
        Math.abs(nx - lastPos.current.x) < 25 ||
        Math.abs(ny - lastPos.current.y) < 20
      );
      lastPos.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
    };
    const interval = setInterval(moveTarget, speed.current);
    return () => clearInterval(interval);
  }, [catches, completed, sfx]);

  const handleCatch = () => {
    if (completed) return;
    const next = catches + 1;
    setCatches(next);
    speed.current = Math.max(200, 800 - next * 150);
    sfx.ding();

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x: pos.x / 100, y: pos.y / 100 },
      colors: ["#FF69B4", "#FFD700"],
    });

    setPos({
      x: 10 + Math.random() * 70,
      y: 10 + Math.random() * 60,
    });

    if (next >= TARGET) {
      setCompleted(true);
      sfx.success();
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#FF69B4", "#FFD700", "#FF6347", "#9B59B6", "#32CD32"],
      });
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <NeonText className="text-2xl md:text-4xl text-center">
        Uhvati glavu! 🎯
      </NeonText>
      <p className="text-white/50 text-sm">Kum Dodgeiren</p>

      <motion.div
        className="text-4xl font-bold"
        key={catches}
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
      >
        <GradientText>
          {catches}/{TARGET}
        </GradientText>
      </motion.div>

      <div className="relative w-full h-52 sm:h-64 md:h-80 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        {!completed && (
          <motion.button
            className="absolute cursor-pointer"
            animate={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            transition={{ type: "spring", stiffness: 900, damping: 15 }}
            onClick={handleCatch}
            whileTap={{ scale: 0.8 }}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <Image
              src="/kum-head.png"
              alt="Uhvati me!"
              width={60}
              height={60}
              className="rounded-full drop-shadow-[0_0_15px_rgba(255,105,180,0.6)] hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]"
              style={{ width: 60, height: 60, objectFit: "cover" }}
            />
          </motion.button>
        )}

        {completed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <span className="text-6xl">🎉</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ChallengeClient({ step }: { step: string }) {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const stepNum = parseInt(step);
  const sfx = useSfx();

  const handleComplete = () => {
    setDone(true);
  };

  const goNext = () => {
    sfx.pop();
    if (stepNum < 3) {
      router.push(`/challenge/${stepNum + 1}`);
    } else {
      router.push("/celebration");
    }
  };

  if (stepNum < 1 || stepNum > 3 || isNaN(stepNum)) {
    router.push("/");
    return null;
  }

  return (
    <div className="page-wrapper bg-[#0a0a1a]">
      <AuroraBackground className="opacity-30" />

      <div className="relative z-20 flex flex-col items-center gap-4 sm:gap-6 px-3 sm:px-4 py-6 sm:py-8 w-full">
        <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-4">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg
                ${s < stepNum ? "bg-lime text-[#0a0a1a]" : ""}
                ${s === stepNum ? "bg-gradient-to-r from-pink to-gold text-[#0a0a1a]" : ""}
                ${s > stepNum ? "bg-white/10 text-white/40" : ""}
              `}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: s * 0.1 }}
            >
              {s < stepNum ? "✅" : s}
            </motion.div>
          ))}
        </div>

        <GlassCard className="w-full max-w-lg mx-2">
          {stepNum === 1 && <Challenge1 onComplete={handleComplete} />}
          {stepNum === 2 && <Challenge2 onComplete={handleComplete} />}
          {stepNum === 3 && <Challenge3 onComplete={handleComplete} />}
        </GlassCard>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <BouncyButton onClick={goNext}>
                {stepNum < 3 ? "Dalje! →" : "Idemo! 🔥"}
              </BouncyButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
