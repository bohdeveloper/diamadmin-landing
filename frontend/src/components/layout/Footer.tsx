export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* ... */}
        <div>
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-600">
          <span>Diseñado y construido por </span>
          <span className="text-[#3DB5E6] font-medium">Borja Olazabal</span>
          <span className="block mt-0.5">© {new Date().getFullYear()} Diamadmin · Todos los derechos reservados</span>
        </div>

        {/* ... */}
        <div>
        </div>
      </div>
    </footer>
  );
}
