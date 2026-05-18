"use client";

import { motion } from "motion/react";
import { ClipboardList, Sliders, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Cuéntanos tu negocio",
    description:
      "Completa un breve formulario sobre tu sector, tamaño de equipo y necesidades principales. Sin compromisos.",
  },
  {
    icon: Sliders,
    step: "02",
    title: "Configura tus módulos",
    description:
      "Selecciona los módulos que necesitas. Nuestro equipo adapta la plataforma a tu operativa en pocos pasos.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Lanza en días",
    description:
      "Importa tus datos, forma a tu equipo y empieza a operar. El onboarding guiado lo hace sencillo desde el primer día.",
  },
  {
    icon: LifeBuoy,
    step: "04",
    title: "Soporte continuo",
    description:
      "Nuestro equipo te acompaña para escalar, añadir módulos o resolver cualquier duda en el camino.",
  },
];

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="relative py-28 px-6 bg-gray-50 dark:bg-[#04101C] overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(27,117,187,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,117,187,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[480px] h-[480px] bg-[#1B75BB]/5 dark:bg-[#1B75BB]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#3DB5E6]/4 dark:bg-[#3DB5E6]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#3DB5E6]/10 text-[#3DB5E6] text-sm font-semibold tracking-widest uppercase mb-6">
            Proceso
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Cómo funciona
          </h2>
          <p className="text-xl text-gray-500 dark:text-white/45 max-w-2xl mx-auto">
            De cero a operativo en pocos días. Sin instalaciones complejas, sin meses de implementación.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Horizontal connector (desktop only) */}
          {/* The icon diamonds are 72px tall; center = 36px from top of each step column */}
          <div className="hidden lg:block absolute top-[36px] left-[12.5%] right-[12.5%] h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1B75BB] via-[#3DB5E6] to-[#1B75BB]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.14 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Diamond icon */}
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 w-[72px] h-[72px] mb-7 flex-shrink-0"
                  >
                    {/* Rotated square → diamond shape */}
                    <div className="absolute inset-0 rotate-45 bg-gradient-to-br from-[#1B75BB] to-[#0A2A45] border border-[#3DB5E6]/30 group-hover:border-[#3DB5E6]/70 transition-colors duration-300 shadow-lg shadow-[#1B75BB]/25" />
                    {/* Icon centered (not rotated) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#3DB5E6]" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-[#3DB5E6] text-white text-[9px] font-black flex items-center justify-center z-10 shadow">
                      {i + 1}
                    </span>
                  </motion.div>

                  {/* Card */}
                  <div className="flex-1 p-5 rounded-2xl bg-white border border-gray-100 dark:bg-white/[0.04] dark:border-white/8 group-hover:border-[#3DB5E6]/40 dark:group-hover:border-[#3DB5E6]/25 group-hover:shadow-sm dark:group-hover:bg-white/[0.07] transition-all duration-300 w-full">
                    {/* Big watermark number */}
                    <span className="block text-6xl font-black text-gray-900/[0.04] dark:text-white/[0.04] leading-none mb-1 select-none">
                      {step.step}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">{step.title}</h3>
                    <p className="text-gray-500 dark:text-white/45 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contacto"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#1B75BB]/30"
          >
            Empieza ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
