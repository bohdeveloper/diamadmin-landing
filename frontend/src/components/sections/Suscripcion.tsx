"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";

const planes = [
  {
    name: "Starter",
    price: { monthly: 49, yearly: 39 },
    description: "Ideal para pequeños negocios que dan el primer paso.",
    modulos: 3,
    features: [
      "Hasta 3 módulos activos",
      "5 usuarios incluidos",
      "Soporte por email",
      "Actualizaciones automáticas",
      "Dashboard básico",
    ],
    cta: "Empezar gratis 14 días",
    highlight: false,
  },
  {
    name: "Business",
    price: { monthly: 149, yearly: 119 },
    description: "Para empresas en crecimiento que necesitan más control.",
    modulos: 10,
    features: [
      "Hasta 10 módulos activos",
      "25 usuarios incluidos",
      "Soporte prioritario 24/7",
      "Integraciones API",
      "Analytics avanzado",
      "Roles y permisos personalizados",
    ],
    cta: "Empezar gratis 14 días",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: { monthly: null, yearly: null },
    description: "Solución a medida para grandes organizaciones.",
    modulos: null,
    features: [
      "Módulos ilimitados",
      "Usuarios ilimitados",
      "Soporte dedicado",
      "Onboarding personalizado",
      "SLA garantizado",
      "Desarrollo a medida",
    ],
    cta: "Contactar ventas",
    highlight: false,
  },
];

export default function Suscripcion() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="subscripción"
      className="relative py-28 px-6 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Background gradient deco */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#3DB5E6]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B75BB]/10 dark:bg-[#3DB5E6]/10 text-[#1B75BB] dark:text-[#3DB5E6] text-sm font-semibold tracking-widest uppercase mb-6">
            Precios
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Planes transparentes
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Sin sorpresas. Escala tu plan cuando quieras.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!yearly ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600"}`}>
              Mensual
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                yearly ? "bg-[#1B75BB]" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                  yearly ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${yearly ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600"}`}>
              Anual{" "}
              <span className="text-[#1B75BB] font-bold">-20%</span>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-br from-[#1B75BB] to-[#3DB5E6] border-transparent text-white shadow-2xl md:scale-105"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg text-gray-900 dark:text-white"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-white text-[#1B75BB] text-xs font-bold rounded-full shadow">
                    ⭐ Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-white/75" : "text-gray-400 dark:text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.price.monthly ? (
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black">
                      {yearly ? plan.price.yearly : plan.price.monthly}€
                    </span>
                    <span className={`mb-2 text-sm ${plan.highlight ? "text-white/70" : "text-gray-400 dark:text-gray-500"}`}>
                      /mes
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-black">A medida</span>
                )}
              </div>

              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlight ? "text-white" : "text-[#3DB5E6]"
                      }`}
                    />
                    <span className={plan.highlight ? "text-white/90" : "text-gray-600 dark:text-gray-300"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`block text-center px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                  plan.highlight
                    ? "bg-white text-[#1B75BB] hover:shadow-lg"
                    : "bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white hover:shadow-md"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
