"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function BajaContent() {
  const params = useSearchParams();
  const ok = params.get("ok");
  const error = params.get("error");

  if (ok === "1") {
    return (
      <div className="min-h-screen flex flex-col">
        <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#f5f7fa] via-white to-white dark:from-[#0d1117] dark:via-[#1a1a1a] dark:to-[#1a1a1a] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[#3DB5E6]/15 flex items-center justify-center mx-auto mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3DB5E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#3DB5E6]/10 text-[#1B75BB] dark:text-[#3DB5E6] text-xs font-bold tracking-widest uppercase mb-4">
              Baja procesada
            </span>
            <h1 className="text-3xl font-black text-[#0A2540] dark:text-white mb-4">
              Te has dado de baja
            </h1>
            <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
              No recibirás más emails del newsletter de Diamadmin. Si cambias de opinión, siempre puedes volver a suscribirte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-[#3DB5E6]/30 transition-all text-sm"
              >
                Volver a suscribirme
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10 text-[#607D8B] dark:text-[#9BA6AD] font-medium px-6 py-3 rounded-full hover:border-[#3DB5E6] hover:text-[#3DB5E6] transition-all text-sm"
              >
                Ir a Diamadmin
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error === "1") {
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
            <h1 className="text-3xl font-black text-[#0A2540] dark:text-white mb-4">
              Enlace no válido
            </h1>
            <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
              Este enlace de baja no es válido o ya fue utilizado. Si quieres darte de baja escríbenos directamente a{" "}
              <a href="mailto:info@diamadmin.com" className="text-[#3DB5E6] hover:underline">info@diamadmin.com</a>.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-[#3DB5E6] hover:underline font-medium text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Volver al inicio
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#f5f7fa] via-white to-white dark:from-[#0d1117] dark:via-[#1a1a1a] dark:to-[#1a1a1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#3DB5E6]/15 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3DB5E6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-[#0A2540] dark:text-white mb-4">
            Gestión del newsletter
          </h1>
          <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
            Para darte de baja del newsletter usa el enlace que aparece al pie de cada email que te enviamos. Si tienes algún problema escríbenos a{" "}
            <a href="mailto:info@diamadmin.com" className="text-[#3DB5E6] hover:underline">info@diamadmin.com</a>.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-[#3DB5E6] hover:underline font-medium text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function BajaPage() {
  return (
    <Suspense>
      <BajaContent />
    </Suspense>
  );
}
