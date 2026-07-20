import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal · Diamadmin",
  description:
    "Aviso Legal de Diamadmin conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE).",
  alternates: { canonical: "https://www.diamadmin.com/aviso-legal" },
  robots: { index: true, follow: false },
};

export default function AvisoLegalPage() {
  return (
    <div>
      {/* ── HEADER ── */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-[#f0f4f5] via-white to-white dark:from-[#131a1e] dark:via-gray-950 dark:to-gray-950">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#1B75BB] hover:underline mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a inicio
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-[#607D8B]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#607D8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Aviso Legal
            </h1>
          </div>
          <p className="text-sm text-[#607D8B] dark:text-[#9BA6AD]">
            &Uacute;ltima actualizaci&oacute;n: <strong>julio de 2026</strong>
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-10 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 space-y-10">

          <p className="text-[#455A64] dark:text-[#9BA6AD] text-sm leading-relaxed">
            El presente Aviso Legal regula el acceso y uso del sitio web{" "}
            <a href="https://www.diamadmin.com" className="text-[#1B75BB] dark:text-[#3DB5E6] hover:underline">www.diamadmin.com</a>,
            de conformidad con lo establecido en la{" "}
            <strong className="text-gray-900 dark:text-white">Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Informaci&oacute;n y de Comercio Electr&oacute;nico (LSSI-CE)</strong>.
            El acceso a este sitio implica la aceptaci&oacute;n de las condiciones recogidas en este Aviso Legal.
          </p>

          {/* 1 */}
          <div id="titular" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">1</span>
              Datos del titular del sitio web
            </h2>
            <div className="bg-[#f7f9fa] dark:bg-white/5 rounded-xl p-4 text-sm text-[#455A64] dark:text-[#9BA6AD] space-y-1.5">
              <p><span className="font-semibold text-gray-900 dark:text-white w-40 inline-block">Denominaci&oacute;n:</span> Diamadmin (proyecto en desarrollo)</p>
              <p><span className="font-semibold text-gray-900 dark:text-white w-40 inline-block">Actividad:</span> Plataforma de administraci&oacute;n empresarial modular para pymes</p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-white w-40 inline-block">Contacto:</span>
                <a href="mailto:info@diamadmin.com" className="text-[#1B75BB] dark:text-[#3DB5E6] hover:underline">info@diamadmin.com</a>
              </p>
              <p>
                <span className="font-semibold text-gray-900 dark:text-white w-40 inline-block">Sitio web:</span>
                <a href="https://www.diamadmin.com" className="text-[#1B75BB] dark:text-[#3DB5E6] hover:underline">https://www.diamadmin.com</a>
              </p>
              <p className="text-xs text-[#9BA6AD] pt-1">
                El proyecto Diamadmin se encuentra en proceso de constituci&oacute;n como entidad jur&iacute;dica. Los datos
                registrales (NIF/CIF, domicilio social, inscripci&oacute;n registral) ser&aacute;n publicados en cuanto quede
                formalizada la sociedad.
              </p>
            </div>
          </div>

          {/* 2 */}
          <div id="objeto" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">2</span>
              Objeto y uso del sitio web
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              www.diamadmin.com es el sitio web informativo del proyecto Diamadmin, cuyo prop&oacute;sito es presentar
              la plataforma de administraci&oacute;n empresarial, recoger suscripciones al newsletter y gestionar consultas
              de empresas interesadas. El usuario se compromete a hacer un uso adecuado del sitio web de conformidad
              con la ley, la moral, el orden p&uacute;blico y el presente Aviso Legal, absteni&eacute;ndose de utilizarlo con
              fines il&iacute;citos o que perjudiquen a terceros.
            </p>
          </div>

          {/* 3 */}
          <div id="propiedad-intelectual" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">3</span>
              Propiedad intelectual e industrial
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed mb-3">
              Todos los contenidos del sitio web &mdash;incluyendo, sin car&aacute;cter limitativo, textos, im&aacute;genes,
              dise&ntilde;o gr&aacute;fico, logotipos, iconos, c&oacute;digo fuente y arquitectura t&eacute;cnica&mdash; son propiedad de Diamadmin
              o de sus leg&iacute;timos propietarios, y est&aacute;n protegidos por la legislaci&oacute;n espa&ntilde;ola e internacional
              sobre propiedad intelectual e industrial.
            </p>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              Queda expresamente prohibida la reproducci&oacute;n, distribuci&oacute;n, modificaci&oacute;n, transformaci&oacute;n o
              comunicaci&oacute;n p&uacute;blica de dichos contenidos sin autorizaci&oacute;n previa y por escrito. El uso del
              contenido con fines comerciales no autorizados podr&aacute; dar lugar a las acciones legales oportunas.
            </p>
          </div>

          {/* 4 */}
          <div id="responsabilidad" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">4</span>
              Exclusi&oacute;n de garant&iacute;as y responsabilidad
            </h2>
            <div className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed space-y-3">
              <p>
                Diamadmin no garantiza la disponibilidad y continuidad ininterrumpida del sitio web. En la medida
                en que lo permita el ordenamiento jur&iacute;dico, Diamadmin excluye toda responsabilidad por da&ntilde;os y
                perjuicios de cualquier naturaleza derivados de la indisponibilidad temporal del sitio o de errores
                en los contenidos.
              </p>
              <p>
                Los contenidos del sitio se ofrecen a t&iacute;tulo meramente informativo sobre el proyecto Diamadmin, que
                se encuentra en fase de desarrollo. Las caracter&iacute;sticas, funcionalidades, m&oacute;dulos y fechas de
                disponibilidad indicadas son aproximadas y pueden estar sujetas a cambios.
              </p>
              <p>
                Diamadmin se reserva el derecho de modificar, suspender, cancelar o restringir el contenido del
                sitio web, los enlaces o la informaci&oacute;n accesible a trav&eacute;s de &eacute;l, sin necesidad de previo aviso.
              </p>
            </div>
          </div>

          {/* 5 */}
          <div id="enlaces" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">5</span>
              Pol&iacute;tica de enlaces
            </h2>
            <div className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed space-y-3">
              <p>
                El sitio web puede contener enlaces a p&aacute;ginas web de terceros. Diamadmin no controla ni se responsabiliza
                del contenido, pol&iacute;ticas de privacidad ni pr&aacute;cticas de esos sitios externos. La presencia de un
                enlace no implica respaldo ni recomendaci&oacute;n.
              </p>
              <p>
                Cualquier persona o entidad que desee establecer un enlace hacia www.diamadmin.com deber&aacute; obtener
                autorizaci&oacute;n previa por escrito. El enlace no podr&aacute; reproducir los contenidos del sitio, crear
                marcos (<em>frames</em>) que lo oculten ni sugerir una relaci&oacute;n comercial inexistente.
              </p>
            </div>
          </div>

          {/* 6 */}
          <div id="inteligencia-artificial" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">6</span>
              Contenidos generados con inteligencia artificial
            </h2>
            <div className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed space-y-3">
              <p>
                En cumplimiento de las obligaciones de transparencia previstas en el{" "}
                <strong className="text-gray-900 dark:text-white">Reglamento (UE) 2024/1689
                (Reglamento de Inteligencia Artificial)</strong>, Diamadmin informa de que los contenidos
                publicados en este sitio web que hayan sido generados o modificados de forma significativa
                mediante sistemas de inteligencia artificial se identifican de manera clara y visible como tales,
                junto al propio contenido.
              </p>
              <p>
                A fecha de la &uacute;ltima actualizaci&oacute;n de este Aviso Legal,{" "}
                <strong className="text-gray-900 dark:text-white">los contenidos de este sitio web
                han sido elaborados por personas</strong>. Cuando se publiquen contenidos generados con
                asistencia de inteligencia artificial &mdash;por ejemplo, art&iacute;culos divulgativos&mdash;
                incorporar&aacute;n el aviso correspondiente y este apartado se actualizar&aacute; en consecuencia.
              </p>
              <p>
                La utilizaci&oacute;n de estas herramientas no exime a Diamadmin de su responsabilidad sobre el
                contenido publicado, que es revisado antes de su difusi&oacute;n.
              </p>
            </div>
          </div>

          {/* 7 */}
          <div id="ley-aplicable" className="scroll-mt-28">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#607D8B]/20 text-[#607D8B] dark:text-[#9BA6AD] text-xs font-bold flex items-center justify-center">7</span>
              Ley aplicable y jurisdicci&oacute;n
            </h2>
            <p className="text-sm text-[#455A64] dark:text-[#9BA6AD] leading-relaxed">
              El presente Aviso Legal se rige por la legislaci&oacute;n espa&ntilde;ola. Para la resoluci&oacute;n de cualquier
              controversia derivada del acceso o uso de este sitio web, las partes se someten, con renuncia
              expresa a cualquier otro fuero que pudiera corresponderles, a la jurisdicci&oacute;n y competencia de
              los Juzgados y Tribunales de Espa&ntilde;a.
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
              <Link href="/cookies" className="hover:text-[#1B75BB] dark:hover:text-[#3DB5E6] transition-colors">Cookies</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
