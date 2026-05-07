"use client";

import { motion } from "motion/react";
import { Shield, Zap, Layers, Lock } from "lucide-react";
import { useState, useEffect } from "react";

/* ============================================================
   HERO IMPACT
============================================================ */

const features = [
  {
    icon: Shield,
    title: "Seguridad robusta",
    description: "Protección de diamante para tus datos más valiosos",
  },
  {
    icon: Zap,
    title: "Velocidad suprema",
    description: "Rendimiento cristalino en cada operación",
  },
  {
    icon: Layers,
    title: "Arquitectura sólida",
    description: "Estructura multifacética como un diamante perfecto",
  },
  {
    icon: Lock,
    title: "Control total",
    description: "Administración con la precisión de un maestro joyero",
  },
];

function DiamondAnimation() {
  const [diamondPos, setDiamondPos] = useState({ x: 0, y: 0 });
  const [hasImpacted, setHasImpacted] = useState(false);

  useEffect(() => {
    if (!hasImpacted) {
      const impactTimer = setTimeout(() => setHasImpacted(true), 1500);
      return () => clearTimeout(impactTimer);
    }

    const moveRandomly = () => {
      const newX = (Math.random() - 0.5) * 150;
      const newY = (Math.random() - 0.5) * 100;
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
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
          {/* Background data zones */}
          <motion.rect x="50" y="50" width="200" height="150" fill="#1B75BB"
            initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1, delay: 0.5 }} />
          <motion.rect x="300" y="100" width="250" height="200" fill="#3DB5E6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: 1, delay: 0.7 }} />
          <motion.rect x="100" y="250" width="180" height="100" fill="#2E9AC9"
            initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 1, delay: 0.9 }} />

          {/* Vertical lines */}
          {[...Array(13)].map((_, i) => (
            <motion.line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400"
              stroke="rgba(255,255,255,0.3)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ pathLength: { duration: 1, delay: i * 0.05 }, opacity: { duration: 1, delay: i * 0.05 } }} />
          ))}

          {/* Horizontal lines */}
          {[...Array(9)].map((_, i) => (
            <motion.line key={`h-${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50}
              stroke="rgba(255,255,255,0.3)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ pathLength: { duration: 1, delay: i * 0.05 }, opacity: { duration: 1, delay: i * 0.05 } }} />
          ))}

          {/* Y-axis labels */}
          {[0, 100, 200, 300, 400].map((value, i) => (
            <motion.text key={`y-${i}`} x="5" y={400 - value + 5}
              fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}>
              {value}
            </motion.text>
          ))}

          {/* X-axis labels */}
          {[0, 2, 4, 6, 8, 10, 12].map((value, i) => (
            <motion.text key={`x-${i}`} x={value * 50 - 8} y="395"
              fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}>
              {value}
            </motion.text>
          ))}

          {/* Data points */}
          {[
            { x: 120, y: 80, value: 847 }, { x: 280, y: 140, value: 1203 },
            { x: 450, y: 95, value: 562 }, { x: 180, y: 260, value: 2145 },
            { x: 380, y: 180, value: 931 }, { x: 520, y: 240, value: 1687 },
            { x: 90, y: 320, value: 425 }, { x: 340, y: 310, value: 1849 },
          ].map((point, i) => (
            <motion.g key={`data-${i}`}>
              <motion.circle cx={point.x} cy={point.y} r="3" fill="#3DB5E6"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.15 }} />
              <motion.text x={point.x + 8} y={point.y + 4}
                fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace"
                initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.15 }}>
                {point.value}
              </motion.text>
            </motion.g>
          ))}

          {/* Labels */}
          <motion.text x="30" y="25" fill="rgba(255,255,255,0.7)" fontSize="11"
            fontFamily="monospace" fontWeight="bold"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.5, delay: 2 }}>
            THROUGHPUT
          </motion.text>
          <motion.text x="320" y="25" fill="rgba(255,255,255,0.7)" fontSize="11"
            fontFamily="monospace" fontWeight="bold"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.5, delay: 2.2 }}>
            LATENCY
          </motion.text>

          {/* Impact waves */}
          <motion.circle cx="300" cy="200" r="0" fill="none"
            stroke="rgba(255,255,255,0.6)" strokeWidth="2"
            animate={hasImpacted ? { r: [0, 120, 0], opacity: [0, 0.8, 0] } : {}}
            transition={{ duration: 2, times: [0, 0.5, 1] }} />
          <motion.circle cx="300" cy="200" r="0" fill="none"
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
            animate={hasImpacted ? { r: [0, 150, 0], opacity: [0, 0.6, 0] } : {}}
            transition={{ duration: 2, delay: 0.2, times: [0, 0.5, 1] }} />

          {/* Data nodes */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            return (
              <motion.circle key={`node-${i}`}
                cx={300 + Math.cos(angle) * 80} cy={200 + Math.sin(angle) * 80}
                r="0" fill="#3DB5E6"
                animate={hasImpacted ? { r: [0, 4, 3], opacity: [0, 1, 0.8] } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.05 }} />
            );
          })}
        </svg>

        {/* Diamond */}
        <motion.div
          initial={{ x: -400, y: -200, rotate: 0, scale: 1 }}
          animate={hasImpacted
            ? { x: diamondPos.x, y: diamondPos.y, rotate: 45, scale: 1 }
            : { x: [-400, 0], y: [-200, 0], rotate: [0, 360], scale: [1, 1.3] }
          }
          transition={hasImpacted
            ? { x: { duration: 2.5, ease: "easeInOut" }, y: { duration: 2.5, ease: "easeInOut" }, rotate: { duration: 2.5, ease: "easeInOut" } }
            : { duration: 1.5, ease: "easeInOut" }
          }
          className="absolute z-10"
        >
        <img
            src="../../../images/logo.png"
            alt="Diamond" width={128} height={128} className="drop-shadow-2xl"
          />
        </motion.div>

        {/* Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={hasImpacted ? {
              scale: [0, 1, 0.5, 0],
              x: [0, Math.cos(i * Math.PI / 6) * 120],
              y: [0, Math.sin(i * Math.PI / 6) * 120],
              opacity: [0, 1, 0.8, 0],
            } : {}}
            transition={{ duration: 1.2, times: [0, 0.3, 0.6, 1], delay: 0.6 }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50"
          />
        ))}

        {/* Binary particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={`binary-${i}`}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={hasImpacted ? {
              scale: [0, 1, 1],
              x: [0, Math.cos((i * Math.PI * 2) / 6 + Math.PI / 6) * 90],
              y: [0, Math.sin((i * Math.PI * 2) / 6 + Math.PI / 6) * 90],
              opacity: [0, 1, 0],
            } : {}}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.1 }}
            className="absolute text-white/70 text-xs font-mono"
          >
            {i % 2 === 0 ? "1" : "0"}
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

/* ============================================================
   HEXAGON (HoneycombSection)
============================================================ */

function Hexagon({ row, col }: { row: number; col: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const delay = (row + col) * 0.05;
  const hexPath = "M 30 0 L 60 17.5 L 60 52.5 L 30 70 L 0 52.5 L 0 17.5 Z";
  const diamondPath = "M 15 15 L 45 15 L 60 35 L 30 70 L 0 35 Z";

  return (
    <motion.svg width="60" height="70" viewBox="0 0 60 70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}>
      <motion.path d={hexPath}
        animate={{ d: isHovered ? diamondPath : hexPath }}
        transition={{ duration: 0.4 }}
        fill={isHovered ? "#3DB5E6" : "#2E9AC9"}
        stroke="white" strokeWidth="1" opacity={0.3} />
      {isHovered && (
        <>
          <motion.path d="M 15 15 L 30 15 L 30 35 L 0 35 Z" fill="#1B75BB" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.3 }} />
          <motion.path d="M 30 15 L 45 15 L 30 35 Z" fill="#2E9AC9" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.3 }} />
          <motion.path d="M 45 15 L 60 35 L 30 35 Z" fill="#3DB5E6" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.3 }} />
          <motion.path d="M 0 35 L 30 35 L 30 70 Z" fill="#3DB5E6" initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.3 }} />
          <motion.path d="M 30 35 L 60 35 L 30 70 Z" fill="#2E9AC9" initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ duration: 0.3 }} />
          <motion.line x1="0" y1="35" x2="60" y2="35" stroke="white" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
          <motion.line x1="15" y1="15" x2="0" y2="35" stroke="white" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
          <motion.line x1="45" y1="15" x2="60" y2="35" stroke="white" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
          <motion.line x1="30" y1="35" x2="30" y2="70" stroke="white" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
        </>
      )}
    </motion.svg>
  );
}

/* ============================================================
   HERO — componente principal exportado
============================================================ */

export default function Hero() {
  return (
    <>
      {/* ── SECCIÓN 1: Hero Impact ── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B75BB] via-[#2E9AC9] to-[#3DB5E6]"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
        </div>
        <DiamondAnimation />
      </section>

      {/* ── SECCIÓN 2: Features ── */}
      <section className="min-h-screen flex items-center justify-center bg-white py-20 px-8">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-[#1B75BB] mb-4">
              Características
            </h2>
            <p className="text-xl md:text-2xl text-gray-600">
              Brilla con la potencia de Diamadmin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#3DB5E6]/10 to-[#1B75BB]/10 border-2 border-[#3DB5E6]/20 hover:border-[#3DB5E6] transition-all cursor-pointer overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-[#3DB5E6]/0 to-[#1B75BB]/0 group-hover:from-[#3DB5E6]/5 group-hover:to-[#1B75BB]/5 transition-all duration-300" />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] flex items-center justify-center shadow-lg"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#1B75BB] mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-lg">{feature.description}</p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon points="50,10 80,50 50,90 20,50" fill="#1B75BB" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: Honeycomb ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0F4C75] via-[#1B75BB] to-[#2E9AC9] py-20 px-8 overflow-hidden">
        {/* Honeycomb background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="flex flex-col items-center gap-1">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex gap-1"
                style={{ marginLeft: rowIndex % 2 === 1 ? "30px" : "0px" }}>
                {[...Array(12)].map((_, colIndex) => (
                  <Hexagon key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Estructura perfecta
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Cada hexágono se transforma en un diamante de potencial
            </p>
            <p className="text-lg md:text-xl text-white/70">
              Pasa el cursor sobre el patrón y descubre la transformación
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}