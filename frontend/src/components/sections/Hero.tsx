"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
import {
  ShoppingCart, Truck, Heart, UtensilsCrossed,
  Factory, Building2, Users, BarChart2,
} from "lucide-react";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const SECTORS = [
  { icon: ShoppingCart,    label: "Retail",     fullLabel: "Retail & Ventas",  desc: "Gestión de ventas, inventario, TPV y fidelización de clientes."          },
  { icon: Truck,           label: "Logística",  fullLabel: "Logística",        desc: "Control de flotas, rutas, almacén y seguimiento en tiempo real."         },
  { icon: Heart,           label: "Salud",      fullLabel: "Salud",            desc: "Historial clínico, citas, facturación y cumplimiento normativo."          },
  { icon: UtensilsCrossed, label: "Hostelería", fullLabel: "Hostelería",       desc: "Reservas, comanda digital, escandallos y gestión de sala."               },
  { icon: Factory,         label: "Industria",  fullLabel: "Industria",        desc: "Control de producción, mantenimiento y trazabilidad de planta."          },
  { icon: Building2,       label: "R. Estate",  fullLabel: "Real Estate",      desc: "Cartera de inmuebles, contratos, arrendamientos y CRM."                  },
  { icon: Users,           label: "RRHH",       fullLabel: "RRHH & Nóminas",  desc: "Nóminas, vacaciones, onboarding y evaluación del desempeño."             },
  { icon: BarChart2,       label: "Finanzas",   fullLabel: "Finanzas",         desc: "Contabilidad, tesorería, informes y conciliación bancaria."              },
];

function SectorHex({
  sector,
  isActive,
  onHover,
  onLeave,
  delay,
}: {
  sector: (typeof SECTORS)[0];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}) {
  const Icon = sector.icon;
  const hexPath     = "M 36 0 L 72 21 L 72 63 L 36 84 L 0 63 L 0 21 Z";
  const diamondPath = "M 18 18 L 54 18 L 72 42 L 36 84 L 0 42 Z";

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer"
      style={{ zIndex: isActive ? 20 : 1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay }}
    >
      <svg width="72" height="84" viewBox="0 0 72 84">
        {/* Glow */}
        <motion.path
          d={diamondPath}
          fill="none"
          stroke="rgba(61,181,230,0.45)"
          strokeWidth="5"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
        {/* Shape hex→diamond */}
        <motion.path
          d={hexPath}
          animate={{ d: isActive ? diamondPath : hexPath }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          fill={isActive ? "#3DB5E6" : "#2E9AC9"}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          opacity={isActive ? 0.88 : 0.32}
        />
      </svg>

      {/* Icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Icon
          className={`transition-all duration-300 ${
            isActive ? "w-6 h-6 text-white drop-shadow-lg" : "w-5 h-5 text-white/50"
          }`}
        />
      </div>
    </motion.div>
  );
}

function SectorGrid() {
  const [active, setActive] = useState<number | null>(null);
  const rows = [[0, 1, 2, 3], [4, 5, 6, 7]];

  // Geometry constants (px, matching Tailwind values)
  const HEX_W = 72, HEX_H = 84, HEX_STEP = 80, ROW_GAP = 8;
  const ROW_OFFSETS = [0, 37];
  const PT = 128; // pt-32 = 128px padding-top on desktop

  const rowTopY = (r: number) => PT + r * (HEX_H + ROW_GAP);
  const hexCenter = (idx: number) => {
    const r = Math.floor(idx / 4), c = idx % 4;
    return { x: ROW_OFFSETS[r] + c * HEX_STEP + HEX_W / 2, y: rowTopY(r) + HEX_H / 2 };
  };

  const activeSector = active !== null ? SECTORS[active] : null;
  const ac = active !== null ? hexCenter(active) : null;
  // SVG covers the whole container so lines can reach any position
  const svgW = ROW_OFFSETS[1] + 4 * HEX_STEP;
  const svgH = rowTopY(1) + HEX_H;

  return (
    <div className="relative pt-0 md:pt-32">
      {/* Description panel — desktop only, absolute in the padding area */}
      <div className="hidden md:flex flex-col justify-center absolute top-0 left-0 right-0 h-28">
        <AnimatePresence mode="wait">
          {activeSector ? (
            <motion.div
              key={activeSector.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <p className="text-xl font-bold text-white leading-tight">
                {activeSector.fullLabel}
              </p>
              <p className="text-base text-white/65 mt-1 leading-snug max-w-xs">
                {activeSector.desc}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-sm text-white/35 italic"
            >
              Pasa el cursor sobre un sector
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Line SVG — desktop only, absolute overlay */}
      <svg
        className="hidden md:block absolute top-0 left-0 pointer-events-none"
        width={svgW}
        height={svgH}
        style={{ overflow: "visible" }}
      >
        <AnimatePresence>
          {ac && (
            <motion.line
              key={active}
              x1={ac.x}
              y1={ac.y}
              x2={ac.x}
              y2={110}
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Hex rows */}
      <div className="flex flex-col items-start gap-2">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex gap-2"
            style={{ marginLeft: rowIdx % 2 === 1 ? "37px" : "0px" }}
          >
            {row.map((idx) => (
              <SectorHex
                key={idx}
                sector={SECTORS[idx]}
                isActive={active === idx}
                onHover={() => setActive(idx)}
                onLeave={() => setActive(null)}
                delay={idx * 0.07}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Diamante con grid de datos ── */
function DiamondHero() {
  const [diamondPos, setDiamondPos] = useState({ x: 0, y: 0 });
  const [hasImpacted, setHasImpacted] = useState(false);

  useEffect(() => {
    if (!hasImpacted) {
      const t = setTimeout(() => setHasImpacted(true), 1800);
      return () => clearTimeout(t);
    }
    const move = () =>
      setDiamondPos({ x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 60 });
    const interval = setInterval(move, 3000);
    return () => clearInterval(interval);
  }, [hasImpacted]);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] md:h-[560px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 580">
        <motion.rect x="60"  y="60"  width="280" height="200" fill="#1B75BB" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: 1, delay: 0.5 }} />
        <motion.rect x="400" y="100" width="340" height="280" fill="#3DB5E6" initial={{ opacity: 0 }} animate={{ opacity: 0.10 }} transition={{ duration: 1, delay: 0.7 }} />
        <motion.rect x="100" y="360" width="240" height="160" fill="#2E9AC9" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1, delay: 0.9 }} />

        {[...Array(17)].map((_, i) => (
          <motion.line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="580"
            stroke="rgba(255,255,255,0.22)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.38 }}
            transition={{ pathLength: { duration: 1.2, delay: i * 0.04 }, opacity: { duration: 1, delay: i * 0.04 } }} />
        ))}
        {[...Array(12)].map((_, i) => (
          <motion.line key={`h-${i}`} x1="0" y1={i * 53} x2="800" y2={i * 53}
            stroke="rgba(255,255,255,0.22)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.38 }}
            transition={{ pathLength: { duration: 1.2, delay: i * 0.04 }, opacity: { duration: 1, delay: i * 0.04 } }} />
        ))}

        <motion.text x="20" y="25" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace" fontWeight="bold"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.5, delay: 2.2 }}>
          THROUGHPUT (ops/s)
        </motion.text>
        <motion.text x="460" y="25" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace" fontWeight="bold"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.5, delay: 2.4 }}>
          LATENCY (ms)
        </motion.text>

        {[0, 100, 200, 300, 400, 500].map((v, i) => (
          <motion.text key={`y-${i}`} x="5" y={580 - v * 0.96 + 5}
            fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace"
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
            transition={{ duration: 0.5, delay: 1.4 + i * 0.08 }}>
            {v}
          </motion.text>
        ))}

        {[
          { x: 150, y: 100, value: "2,847" }, { x: 340, y: 160, value: "1,203" },
          { x: 560, y: 110, value: "4,562" }, { x: 220, y: 310, value: "3,145" },
          { x: 480, y: 220, value: "931" },   { x: 660, y: 290, value: "5,687" },
          { x: 110, y: 420, value: "1,425" }, { x: 430, y: 390, value: "2,849" },
          { x: 710, y: 180, value: "3,201" }, { x: 290, y: 470, value: "789" },
          { x: 600, y: 450, value: "4,113" },
        ].map((p, i) => (
          <motion.g key={`d-${i}`}>
            <motion.circle cx={p.x} cy={p.y} r="4" fill="#3DB5E6"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.6 + i * 0.12 }} />
            <motion.text x={p.x + 10} y={p.y + 5}
              fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 1.7 + i * 0.12 }}>
              {p.value}
            </motion.text>
          </motion.g>
        ))}

        <motion.circle cx="400" cy="290" r="0" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2"
          animate={hasImpacted ? { r: [0, 190, 0], opacity: [0, 0.8, 0] } : {}}
          transition={{ duration: 2.5, times: [0, 0.5, 1] }} />
        <motion.circle cx="400" cy="290" r="0" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
          animate={hasImpacted ? { r: [0, 240, 0], opacity: [0, 0.55, 0] } : {}}
          transition={{ duration: 2.5, delay: 0.2, times: [0, 0.5, 1] }} />

        {[...Array(10)].map((_, i) => {
          const a = (i * Math.PI * 2) / 10;
          return (
            <motion.circle key={`n-${i}`}
              cx={400 + Math.cos(a) * 110} cy={290 + Math.sin(a) * 110}
              r="0" fill="#3DB5E6"
              animate={hasImpacted ? { r: [0, 5, 4], opacity: [0, 1, 0.8] } : {}}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.06 }} />
          );
        })}
      </svg>

      <motion.div
        initial={{ x: 900, y: -420, rotate: -30, scale: 2.2 }}
        animate={
          hasImpacted
            ? { x: diamondPos.x, y: diamondPos.y, rotate: 15, scale: 1 }
            : { x: [900, 0], y: [-420, 0], rotate: [-30, 540], scale: [2.2, 1.3] }
        }
        transition={
          hasImpacted
            ? { x: { duration: 2.5, ease: "easeInOut" }, y: { duration: 2.5, ease: "easeInOut" }, rotate: { duration: 2.5, ease: "easeInOut" } }
            : { duration: 1.9, ease: "easeInOut" }
        }
        className="absolute z-10"
      >
        <img
          src="../../../images/logo.png"
          alt="Diamond"
          width={148}
          height={148}
          className="drop-shadow-2xl w-24 h-24 sm:w-32 sm:h-32 md:w-[148px] md:h-[148px]"
          style={{ filter: "drop-shadow(0 0 36px rgba(61,181,230,0.85))" }}
        />
      </motion.div>

      {[...Array(14)].map((_, i) => (
        <motion.div key={`p-${i}`}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={hasImpacted ? {
            scale: [0, 1.2, 0.5, 0],
            x: [0, Math.cos((i * Math.PI) / 7) * 165],
            y: [0, Math.sin((i * Math.PI) / 7) * 165],
            opacity: [0, 1, 0.8, 0],
          } : {}}
          transition={{ duration: 1.4, times: [0, 0.3, 0.6, 1], delay: 0.9 }}
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-lg shadow-white/50"
        />
      ))}

      {[...Array(8)].map((_, i) => (
        <motion.div key={`b-${i}`}
          initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
          animate={hasImpacted ? {
            scale: [0, 1, 1],
            x: [0, Math.cos(((i * Math.PI * 2) / 8) + Math.PI / 8) * 125],
            y: [0, Math.sin(((i * Math.PI * 2) / 8) + Math.PI / 8) * 125],
            opacity: [0, 1, 0],
          } : {}}
          transition={{ duration: 1.6, delay: 1.1 + i * 0.08 }}
          className="absolute text-white/70 text-xs font-mono"
        >
          {i % 2 === 0 ? "1" : "0"}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Hero exportado ── */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-[#0A3A5C] via-[#1B75BB] to-[#2E9AC9]"
    >
      {/* Rejilla de puntos */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── PARTE 1: Título + diamante ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
        <motion.div
          className="flex-1 text-center lg:text-left w-full max-w-xl mx-auto lg:mx-0"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="inline-block mb-4 px-3 py-1.5 rounded-full border border-white/30 bg-white/10 text-white/70 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
            Plataforma de administración empresarial
          </div>

          <h1
            className={`${bebasNeue.className} text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] xl:text-[11rem] leading-none text-white tracking-wider mb-3`}
            style={{ textShadow: "0 0 120px rgba(61,181,230,0.55), 0 4px 40px rgba(0,0,0,0.55)" }}
          >
            DIAMADMIN
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 leading-relaxed">
            Centraliza, analiza y controla cada operación desde un único panel.{" "}
            <span className="text-white/85 font-medium">
              Irrompible bajo presión, brillante en rendimiento.
            </span>
          </p>

          <div className="flex gap-5 sm:gap-8 md:gap-10 justify-center lg:justify-start">
            {[
              { value: "99.9%", label: "Disponibilidad" },
              { value: "<50ms", label: "Latencia" },
              { value: "10M+",  label: "Ops / día" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className="text-center lg:text-left"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DiamondHero />
        </motion.div>
      </div>

      {/* ── SEPARADOR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-t border-white/10" />
      </div>

      {/* ── PARTE 2: Honeycomb de sectores ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Izquierda: hexágonos de sectores */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectorGrid />
        </motion.div>

        {/* Derecha: texto + CTA */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-3 text-[#93d9f5] uppercase tracking-widest text-xs font-semibold">
            Multi-sector
          </span>
          <h2
            className={`${bebasNeue.className} text-5xl sm:text-6xl md:text-7xl text-white tracking-wide mb-5`}
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            MODULAR POR NATURALEZA
          </h2>
          <p className="text-lg sm:text-xl text-white/85">
            Cada sector tiene sus propias reglas.
          </p>
          <p className="text-lg sm:text-xl text-white/85 mb-4">
            Diamadmin las conoce todas.
          </p>
          <p className="text-sm sm:text-base text-white/60 mb-8 leading-relaxed">
            Pasa el cursor sobre cada módulo para descubrir los sectores a los que damos
            cobertura. Activa únicamente lo que necesitas y expándelo a tu ritmo.
          </p>

          {/* Chips de sectores activos */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
            {SECTORS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs"
                >
                  <Icon className="w-3 h-3" />
                  {s.fullLabel}
                </div>
              );
            })}
          </div>

          <motion.a
            href="#producto"
            whileHover={{ scale: 1.05, boxShadow: "0 22px 55px rgba(61,181,230,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-white text-[#1B75BB] rounded-full font-bold text-base sm:text-lg shadow-xl cursor-pointer transition-shadow"
          >
            Descubre más
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
