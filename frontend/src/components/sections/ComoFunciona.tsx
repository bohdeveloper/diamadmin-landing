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
      "Selecciona los módulos que necesitas. Nuestro equipo te ayuda a configurar la plataforma a medida de tu operativa.",
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
      "Nuestro equipo está disponible para ayudarte a escalar, añadir módulos o resolver cualquier duda en el camino.",
  },
];

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="relative py-28 px-6 bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* Decorative diamond */}
      <div className="absolute -top-20 -right-20 w-80 h-80 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,50 50,95 10,50" fill="#1B75BB" />
        </svg>
      </div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,50 50,95 10,50" fill="#3DB5E6" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B75BB]/10 dark:bg-[#3DB5E6]/10 text-[#1B75BB] dark:text-[#3DB5E6] text-sm font-semibold tracking-widest uppercase mb-6">
            Proceso
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Cómo funciona
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            De cero a operativo en pocos días. Sin instalaciones complejas, sin meses de implementación.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            viewport={{ once: true }}
            style={{ transformOrigin: "top" }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1B75BB] to-[#3DB5E6] hidden sm:block"
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isEven ? "sm:text-right" : "sm:text-left"}`}>
                    <div
                      className={`inline-block p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow w-full sm:max-w-sm ${
                        isEven ? "sm:ml-auto" : "sm:mr-auto"
                      }`}
                    >
                      <span className="text-4xl font-black text-[#1B75BB]/20">{step.step}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{step.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] flex items-center justify-center shadow-lg flex-shrink-0"
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Empty space */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
