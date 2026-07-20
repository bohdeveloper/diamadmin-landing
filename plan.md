# plan.md — Diamadmin Landing

> Plan de trabajo vivo (Spec-Driven Development). Contexto y metodología en [spec.md](spec.md).
> Reglas: nada se implementa sin su punto aquí · al terminar se marca `[x]` con fecha ·
> las tareas grandes se desglosan en fases antes de empezar.
> El detalle punto por punto de lo completado vive en el historial de git.

---

## Estado actual (2026-07-20)

| Fase | Estado |
|---|---|
| Fase 0 — Landing y validación | ✅ Completada |
| Fase 1 — Métricas, conversión y calidad | ✅ Completada (con puntos pospuestos, ver abajo) |
| **Fase 2 — Contenido SEO y autoridad** | ⏳ **En curso — prioridad actual** |
| Fase 3 — Conversión hacia la app | ⏳ Pendiente (bloqueada hasta que haya alpha) |

**Pendiente inmediato**

- Working tree con la migración de graphify → codebase-memory-mcp **sin commitear**.
  `.mcp.json` y `.codebase-memory/` (snapshot + visor) deben entrar en ese commit.
- Adopción de Spec-Driven Development: `spec.md` y `plan.md` creados, `ROADMAP.md` fusionado aquí y eliminado.
- Decisión de negocio esperando al usuario: **estrategia de precios** (bloquea la sección de suscripción).

---

## Fase 2 — Contenido SEO y autoridad ⏳ EN CURSO

**Objetivo:** posicionamiento orgánico y captación de tráfico cualificado.

- [ ] Sección `/blog` con artículos sobre gestión empresarial, stock y facturación para pymes
  - [ ] Estructura de rutas y layout del blog compatible con static export
  - [ ] Sitemap y JSON-LD (`Article`/`BlogPosting`) para cada artículo
- [ ] Artículos para las palabras clave objetivo (ERP pymes, gestión de stock, software de facturación)
- [ ] Páginas de detalle por módulo (`/modulos/stock`, `/modulos/facturacion`, …)
- [ ] Páginas por sector (`/sectores/hosteleria`, `/sectores/logistica`, `/sectores/comercio`)
  - Reaprovechar el contenido ya escrito en las cápsulas sectoriales (`capsulas/capsula-hosteleria.html`, `capsula-retail.html`)
- [ ] FAQ expandida con rich snippets (ampliar el JSON-LD `FAQPage` existente)
- [ ] Testimonios y casos de uso reales *(bloqueado: requiere primeros usuarios)*
- [ ] Auditoría de rendimiento con `web-perf` antes de cerrar la fase (el contenido nuevo no debe degradar Core Web Vitals)

---

## Robustez del envío de newsletter (2026-07-20)

Auditoría de `/api/broadcast` y `getBrevoListContacts`. La paginación, los tokens HMAC de baja y
el placeholder `{{unsubscribe_url}}` de las 12 cápsulas se verificaron correctos; los fallos eran
de escala y de honestidad en el reporte.

- [x] Envío por lotes con concurrencia limitada, respetando el tope de subrequests de Cloudflare Workers (50 en plan gratuito), con cursor `nextOffset` para continuar *(2026-07-20)*
- [x] `getBrevoListContacts` lanza `BrevoError` en vez de devolver una lista parcial en silencio *(2026-07-20)*
- [x] Respuesta honesta del broadcast: `success` solo si no hubo fallos ni pendientes, con los destinatarios fallidos y estado HTTP 200/207/502 *(2026-07-20)*
- [x] Abortar el run si Brevo agota la cuota diaria o nos throttlea (402/429) *(2026-07-20)*
- [ ] Tests de los handlers de broadcast y newsletter (enlaza con el punto pospuesto de cobertura)
- [ ] Valorar `MAIL_TEST_TO` en broadcast para tener un modo de prueba real sin tocar la lista

## Aviso de contenido generado con IA (2026-07-20)

Reglamento (UE) 2024/1689, art. 50 — obligaciones de transparencia aplicables desde el 2 de agosto de 2026.

- [x] Apartado 6 del aviso legal con la política de etiquetado de contenido generado con IA *(2026-07-20)*
- [x] Componente reutilizable `AvisoIA` listo para adjuntar al contenido que lo requiera *(2026-07-20)*
- [ ] **Confirmar el alcance con un abogado.** Está pendiente de verificar si la obligación del art. 50.4 alcanza a este sitio, y en qué queda la ley española que desarrolla el régimen sancionador
- [ ] Al publicar el blog de Fase 2: adjuntar `<AvisoIA />` a cada artículo generado con IA y actualizar el apartado 6 del aviso legal (hoy declara que los contenidos son de elaboración humana)

---

## Pospuestos de Fase 1 (recuperables en cualquier momento)

- [ ] Tracking de eventos clave en Umami: clic en CTA, envíos de formulario, scroll depth
- [ ] Ampliar cobertura de tests a los handlers de API: contacto, sugerencias, newsletter, lista de espera
- [ ] Revisión de accesibilidad (usar el agente `ux-ui-designer`)
- [ ] A/B testing básico del headline principal

---

## Deuda técnica reconocida

- [ ] **Unificar paletas web y email** — la web usa cian (`#00a8bf` / `#00e7eb`) y los emails azul Diamadmin (`#1B75BB` / `#3DB5E6` / `#0A2540`). Decidir cuál es la marca real y alinear ambas. Ver [spec.md §4](spec.md).
- [ ] Reactivar el typecheck en el build (hoy `NEXT_DISABLE_TYPECHECK=1` en `npm run build`)
- [ ] `src/styles/variables.css` está vacío: poblarlo con los tokens o eliminarlo

---

## Fase 3 — Conversión hacia la app ⏳ PENDIENTE

**Objetivo:** preparar la landing para cuando la app esté disponible. Bloqueada hasta que haya alpha.

- [ ] CTA principal apuntando a registro / lista de espera cuando haya alpha
- [ ] Notas de versión / changelog público (`/changelog`)
- [ ] Documentación básica de usuario (`/docs`)
- [ ] Estado del sistema visible (uptime, versión actual)

---

## Decisiones abiertas

- [ ] **Estrategia de precios.** Los precios están ocultos deliberadamente ([spec.md §3](spec.md), invariante 10). Hasta que se decida, la sección de suscripción no puede activarse ni se deben inventar cifras.

---

## Histórico de fases completadas

<details>
<summary><b>Fase 0 — Landing y validación ✅</b> (hasta 2026-06)</summary>

Landing estática desplegada en `diamadmin.com` con identidad visual completa (paleta, tipografía,
iconografía, motivo de diamante y honeycomb), animaciones con Framer Motion, dark/light mode con
persistencia y diseño responsive mobile-first.

**SEO técnico completo:** JSON-LD (`SoftwareApplication`, `Organization`, `FAQPage`, `WebSite`),
Open Graph y Twitter Cards con imagen real, sitemap dinámico (`app/sitemap.ts`), robots.txt,
favicon + Apple Touch Icon + Web Manifest, canonical URLs y redirección 301 apex → www.

**Email y captación** — se construyó el sistema de mailing completo sobre Cloudflare Pages
Functions + Brevo (migrado desde las API routes de Next.js): formulario de contacto con honeypot,
formulario de sugerencias, newsletter con double opt-in, gestión de bajas con token HMAC firmado,
endpoint de derecho al olvido (`/api/delete-data`), endpoint de envío masivo (`/api/broadcast`,
protegido con `BROADCAST_SECRET`), 12 plantillas cápsula de newsletter y notificaciones al admin
en cada acción.

**Legal:** política de privacidad (RGPD/LOPD-GDD), política de cookies (LSSI-CE/AEPD), aviso legal
y cookie banner con persistencia.

**Seguridad** (commit `3dcb4a9`): middleware de API con CORS, límite de tamaño y security headers;
`_headers` con CSP; rate limiting por IP sobre Cloudflare KV en todos los endpoints públicos;
comparación timing-safe en broadcast; `maxLength` en todos los inputs.

**Calidad:** 29 tests de Vitest (validación, HMAC, generación de emails); eliminado el código muerto
(`mailer.ts`, `emails.ts` duplicado, `utils.ts`) y la dependencia de nodemailer.

</details>

<details>
<summary><b>Fase 1 — Métricas, conversión y calidad ✅</b> (2026-06)</summary>

Umami Analytics activado (sin cookies, website ID `ef92d61a-ea38-4566-862c-14d2d516774b`).

Páginas de flujo creadas: confirmación de suscripción (`/confirmar`) con CTA, baja confirmada
(`/baja`) con opción de reactivar, y páginas de error personalizadas (`/404`, `/500`).
`confirm.ts` y `unsubscribe.ts` se refactorizaron para redirigir a esas páginas Next.js en lugar
de devolver HTML inline (commit `8350ada`).

Captación anticipada: sección de lista de espera (`#lista-espera`) con su endpoint
`/api/lista-espera`, email de confirmación y alta en la lista de contactos de Brevo
(corrección del alta silenciosa en `b281b8e`).

Cuatro puntos quedaron pospuestos y siguen vivos arriba: tracking de eventos, ampliación de tests
de handlers, accesibilidad y A/B testing.

</details>

<details>
<summary><b>Migración del grafo de código ✅</b> (2026-07-20)</summary>

Sustituido **graphify** por **codebase-memory-mcp**. Se rescató el conocimiento destilado del grafo
antiguo hacia `spec.md` §2 (helpers centralizados / god nodes y la ausencia de ciclos de importación).
Se eliminaron `graphify-out/`, la skill local y los hooks que forzaban su uso; se añadieron
`.mcp.json`, el snapshot committeable `.codebase-memory/graph.db.zst` y el visor 3D `graph.html`.

</details>
