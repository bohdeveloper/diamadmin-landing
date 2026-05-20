"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Send, Lightbulb, Mail, Loader2 } from "lucide-react";

type Tab = "contacto" | "sugerencia" | "newsletter";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#3DB5E6] focus:outline-none text-sm transition";
const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

export default function Contacto() {
  const [tab, setTab]       = useState<Tab>("contacto");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  // Contacto fields
  const [cNombre,  setCNombre]  = useState("");
  const [cEmpresa, setCEmpresa] = useState("");
  const [cEmail,   setCEmail]   = useState("");
  const [cSector,  setCSector]  = useState("");
  const [cMensaje, setCMensaje] = useState("");

  // Sugerencia fields
  const [sEmail, setSEmail] = useState("");
  const [sTipo,  setSTipo]  = useState("");
  const [sIdea,  setSIdea]  = useState("");

  // Newsletter fields
  const [nNombre, setNNombre] = useState("");
  const [nEmail,  setNEmail]  = useState("");

  // Honeypot
  const [honeypot, setHoneypot] = useState("");

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setSent(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let endpoint = "";
      let payload: Record<string, string> = { website: honeypot };

      if (tab === "contacto") {
        endpoint = "/api/contacto";
        payload = { ...payload, nombre: cNombre, empresa: cEmpresa, email: cEmail, sector: cSector, mensaje: cMensaje };
      } else if (tab === "sugerencia") {
        endpoint = "/api/sugerencia";
        payload = { ...payload, email: sEmail, tipo: sTipo, idea: sIdea };
      } else {
        endpoint = "/api/newsletter";
        payload = { ...payload, nombre: nNombre, email: nEmail };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? "Error al enviar");
      }

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setCNombre(""); setCEmpresa(""); setCEmail(""); setCSector(""); setCMensaje("");
        setSEmail(""); setSTipo(""); setSIdea("");
        setNNombre(""); setNEmail("");
      }, 4500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "contacto",   label: "Contacto",   icon: <Send className="w-4 h-4" /> },
    { key: "sugerencia", label: "Sugerencia", icon: <Lightbulb className="w-4 h-4" /> },
    { key: "newsletter", label: "Newsletter", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <section
      id="contacto"
      className="relative py-28 px-6 bg-gradient-to-br from-[#1B75BB] via-[#2E9AC9] to-[#3DB5E6] overflow-hidden"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Pulse rings */}
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Hablemos</h2>
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
                onClick={() => handleTabChange(t.key)}
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tab === "newsletter" ? "¡Casi listo!" : "¡Enviado!"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {tab === "contacto"   && "Mensaje recibido. Revisa tu correo, te hemos enviado una confirmación."}
                  {tab === "sugerencia" && "Sugerencia recibida. ¡Gracias por ayudarnos a mejorar!"}
                  {tab === "newsletter" && "Revisa tu email y confirma tu suscripción. El enlace expira en 48 horas."}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                />

                {/* ── CONTACTO ── */}
                {tab === "contacto" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Nombre *</label>
                        <input required className={inputCls} placeholder="Tu nombre"
                          value={cNombre} onChange={(e) => setCNombre(e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Empresa</label>
                        <input className={inputCls} placeholder="Tu empresa"
                          value={cEmpresa} onChange={(e) => setCEmpresa(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input required type="email" className={inputCls} placeholder="correo@empresa.com"
                        value={cEmail} onChange={(e) => setCEmail(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Sector</label>
                      <select className={inputCls} value={cSector} onChange={(e) => setCSector(e.target.value)}>
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
                      <label className={labelCls}>Mensaje *</label>
                      <textarea required rows={4} className={inputCls + " resize-none"}
                        placeholder="Cuéntanos tu caso..."
                        value={cMensaje} onChange={(e) => setCMensaje(e.target.value)} />
                    </div>
                  </>
                )}

                {/* ── SUGERENCIA ── */}
                {tab === "sugerencia" && (
                  <>
                    <div>
                      <label className={labelCls}>Tu email *</label>
                      <input required type="email" className={inputCls} placeholder="correo@empresa.com"
                        value={sEmail} onChange={(e) => setSEmail(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Tipo de sugerencia *</label>
                      <select required className={inputCls} value={sTipo} onChange={(e) => setSTipo(e.target.value)}>
                        <option value="">Selecciona un tipo...</option>
                        <option>Nuevo módulo</option>
                        <option>Mejora de funcionalidad</option>
                        <option>Integración</option>
                        <option>Experiencia de usuario</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Tu idea *</label>
                      <textarea required rows={5} className={inputCls + " resize-none"}
                        placeholder="Describe tu sugerencia con detalle..."
                        value={sIdea} onChange={(e) => setSIdea(e.target.value)} />
                    </div>
                  </>
                )}

                {/* ── NEWSLETTER ── */}
                {tab === "newsletter" && (
                  <>
                    <div className="text-center py-4 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#3DB5E6] to-[#1B75BB] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Recibe novedades, nuevos módulos y casos de uso directamente en tu bandeja.
                        Sin spam, solo contenido de valor.
                      </p>
                    </div>
                    <div>
                      <label className={labelCls}>Nombre *</label>
                      <input required className={inputCls} placeholder="Tu nombre"
                        value={nNombre} onChange={(e) => setNNombre(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input required type="email" className={inputCls} placeholder="correo@empresa.com"
                        value={nEmail} onChange={(e) => setNEmail(e.target.value)} />
                    </div>
                  </>
                )}

                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-center -mt-1">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold rounded-xl hover:shadow-lg transition-shadow mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                  ) : (
                    tab === "newsletter" ? "Suscribirme" :
                    tab === "sugerencia" ? "Enviar sugerencia" :
                    "Enviar mensaje"
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
