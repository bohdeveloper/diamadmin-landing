import Link from "next/link";

type Tipo = "generado" | "asistido";

const TEXTOS: Record<Tipo, string> = {
  generado:
    "Este contenido ha sido generado mediante inteligencia artificial y revisado por el equipo de Diamadmin antes de su publicación.",
  asistido:
    "Este contenido ha sido elaborado con asistencia de inteligencia artificial y revisado por el equipo de Diamadmin antes de su publicación.",
};

/**
 * Aviso de contenido generado con IA (Reglamento (UE) 2024/1689, art. 50).
 *
 * Colócalo junto al contenido que identifica —al inicio de un artículo, no en
 * el layout global—: el aviso debe acompañar al contenido concreto que es
 * generado con IA, no a páginas escritas por personas.
 */
export default function AvisoIA({
  tipo = "asistido",
  className = "",
}: {
  tipo?: Tipo;
  className?: string;
}) {
  return (
    <aside
      role="note"
      aria-label="Aviso de contenido generado con inteligencia artificial"
      className={`flex items-start gap-3 rounded-xl bg-[#f7f9fa] dark:bg-white/5 border border-gray-100 dark:border-white/10 p-4 text-sm text-[#455A64] dark:text-[#9BA6AD] ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#607D8B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <path d="M9.9 4.2 12 2l2.1 2.2 2.9-.4.4 2.9L20 8.4 18.6 11 20 13.6l-2.6 1.7-.4 2.9-2.9-.4L12 20l-2.1-2.2-2.9.4-.4-2.9L4 13.6 5.4 11 4 8.4l2.6-1.7.4-2.9z" />
        <path d="M12 8v4" />
        <path d="M12 15h.01" />
      </svg>
      <p className="leading-relaxed">
        {TEXTOS[tipo]}{" "}
        <Link
          href="/aviso-legal#inteligencia-artificial"
          className="text-[#1B75BB] dark:text-[#3DB5E6] hover:underline"
        >
          Más información
        </Link>
        .
      </p>
    </aside>
  );
}
