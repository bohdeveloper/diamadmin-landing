import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-[#1B75BB] font-bold text-lg">Diamadmin</span>
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-600">
          <span>Diseñado y construido por </span>
          <span className="text-[#3DB5E6] font-medium">Borja Olazabal</span>
          <span className="block mt-0.5">© {new Date().getFullYear()} Diamadmin · Todos los derechos reservados</span>
        </div>

        {/* Legal links */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-600">
          <Link href="/privacidad" className="hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition-colors">
            Privacidad
          </Link>
          <Link href="/cookies" className="hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition-colors">
            Cookies
          </Link>
          <Link href="/aviso-legal" className="hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition-colors">
            Aviso Legal
          </Link>
        </div>

      </div>
    </footer>
  );
}
