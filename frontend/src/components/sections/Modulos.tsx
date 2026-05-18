"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Truck, Heart, UtensilsCrossed, Factory,
  Building2, Stethoscope, BookOpen, Wrench, Users,
  BarChart2, FileText,
} from "lucide-react";

const modulos = [
  { icon: ShoppingCart,    label: "Ventas & POS",      sector: "Comercial"           },
  { icon: UtensilsCrossed, label: "Hostelería & TPV",  sector: "Comercial"           },
  { icon: Building2,       label: "Inmobiliaria",      sector: "Comercial"           },
  { icon: Truck,           label: "Logística & Stock", sector: "Logística & Industria" },
  { icon: Factory,         label: "Producción",        sector: "Logística & Industria" },
  { icon: Wrench,          label: "Mantenimiento",     sector: "Logística & Industria" },
  { icon: Heart,           label: "Gestión clínica",   sector: "Salud"               },
  { icon: Stethoscope,     label: "Historial médico",  sector: "Salud"               },
  { icon: Users,           label: "RRHH & Nóminas",    sector: "RRHH"                },
  { icon: BookOpen,        label: "Formación interna", sector: "RRHH"                },
  { icon: BarChart2,       label: "Analytics",         sector: "Finanzas & Datos"    },
  { icon: FileText,        label: "Facturación",       sector: "Finanzas & Datos"    },
];

const sectores = [...new Set(modulos.map((m) => m.sector))];

const CYCLE_INTERVAL = 5000;
const PAUSE_AFTER_CLICK = 30000;

function MiniHex({ row, col }: { row: number; col: number }) {
  const delay = (row + col) * 0.04;
  const hex = "M 30 0 L 60 17.5 L 60 52.5 L 30 70 L 0 52.5 L 0 17.5 Z";
  return (
    <motion.svg
      width="50" height="58" viewBox="0 0 60 70"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <path d={hex} fill="#1B75BB" stroke="white" strokeWidth="1" opacity={0.25} />
    </motion.svg>
  );
}

export default function Modulos() {
  const [activeFilter, setActiveFilter] = useState<string>(sectores[0]);
  const isPausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveFilter((prev) => {
        const idx = sectores.indexOf(prev);
        return sectores[(idx + 1) % sectores.length];
      });
    }, CYCLE_INTERVAL);
    return () => {
      clearInterval(id);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleFilterClick = (s: string) => {
    setActiveFilter(s);
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, PAUSE_AFTER_CLICK);
  };

  const filtered = modulos.filter((m) => m.sector === activeFilter);

  return (
    <section
      id="modulos"
      className="relative min-h-screen flex flex-col items-center justify-center py-28 px-6 bg-gradient-to-br from-[#0F4C75] via-[#1B75BB] to-[#2E9AC9] overflow-hidden"
    >
      {/* Honeycomb background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="flex flex-col gap-0.5">
          {[...Array(10)].map((_, r) => (
            <div key={r} className="flex gap-0.5" style={{ marginLeft: r % 2 === 1 ? "25px" : "0" }}>
              {[...Array(14)].map((_, c) => (
                <MiniHex key={`${r}-${c}`} row={r} col={c} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold tracking-widest uppercase mb-6">
            Módulos
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Construye tu herramienta
          </h2>
          <p className="text-xl text-white/75 max-w-2xl mx-auto">
            Selecciona solo los módulos que necesita tu negocio. Actívalos, combínalos y personalízalos.
          </p>
        </motion.div>

        {/* Sector tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {sectores.map((s) => {
            const isActive = activeFilter === s;
            const isCycling = isActive && !isPausedRef.current;
            return (
              <button
                key={s}
                onClick={() => handleFilterClick(s)}
                className={`relative overflow-hidden px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? isCycling
                      ? "bg-[#3DB5E6] text-white"
                      : "bg-white text-[#1B75BB]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isCycling && (
                  <motion.span
                    key={activeFilter}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "rgba(255,255,255,0.30)", transformOrigin: "right" }}
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: CYCLE_INTERVAL / 1000, ease: "linear" }}
                  />
                )}
                <span className="relative z-10">{s}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Module grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filtered.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 cursor-pointer transition-all backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm text-center">{mod.label}</span>
                  <span className="text-white/50 text-xs">{mod.sector}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-white/60 text-sm mb-4">¿No encuentras tu sector? Estamos ampliando constantemente.</p>
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-white text-[#1B75BB] font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Solicitar módulo personalizado
          </a>
        </motion.div>
      </div>
    </section>
  );
}
