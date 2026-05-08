"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  ShoppingCart, Truck, Heart, UtensilsCrossed, Factory,
  Building2, Stethoscope, BookOpen, Wrench, Users,
  BarChart2, FileText,
} from "lucide-react";

const modulos = [
  { icon: ShoppingCart, label: "Ventas & POS", sector: "Retail" },
  { icon: Truck, label: "Logística & Stock", sector: "Logística" },
  { icon: Heart, label: "Gestión clínica", sector: "Salud" },
  { icon: UtensilsCrossed, label: "Hostelería & TPV", sector: "Hostelería" },
  { icon: Factory, label: "Producción", sector: "Industria" },
  { icon: Building2, label: "Inmobiliaria", sector: "Real Estate" },
  { icon: Stethoscope, label: "Historial médico", sector: "Salud" },
  { icon: BookOpen, label: "Formación interna", sector: "RRHH" },
  { icon: Wrench, label: "Mantenimiento", sector: "Industria" },
  { icon: Users, label: "RRHH & Nóminas", sector: "Corporativo" },
  { icon: BarChart2, label: "Analytics", sector: "Corporativo" },
  { icon: FileText, label: "Facturación", sector: "Finanzas" },
];

// Decorative background hexagon (pointer-events disabled on parent, no hover needed)
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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const sectores = [...new Set(modulos.map((m) => m.sector))];

  const filtered = activeFilter
    ? modulos.filter((m) => m.sector === activeFilter)
    : modulos;

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

        {/* Sector filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeFilter === null
                ? "bg-white text-[#1B75BB]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Todos
          </button>
          {sectores.map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s === activeFilter ? null : s)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === s
                  ? "bg-white text-[#1B75BB]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Module grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.label}
                layout
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
        </div>

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
