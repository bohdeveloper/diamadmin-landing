"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Diamadmin error boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#fff8f1] via-white to-white dark:from-[#1a0d00] dark:via-[#1a1a1a] dark:to-[#1a1a1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">
            Error inesperado
          </span>
          <h1 className="text-2xl font-black text-[#0A2540] dark:text-white mb-4">
            Algo ha ido mal
          </h1>
          <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
            Ha ocurrido un error inesperado. Puedes intentarlo de nuevo o volver al inicio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all text-sm"
            >
              Intentar de nuevo
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10 text-[#607D8B] dark:text-[#9BA6AD] font-medium px-6 py-3 rounded-full hover:border-[#3DB5E6] hover:text-[#3DB5E6] transition-all text-sm"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
