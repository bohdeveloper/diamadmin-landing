"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function ListaEspera() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail]   = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, website: honeypot }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error ?? "Error al procesar tu solicitud");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="lista-espera"
      className="relative py-24 px-6 bg-gradient-to-br from-[#020d1a] via-[#0A2540] to-[#020d1a] overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-[#3DB5E6]/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#3DB5E6]/15 text-[#3DB5E6] text-xs font-bold tracking-widest uppercase mb-6">
            Acceso anticipado
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            La plataforma está en camino
          </h2>
          <p className="text-lg text-[#9BA6AD] mb-10 max-w-lg mx-auto leading-relaxed">
            Apúntate para ser de los primeros en acceder. Cuando la beta esté lista, te enviamos tu invitación directamente.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#3DB5E6]/20 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3DB5E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-white font-bold text-lg mb-1">¡Te hemos apuntado!</p>
            <p className="text-[#9BA6AD] text-sm">
              Revisa tu email — te hemos enviado una confirmación. Te avisaremos cuando la beta esté lista.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              maxLength={100}
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-[#607D8B] focus:border-[#3DB5E6] focus:outline-none text-sm transition"
            />
            <input
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-[#607D8B] focus:border-[#3DB5E6] focus:outline-none text-sm transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold px-7 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#3DB5E6]/30 transition-all disabled:opacity-60 text-sm whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Quiero acceso"}
            </button>
          </motion.form>
        )}

        {error && (
          <p className="mt-3 text-sm text-orange-400">{error}</p>
        )}

        <p className="mt-4 text-xs text-[#546E7A]">
          Sin spam. Únicamente te contactaremos cuando la beta esté lista.
        </p>
      </div>
    </section>
  );
}
