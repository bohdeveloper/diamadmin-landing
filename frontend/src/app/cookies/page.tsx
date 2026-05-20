import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies · Diamadmin",
  description:
    "Información sobre las cookies que utiliza el sitio web de Diamadmin y cómo gestionarlas.",
  alternates: { canonical: "https://www.diamadmin.com/cookies" },
  robots: { index: true, follow: false },
};

export default function CookiesPage() {
  return (
    <div>
      {/* ── HEADER ── */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-[#fff8f0] via-white to-white dark:from-[#1f1209] dark:via-gray-950 dark:to-gray-950">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#1B75BB] hover:underline mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1" fill="#F59E0B" stroke="none"/><circle cx="15" cy="8" r="1.5" fill="#F59E0B" stroke="none"/><circle cx="14" cy="15" r="1" fill="#F59E0B" stroke="none"/><circle cx="9" cy="15" r="1.5" fill="#F59E0B" stroke="none"/></svg>
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Pol&iacute;tica de Cookies
            </h1>
          </div>
          <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD]">
            &Uacute;ltima actualizaci&oacute;n: <strong>mayo de 2026</strong>
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-10 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 space-y-10">

          <p className="text-[#455A64] dark:text-[#9BA6AD] text-sm leading-relaxed">
            Esta pol&iacute;tica explica qu&eacute; son las cookies, qu&eacute; uso hace de ellas diamadmin.com y c&oacute;mo puedes
            gestionarlas, de conformidad con la{" "}
            <strong className="text-gray-900 dark:text-white">
              Ley 34/2002 (LSSI-CE)
            </strong>{" "}
            y las directrices de la{" "}
            <strong className="text-gray-900 dark:text-white">
              Agencia Espa&ntilde;ola de Protecci&oacute;n de Datos (AEPD)
            </strong>
            .
          </p>

          {/* 1 */}
          <div id="que-son" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold flex items-center justify-center">1</span>
              &iquest;Qu&eacute; son las cookies?
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              Las cookies son peque&ntilde;os archivos de texto que un sitio web almacena en tu dispositivo cuando lo
              visitas. Permiten al sitio recordar informaci&oacute;n entre p&aacute;ginas o entre visitas (por ejemplo,
              tu preferencia de tema claro/oscuro). Existen distintos tipos seg&uacute;n su origen, duraci&oacute;n y finalidad.
            </p>
          </div>

          {/* 2 */}
          <div id="uso" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold flex items-center justify-center">2</span>
              &iquest;Qu&eacute; cookies utiliza diamadmin.com?
            </h2>

            <div className="mb-5 bg-[#EAF4FB] dark:bg-[#1B75BB]/10 border-l-4 border-[#1B75BB] rounded-r-xl p-4 text-sm">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">
                diamadmin.com no utiliza cookies de seguimiento, anal&iacute;tica ni publicidad.
              </p>
              <p className="text-[#455A64] dark:text-[#9BA6AD]">
                No instalamos rastreadores de terceros (Google Analytics, Meta Pixel, etc.). Tu navegaci&oacute;n
                no es monitizada ni compartida con redes publicitarias.
              </p>
            </div>

            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed mb-4">
              El sitio utiliza &uacute;nicamente los elementos t&eacute;cnicos estrictamente necesarios para su
              funcionamiento correcto:
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-white/10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f7f9fa] dark:bg-white/5 text-left">
                    <th className="p-3 font-semibold text-gray-900 dark:text-white">Nombre</th>
                    <th className="p-3 font-semibold text-gray-900 dark:text-white">Tipo</th>
                    <th className="p-3 font-semibold text-gray-900 dark:text-white">Finalidad</th>
                    <th className="p-3 font-semibold text-gray-900 dark:text-white">Duraci&oacute;n</th>
                  </tr>
                </thead>
                <tbody className="text-[#455A64] dark:text-[#9BA6AD]">
                  <tr className="border-t border-gray-100 dark:border-white/10">
                    <td className="p-3 font-mono text-xs">theme<br/><span className="text-[#9BA6AD] font-sans">(localStorage)</span></td>
                    <td className="p-3">T&eacute;cnica propia</td>
                    <td className="p-3">Recordar la preferencia de tema claro/oscuro seleccionada por el usuario.</td>
                    <td className="p-3">Persistente (local, borrable desde el navegador)</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-white/10">
                    <td className="p-3 font-mono text-xs">cookies-accepted<br/><span className="text-[#9BA6AD] font-sans">(localStorage)</span></td>
                    <td className="p-3">T&eacute;cnica propia</td>
                    <td className="p-3">Recordar que el usuario ha le&iacute;do y aceptado el aviso de cookies.</td>
                    <td className="p-3">Persistente (local, borrable desde el navegador)</td>
                  </tr>
                  <tr className="border-t border-gray-100 dark:border-white/10">
                    <td className="p-3 font-mono text-xs">__cf_bm<br/>_cfuvid</td>
                    <td className="p-3">T&eacute;cnica de tercero (Cloudflare)</td>
                    <td className="p-3">Protecci&oacute;n frente a bots y ataques automatizados. Gestionada por Cloudflare, proveedor de alojamiento del sitio.</td>
                    <td className="p-3">Sesi&oacute;n / 30 min</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-[#9BA6AD] mt-3">
              * Los elementos marcados como <em>localStorage</em> no son cookies en sentido estricto (no se
              env&iacute;an al servidor), pero quedan sujetos a las mismas directrices de informaci&oacute;n de la AEPD por
              tratarse de almacenamiento local del terminal del usuario.
            </p>
          </div>

          {/* 3 */}
          <div id="gestion" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold flex items-center justify-center">3</span>
              &iquest;C&oacute;mo gestionar las cookies?
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed mb-4">
              Puedes configurar tu navegador para bloquear o eliminar todas las cookies (incluidas las t&eacute;cnicas),
              aunque ten en cuenta que algunas funcionalidades del sitio pueden dejar de funcionar correctamente.
              Aqu&iacute; tienes los enlaces a las instrucciones de los principales navegadores:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { name: "Google Chrome",   url: "https://support.google.com/chrome/answer/95647" },
                { name: "Mozilla Firefox", url: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we" },
                { name: "Apple Safari",    url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac" },
                { name: "Microsoft Edge",  url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
              ].map((b) => (
                <a
                  key={b.name}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-gray-100 dark:border-white/10 rounded-lg text-sm text-[#455A64] dark:text-[#9BA6AD] hover:border-[#1B75BB] hover:text-[#1B75BB] dark:hover:border-[#3DB5E6] dark:hover:text-[#3DB5E6] transition-colors"
                >
                  {b.name}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              ))}
            </div>

            <div className="mt-5 p-4 bg-[#f7f9fa] dark:bg-white/5 rounded-xl text-sm text-[#455A64] dark:text-[#9BA6AD]">
              <p className="font-semibold text-gray-900 dark:text-white mb-1">Borrar el almacenamiento local</p>
              <p>Para borrar los datos guardados en localStorage por diamadmin.com, abre las herramientas
              de desarrollo del navegador (F12) &rarr; Application &rarr; Local Storage &rarr; diamadmin.com &rarr; seleccionar
              y eliminar las entradas{" "}
              <code className="bg-gray-100 dark:bg-white/10 px-1 rounded text-xs">theme</code> y{" "}
              <code className="bg-gray-100 dark:bg-white/10 px-1 rounded text-xs">cookies-accepted</code>.</p>
            </div>
          </div>

          {/* 4 */}
          <div id="actualizaciones" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold flex items-center justify-center">4</span>
              Actualizaciones de esta pol&iacute;tica
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              Esta pol&iacute;tica puede actualizarse cuando introduzcamos nuevas funcionalidades en el sitio o cuando
              cambien las obligaciones legales aplicables. Los cambios se publicar&aacute;n en esta misma p&aacute;gina con la
              fecha de actualizaci&oacute;n. Para cualquier duda, puedes escribirnos a{" "}
              <a href="mailto:info@diamadmin.com" className="text-[#1B75BB] dark:text-[#3DB5E6] hover:underline">info@diamadmin.com</a>.
            </p>
          </div>

          {/* Footer nav */}
          <div className="border-t border-gray-100 dark:border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4 text-sm">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[#1B75BB] dark:text-[#3DB5E6] hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Volver al inicio
            </Link>
            <div className="flex gap-4 text-[#607D8B] dark:text-[#9BA6AD]">
              <Link href="/privacidad" className="hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition-colors">Privacidad</Link>
              <Link href="/aviso-legal" className="hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition-colors">Aviso Legal</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
