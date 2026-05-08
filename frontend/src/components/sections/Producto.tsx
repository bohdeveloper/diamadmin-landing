"use client";

import { motion } from "motion/react";
import { BarChart3, Globe2, Puzzle, Settings2, ShieldCheck, Zap } from "lucide-react";

const pillars = [
  {
    icon: Puzzle,
    title: "Modular por diseño",
    description:
      "Activa solo los módulos que necesitas. Paga únicamente por lo que usas y escala cuando tu negocio lo pida.",
  },
  {
    icon: Globe2,
    title: "Multi-sector",
    description:
      "Desde hostelería hasta logística, sanidad o retail. Diamadmin habla el idioma de tu industria.",
  },
  {
    icon: Settings2,
    title: "Altamente personalizable",
    description:
      "Adapta flujos, campos, roles y permisos exactamente como funciona tu empresa, sin compromisos.",
  },
  {
    icon: BarChart3,
    title: "Datos en tiempo real",
    description:
      "Dashboards dinámicos con métricas clave. Toma decisiones basadas en datos, no en suposiciones.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad empresarial",
    description:
      "Cifrado de extremo a extremo, auditoría de accesos y copias de seguridad automáticas.",
  },
  {
    icon: Zap,
    title: "Rendimiento extremo",
    description:
      "Infraestructura diseñada para miles de operaciones simultáneas sin sacrificar velocidad.",
  },
];

export default function Producto() {
  return (
    <section
      id="producto"
      className="relative min-h-screen flex flex-col items-center justify-center py-28 px-6 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1B75BB 1px, transparent 1px), linear-gradient(90deg, #1B75BB 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B75BB]/10 dark:bg-[#3DB5E6]/10 text-[#1B75BB] dark:text-[#3DB5E6] text-sm font-semibold tracking-widest uppercase mb-6">
            La plataforma
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Gestiona todo.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6]">
              Sin límites.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Diamadmin es la plataforma de gestión empresarial modular que se adapta
            a cualquier sector. Un solo sistema para controlar operaciones, productos,
            equipos y datos.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl hover:border-[#3DB5E6]/40 dark:hover:border-[#3DB5E6]/40 transition-all duration-300 overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3DB5E6]/0 to-[#1B75BB]/0 group-hover:from-[#3DB5E6]/5 group-hover:to-[#1B75BB]/5 transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] flex items-center justify-center shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </div>

                {/* Diamond deco */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,5 90,50 50,95 10,50" fill="#1B75BB" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
