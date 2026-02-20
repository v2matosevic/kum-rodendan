"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";
import { Howl } from "howler";
import confetti from "canvas-confetti";
import dynamic from "next/dynamic";
import useSfx from "@/components/useSfx";
import GlassCard from "@/components/GlassCard";
import GradientText from "@/components/GradientText";
import SpinningHead from "@/components/SpinningHead";
import FloatingHeads from "@/components/FloatingHeads";
import FloatingEmojis from "@/components/FloatingEmojis";
import FireworksBackground from "@/components/FireworksBackground";

const ConfettiRain = dynamic(() => import("@/components/ConfettiExplosion"), {
  ssr: false,
});

function PartyContent() {
  const musicRef = useRef<Howl | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const burst = () => {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#FF69B4", "#FFD700", "#00CED1", "#FF6347", "#9B59B6", "#32CD32"],
      });
    };
    burst();
    setTimeout(burst, 500);
    setTimeout(burst, 1000);

    try {
      musicRef.current = new Howl({
        src: ["/sounds/birthday.mp3"],
        loop: true,
        volume: 0,
      });
      musicRef.current.play();
      musicRef.current.fade(0, 0.4, 3000);
    } catch {
      // no sound file, no problem
    }

    const timer = setTimeout(() => setShowMessage(true), 2000);

    return () => {
      musicRef.current?.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="page-wrapper overflow-hidden">
      <div className="aurora-bg fixed inset-0 -z-10" />
      <ConfettiRain numberOfPieces={400} />
      <FireworksBackground />
      <FloatingHeads count={15} />
      <FloatingEmojis count={25} />

      <div className="relative z-40 flex flex-col items-center gap-4 sm:gap-8 px-4 py-6 sm:py-8 text-center w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
          className="w-full"
        >
          <h1 className="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none">
            <GradientText>SRETAN ROĐENDAN</GradientText>
          </h1>
          <h2 className="text-[3rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mt-1 sm:mt-2">
            <GradientText>KUME!</GradientText>
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.8 }}
        >
          <div className="sm:hidden"><SpinningHead size={120} /></div>
          <div className="hidden sm:block"><SpinningHead size={180} /></div>
        </motion.div>

        {/* Typewriter — dark pill bg for contrast on aurora */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-base sm:text-xl md:text-3xl text-white min-h-[3rem] sm:min-h-[4rem]
            px-6 py-3 w-full max-w-md sm:max-w-lg"
        >
          <TypeAnimation
            sequence={[
              "31 godina i još igraš Janna support 💅",
              2500,
              "Ward ti je jedini kill 🪬",
              2500,
              "Support diff kao i svake godine 📉",
              2500,
              "E-girl energy kume 👧🎀",
              2500,
            ]}
            speed={40}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full max-w-sm sm:max-w-xl px-2"
          >
            <GlassCard className="neon-border text-center">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎂</div>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                <GradientText>Sretan Rođendanziren Kumiren</GradientText>
              </h3>
              <div className="flex justify-center gap-3 sm:gap-4 text-2xl sm:text-4xl">
                {["🍺", "🎉", "🔥", "💪", "🫡"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        <div className="fixed inset-0 pointer-events-none z-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`balloon-${i}`}
              initial={{ y: "110vh", x: `${10 + i * 15}vw` }}
              animate={{ y: "-10vh" }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              }}
              style={{ position: "fixed", fontSize: "2.5rem", left: 0 }}
            >
              🎈
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CelebrationPage() {
  const [started, setStarted] = useState(false);
  const sfx = useSfx();

  if (!started) {
    return (
      <div className="page-wrapper bg-[#0a0a1a]">
        <div className="aurora-bg fixed inset-0 -z-10 opacity-30" />
        <motion.div
          className="flex flex-col items-center gap-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-center neon-glow px-4">
            <GradientText>Spreman?</GradientText>
          </h1>
          <motion.button
            className="px-12 py-6 rounded-3xl font-bold text-2xl cursor-pointer
              bg-gradient-to-r from-pink via-gold to-coral text-[#0a0a1a]
              pulse-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { sfx.success(); setStarted(true); }}
          >
            OTVORI
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return <PartyContent />;
}
