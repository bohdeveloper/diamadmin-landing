import { motion } from "motion/react";
import { Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import logoImg from "../../imports/logo.png";

function DiamondAnimation() {
  const [diamondPos, setDiamondPos] = useState({ x: 0, y: 0 });
  const [hasImpacted, setHasImpacted] = useState(false);

  useEffect(() => {
    if (!hasImpacted) {
      const impactTimer = setTimeout(() => {
        setHasImpacted(true);
      }, 1500);
      return () => clearTimeout(impactTimer);
    }

    const moveRandomly = () => {
      const maxX = 150;
      const maxY = 100;
      const newX = (Math.random() - 0.5) * maxX;
      const newY = (Math.random() - 0.5) * maxY;
      setDiamondPos({ x: newX, y: newY });
    };

    const interval = setInterval(moveRandomly, 3000);
    return () => clearInterval(interval);
  }, [hasImpacted]);

  return (
    <div className="relative z-10 flex flex-col items-center gap-16 px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          Diamadmin
        </h1>
        <p className="text-xl md:text-2xl text-white/90">
          El poder del diamante en tu aplicación
        </p>
      </motion.div>

      {/* Data Grid Impact */}
      <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
        {/* Data Grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
          {/* Background data zones with color ranges */}
          <motion.rect
            x="50"
            y="50"
            width="200"
            height="150"
            fill="#1B75BB"
            opacity="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.rect
            x="300"
            y="100"
            width="250"
            height="200"
            fill="#3DB5E6"
            opacity="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          <motion.rect
            x="100"
            y="250"
            width="180"
            height="100"
            fill="#2E9AC9"
            opacity="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1, delay: 0.9 }}
          />

          {/* Vertical lines */}
          {[...Array(13)].map((_, i) => {
            const x = i * 50;
            return (
              <motion.line
                key={`v-${i}`}
                x1={x}
                y1="0"
                x2={x}
                y2="400"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.3, 0.5],
                  x1: x,
                  x2: x
                }}
                transition={{
                  pathLength: { duration: 1, delay: i * 0.05 },
                  opacity: { duration: 1, delay: i * 0.05 }
                }}
              />
            );
          })}

          {/* Horizontal lines */}
          {[...Array(9)].map((_, i) => {
            const y = i * 50;
            return (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={y}
                x2="600"
                y2={y}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.3, 0.5],
                  y1: y,
                  y2: y
                }}
                transition={{
                  pathLength: { duration: 1, delay: i * 0.05 },
                  opacity: { duration: 1, delay: i * 0.05 }
                }}
              />
            );
          })}

          {/* Y-axis labels */}
          {[0, 100, 200, 300, 400].map((value, i) => {
            const y = 400 - value;
            return (
              <motion.text
                key={`y-${i}`}
                x="5"
                y={y + 5}
                fill="rgba(255,255,255,0.6)"
                fontSize="12"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              >
                {value}
              </motion.text>
            );
          })}

          {/* X-axis labels */}
          {[0, 2, 4, 6, 8, 10, 12].map((value, i) => {
            const x = value * 50;
            return (
              <motion.text
                key={`x-${i}`}
                x={x - 8}
                y="395"
                fill="rgba(255,255,255,0.6)"
                fontSize="12"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              >
                {value}
              </motion.text>
            );
          })}

          {/* Random floating data points */}
          {[
            { x: 120, y: 80, value: 847 },
            { x: 280, y: 140, value: 1203 },
            { x: 450, y: 95, value: 562 },
            { x: 180, y: 260, value: 2145 },
            { x: 380, y: 180, value: 931 },
            { x: 520, y: 240, value: 1687 },
            { x: 90, y: 320, value: 425 },
            { x: 340, y: 310, value: 1849 }
          ].map((point, i) => (
            <motion.g key={`data-${i}`}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill="#3DB5E6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.15 }}
              />
              <motion.text
                x={point.x + 8}
                y={point.y + 4}
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.15 }}
              >
                {point.value}
              </motion.text>
            </motion.g>
          ))}

          {/* Data labels */}
          <motion.text
            x="30"
            y="25"
            fill="rgba(255,255,255,0.7)"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            THROUGHPUT
          </motion.text>
          <motion.text
            x="320"
            y="25"
            fill="rgba(255,255,255,0.7)"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            LATENCY
          </motion.text>

          {/* Impact wave effect */}
          <motion.circle
            cx="300"
            cy="200"
            r="0"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            initial={{ r: 0, opacity: 0 }}
            animate={hasImpacted ? {
              r: [0, 120, 0],
              opacity: [0, 0.8, 0]
            } : {}}
            transition={{
              duration: 2,
              times: [0, 0.5, 1]
            }}
          />

          {/* Secondary wave */}
          <motion.circle
            cx="300"
            cy="200"
            r="0"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            initial={{ r: 0, opacity: 0 }}
            animate={hasImpacted ? {
              r: [0, 150, 0],
              opacity: [0, 0.6, 0]
            } : {}}
            transition={{
              duration: 2,
              delay: 0.2,
              times: [0, 0.5, 1]
            }}
          />

          {/* Data nodes at intersections */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const radius = 80;
            const cx = 300 + Math.cos(angle) * radius;
            const cy = 200 + Math.sin(angle) * radius;

            return (
              <motion.circle
                key={`node-${i}`}
                cx={cx}
                cy={cy}
                r="0"
                fill="#3DB5E6"
                initial={{ r: 0, opacity: 0 }}
                animate={hasImpacted ? {
                  r: [0, 4, 3],
                  opacity: [0, 1, 0.8]
                } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + i * 0.05
                }}
              />
            );
          })}
        </svg>

        {/* Diamond impact */}
        <motion.div
          initial={{ x: -400, y: -200, rotate: 0, scale: 1 }}
          animate={
            hasImpacted
              ? {
                  x: diamondPos.x,
                  y: diamondPos.y,
                  rotate: 45,
                  scale: 1
                }
              : {
                  x: [-400, 0],
                  y: [-200, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3]
                }
          }
          transition={
            hasImpacted
              ? {
                  x: { duration: 2.5, ease: "easeInOut" },
                  y: { duration: 2.5, ease: "easeInOut" },
                  rotate: { duration: 2.5, ease: "easeInOut" }
                }
              : {
                  duration: 1.5,
                  ease: "easeInOut"
                }
          }
          className="absolute z-10"
        >
          <img src={logoImg} alt="Diamond" className="w-32 h-32 drop-shadow-2xl" />
        </motion.div>

        {/* Impact particles with data aesthetic */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={hasImpacted ? {
              scale: [0, 1, 0.5, 0],
              x: [0, Math.cos(i * Math.PI / 6) * 120],
              y: [0, Math.sin(i * Math.PI / 6) * 120],
              opacity: [0, 1, 0.8, 0]
            } : {}}
            transition={{
              duration: 1.2,
              times: [0, 0.3, 0.6, 1],
              delay: 0.6
            }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50"
          />
        ))}

        {/* Digital binary particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={hasImpacted ? {
              scale: [0, 1, 1],
              x: [0, Math.cos((i * Math.PI * 2) / 6 + Math.PI / 6) * 90],
              y: [0, Math.sin((i * Math.PI * 2) / 6 + Math.PI / 6) * 90],
              opacity: [0, 1, 0]
            } : {}}
            transition={{
              duration: 1.5,
              delay: 0.8 + i * 0.1
            }}
            className="absolute text-white/70 text-xs font-mono"
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-white text-[#1B75BB] rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
      >
        Descubre más
      </motion.button>
    </div>
  );
}

export function HeroImpact() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B75BB] via-[#2E9AC9] to-[#3DB5E6]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <DiamondAnimation />
    </div>
  );
}
