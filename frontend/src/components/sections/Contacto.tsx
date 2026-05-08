"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Send, Lightbulb, Mail } from "lucide-react";

type Tab = "contacto" | "sugerencia" | "newsletter";

const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#3DB5E6] focus:outline-none text-sm transition";
const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function Contacto() {
  const [tab, setTab] = useState<Tab>("contacto");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "contacto", label: "Contacto", icon: <Send className="w-4 h-4" /> },
    { key: "sugerencia", label: "Sugerencia", icon: <Lightbulb className="w-4 h-4" /> },
    { key: "newsletter", label: "Newsletter", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <section
      id="contacto"
      className="relative py-28 px-6 bg-gradient-to-br from-[#1B75BB] via-[#2E9AC9] to-[#3DB5E6] overflow-hidden"
    >
      {/* Data grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Impact wave decoration */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.05, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-white/20 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1.5, 1.2], opacity: [0.07, 0.03, 0.07] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/10 pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Hablemos
          </h2>
          <p className="text-lg text-white/80">
            Estamos aquí para ayudarte a encontrar la solución perfecta para tu negocio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSent(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
                  tab === t.key
                    ? "text-[#1B75BB] dark:text-[#3DB5E6] border-b-2 border-[#1B75BB] dark:border-[#3DB5E6] bg-[#1B75BB]/5 dark:bg-[#3DB5E6]/10"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div className="p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Enviado!</h3>
                <p className="text-gray-500 dark:text-gray-400">Nos pondremos en contacto contigo pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {tab === "contacto" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Nombre</label>
                        <input required className={inputCls} placeholder="Tu nombre" />
                      </div>
                      <div>
                        <label className={labelCls}>Empresa</label>
                        <input className={inputCls} placeholder="Tu empresa" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input required type="email" className={inputCls} placeholder="correo@empresa.com" />
                    </div>
                    <div>
                      <label className={labelCls}>Sector</label>
                      <select className={inputCls}>
                        <option value="">Selecciona tu sector...</option>
                        <option>Retail</option>
                        <option>Hostelería</option>
                        <option>Logística</option>
                        <option>Salud</option>
                        <option>Industria</option>
                        <option>Real Estate</option>
                        <option>Finanzas</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Mensaje</label>
                      <textarea required rows={4} className={inputCls + " resize-none"} placeholder="Cuéntanos tu caso..." />
                    </div>
                  </>
                )}

                {tab === "sugerencia" && (
                  <>
                    <div>
                      <label className={labelCls}>Tu email (opcional)</label>
                      <input type="email" className={inputCls} placeholder="correo@empresa.com" />
                    </div>
                    <div>
                      <label className={labelCls}>Tipo de sugerencia</label>
                      <select className={inputCls}>
                        <option>Nuevo módulo</option>
                        <option>Mejora de funcionalidad</option>
                        <option>Integración</option>
                        <option>Experiencia de usuario</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Tu idea</label>
                      <textarea required rows={5} className={inputCls + " resize-none"} placeholder="Describe tu sugerencia con detalle..." />
                    </div>
                  </>
                )}

                {tab === "newsletter" && (
                  <>
                    <div className="text-center py-4 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Recibe novedades, nuevos módulos y casos de uso directamente en tu bandeja de entrada.
                        Sin spam, solo contenido de valor.
                      </p>
                    </div>
                    <div>
                      <label className={labelCls}>Nombre</label>
                      <input required className={inputCls} placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input required type="email" className={inputCls} placeholder="correo@empresa.com" />
                    </div>
                  </>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold rounded-xl hover:shadow-lg transition-shadow mt-2"
                >
                  {tab === "newsletter" ? "Suscribirme" : tab === "sugerencia" ? "Enviar sugerencia" : "Enviar mensaje"}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
