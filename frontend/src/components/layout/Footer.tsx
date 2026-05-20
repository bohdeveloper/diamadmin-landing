import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand */}
        <div className="flex items-center">
          <Image
            src="/images/logo_diamadmin.png"
            alt="Diamadmin"
            width={140}
            height={40}
            className="h-8 w-auto"
          />
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
