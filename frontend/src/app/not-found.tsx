import Link from "next/link";

export const metadata = {
  title: "Página no encontrada · Diamadmin",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 pt-28 pb-16 bg-gradient-to-br from-[#EAF4FB] via-white to-white dark:from-[#020d1a] dark:via-[#0A2540] dark:to-[#020d1a] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <p className="text-[120px] font-black leading-none text-[#3DB5E6]/20 dark:text-[#3DB5E6]/10 select-none mb-0">
            404
          </p>
          <div className="-mt-4 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#3DB5E6]/10 text-[#1B75BB] dark:text-[#3DB5E6] text-xs font-bold tracking-widest uppercase">
              Página no encontrada
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#0A2540] dark:text-white mb-4">
            Esta página no existe
          </h1>
          <p className="text-[#607D8B] dark:text-[#9BA6AD] leading-relaxed mb-8">
            La dirección que buscas no existe o ha cambiado. Puede que hayas seguido un enlace desactualizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1B75BB] to-[#3DB5E6] text-white font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-[#3DB5E6]/30 transition-all text-sm"
            >
              Ir al inicio
            </Link>
            <a
              href="mailto:info@diamadmin.com"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-white/10 text-[#607D8B] dark:text-[#9BA6AD] font-medium px-6 py-3 rounded-full hover:border-[#3DB5E6] hover:text-[#3DB5E6] transition-all text-sm"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
