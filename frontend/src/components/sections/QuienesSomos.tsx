"use client";

import { motion } from "motion/react";
import { Target, Lightbulb, HandshakeIcon } from "lucide-react";

const valores = [
  {
    icon: Target,
    title: "Enfocados en el negocio",
    description:
      "Cada decisión de producto nace de un problema real empresarial. Construimos lo que las empresas necesitan, no lo que está de moda.",
  },
  {
    icon: Lightbulb,
    title: "Innovación pragmática",
    description:
      "Tecnología de vanguardia aplicada con sentido común. Potente por dentro, simple por fuera.",
  },
  {
    icon: HandshakeIcon,
    title: "Socios, no proveedores",
    description:
      "Nos importa que tu negocio crezca. Tu éxito es nuestra mejor métrica.",
  },
];

export default function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="relative py-28 px-6 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Data grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
        {[...Array(20)].map((_, i) => (
          <line key={`v-${i}`} x1={`${i * 5.5}%`} y1="0" x2={`${i * 5.5}%`} y2="100%"
            stroke="#3DB5E6" strokeWidth="1" />
        ))}
        {[...Array(12)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={`${i * 9}%`} x2="100%" y2={`${i * 9}%`}
            stroke="#3DB5E6" strokeWidth="1" />
        ))}
      </svg>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B75BB]/5 dark:bg-[#1B75BB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B75BB]/10 dark:bg-white/5 text-[#1B75BB] dark:text-[#3DB5E6] text-sm font-semibold tracking-widest uppercase mb-6">
              Quiénes somos
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Construido por
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3DB5E6] to-[#1B75BB]">
                personas reales
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Diamadmin nació de la frustración de ver cómo las empresas perdían tiempo y dinero
              con herramientas genéricas que no encajaban con su realidad.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              Somos un equipo de desarrolladores, diseñadores y expertos en procesos empresariales
              con un objetivo claro: dar a cualquier empresa, grande o pequeña, el sistema de
              gestión que merece — sin los costes ni la complejidad de las soluciones enterprise tradicionales.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {[
                { value: "12+", label: "Sectores cubiertos" },
                { value: "50+", label: "Módulos disponibles" },
                { value: "100%", label: "Personalizable" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                >
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3DB5E6] to-[#1B75BB]">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-[10px] sm:text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — valores */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {valores.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#3DB5E6]/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-bold mb-1">{v.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Diamond deco */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute right-8 bottom-8 w-32 h-32 opacity-10 hidden lg:block"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,5 90,50 50,95 10,50" fill="none" stroke="#3DB5E6" strokeWidth="2" />
                <polygon points="50,20 75,50 50,80 25,50" fill="none" stroke="#1B75BB" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
