# spec.md — Diamadmin Landing

> Documento vivo de especificación (Spec-Driven Development).
> Memoria del proyecto: qué es, cómo está construido, decisiones y metodología.
> El trabajo pendiente vive en [plan.md](plan.md) (que incluye el histórico resumido de lo completado).
> Regla: toda decisión nueva de producto/arquitectura se registra aquí en la misma sesión.

---

## 1. Qué es Diamadmin

**Diamadmin** es un sistema de gestión empresarial (ERP) **modular para pymes** que centraliza
stock, ventas, compras, facturación, finanzas y RRHH en una sola plataforma, con arquitectura
multi-sector (Retail, Logística, Salud, Hostelería, Industria, Real Estate, RRHH, Finanzas).

**Este repositorio es solo la landing**, no la aplicación. Su objetivo es doble:

1. Explicar qué es Diamadmin y qué problema resuelve.
2. **Validar interés real** antes del lanzamiento de la app (captación de emails, newsletter, lista de espera).

| | |
|---|---|
| Dominio | `www.diamadmin.com` (apex redirige 301 a www) |
| Despliegue | Cloudflare Pages + Cloudflare Pages Functions |
| Fase actual | Fase 1 completada · **Fase 2 (contenido SEO) en curso** |
| App real | `app.diamadmin.com` — Angular + Spring Boot + PostgreSQL, **otro repositorio** |

La landing **no depende de la app** y la app **no depende de la landing**.

---

## 2. Stack y arquitectura

### Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15.1.6 (App Router, **static export**) |
| UI | React 18.2, TypeScript 5, TailwindCSS 3.4 (`darkMode: "class"`) |
| Animación | `motion` (Framer Motion) v12 |
| Iconos | `lucide-react` |
| Tipografía | Inter + Bebas Neue (Google Fonts) |
| Backend | Cloudflare Pages Functions (Workers runtime, sin Node) |
| Email | **Brevo** — SMTP para envío + Contacts API para la lista |
| Rate limiting | Cloudflare KV (binding `RATE_LIMIT_KV`) |
| Analytics | Umami (sin cookies) — website ID `ef92d61a-ea38-4566-862c-14d2d516774b` |
| Tests | Vitest (29 tests) |
| Grafo de código | codebase-memory-mcp (`.mcp.json` + `.codebase-memory/`) |

### Estructura del repo

```
├── .codebase-memory/        # Grafo de código: graph.db.zst (snapshot) + graph.html (visor 3D)
├── .mcp.json                # Registro del servidor MCP codebase-memory-mcp
├── capsulas/                # 12 plantillas HTML de la serie educativa de newsletter
├── frontend/
│   ├── functions/           # Cloudflare Pages Functions (el "backend")
│   │   ├── _lib/            # brevo.ts · emails.ts · security.ts · urls.ts · validate.ts
│   │   ├── _shared/         # rateLimit.ts
│   │   └── api/             # _middleware.ts + 8 endpoints
│   ├── public/              # _headers · _redirects · favicon · images
│   ├── src/
│   │   ├── app/             # layout · page · sitemap · robots · legales · confirmar · baja · errores
│   │   ├── components/      # layout/ (Navbar, Footer, ThemeToggle, CookieBanner) · sections/
│   │   ├── config/stats.ts
│   │   ├── hooks/useFadeInOnScroll.ts
│   │   └── styles/ types/
│   └── __tests__/           # emails · security · validate
├── spec.md · plan.md · README.md · CLAUDE.md
└── start-diamadmin.bat
```

### Patrones de arquitectura establecidos

Estos son los **helpers centralizados**. Antes de escribir lógica nueva, comprueba si ya
existen aquí — el grafo confirma que son los nodos más conectados del proyecto:

| Helper | Fichero | Rol |
|---|---|---|
| `sendEmail()` | `functions/_lib/brevo.ts` | **Único** punto de salida de correo (SMTP Brevo) |
| `brevoReq()` | `functions/_lib/brevo.ts` | Cliente HTTP de la Contacts API |
| `addToBrevoList()` / `removeFromBrevoList()` / `deleteFromBrevo()` / `isInBrevoList()` / `getBrevoListContacts()` | `functions/_lib/brevo.ts` | Gestión de la lista de suscriptores |
| `isValidEmail()` / `checkLength()` | `functions/_lib/validate.ts` | Validación de entrada, usada por **todos** los handlers |
| `hmacHex()` / `verifyHmac()` | `functions/_lib/security.ts` | Firma y verificación de tokens (opt-in, baja, borrado) |
| `esc()` | `functions/_lib/emails.ts` | Escapado HTML — obligatorio en toda interpolación en emails |
| `userEmail()` / `adminEmail()` | `functions/_lib/emails.ts` | Layouts base de email; las plantillas concretas los envuelven |
| `rateLimit()` / `getClientIp()` | `functions/_shared/rateLimit.ts` | Rate limiting por IP sobre KV |
| `_middleware.ts` | `functions/api/` | CORS, límite de tamaño de body, security headers |

**No hay ciclos de importación en el proyecto. Mantenerlo así.**

### Endpoints (`frontend/functions/api/`)

| Endpoint | Método | Qué hace |
|---|---|---|
| `/api/contacto` | POST | Formulario de contacto → email al usuario + notificación al admin |
| `/api/sugerencia` | POST | Formulario de sugerencias (email obligatorio) |
| `/api/newsletter` | POST | Alta con **double opt-in**: envía email de confirmación con token HMAC |
| `/api/confirm` | GET | Verifica HMAC + TTL 48 h → añade a la lista Brevo → redirige a `/confirmar` |
| `/api/unsubscribe` | GET | Verifica HMAC → baja de la lista → redirige a `/baja` |
| `/api/delete-data` | GET | Derecho al olvido (RGPD): elimina el contacto de Brevo por completo |
| `/api/lista-espera` | POST | Alta en lista de espera + email de confirmación |
| `/api/broadcast` | POST | Envío masivo a la lista. Admin-only: `BROADCAST_SECRET` con comparación timing-safe |

### Flujo de la newsletter (double opt-in)

`POST /api/newsletter` → `isInBrevoList()`? → si no, `hmacHex()` firma el email →
email de confirmación → `GET /api/confirm?token=…` → `verifyHmac()` + TTL 48 h →
`addToBrevoList()` → email de bienvenida ("chispa") + notificación al admin → redirect a `/confirmar`.
La baja sigue el mismo esquema con `/api/unsubscribe` → `/baja`.

---

## 3. Decisiones de producto y reglas de negocio (invariantes)

No se reabren sin decisión explícita del usuario.

1. **Landing y app son repos y despliegues separados.** Esta landing nunca incorporará lógica de negocio del ERP.
2. **Static export.** Next.js exporta estático (`output: export`); nada de SSR, ISR ni Node runtime. Todo lo dinámico va en Pages Functions.
3. **Email: Brevo, nunca Resend.** Brevo es gratuito (300 emails/día, contactos ilimitados vía API) y no requiere pagar un segundo dominio verificado. Resend se usa solo en el proyecto hermano Unyona.
4. **Envíos masivos vía `getBrevoListContacts()` + bucle de `sendEmail()`**, no vía una Broadcast API de terceros.
5. **Double opt-in obligatorio** en la newsletter. No se añade nadie a la lista sin confirmar por email.
6. **Todos los tokens (opt-in, baja, borrado) van firmados con HMAC** y llevan TTL. Nunca un email en claro en la URL.
7. **Todos los endpoints públicos llevan rate limiting por IP** (KV) y validación estricta (longitud, formato, honeypot).
8. **Cumplimiento legal completo desde el inicio:** privacidad (RGPD/LOPD-GDD), cookies (LSSI-CE/AEPD), aviso legal, cookie banner y derecho al olvido operativo.
9. **Analytics sin cookies.** Umami, no Google Analytics — coherente con la propuesta de privacidad y con el banner.
10. **Precios ocultos.** La sección de suscripción existe pero no muestra precios: la estrategia de pricing está sin decidir. No inventar precios.
11. **`www` es canónico.** El apex redirige 301 a www (`public/_redirects`).
12. **Notificación al admin en cada acción** (contacto, sugerencia, alta, baja, lista de espera) a `CONTACT_NOTIFY_EMAIL`.

---

## 4. Sistema de diseño y convenciones UI

### Paletas (⚠️ divergencia conocida — deuda a unificar)

| Contexto | Claro | Oscuro |
|---|---|---|
| **Web** (`globals.css`) | `--primary: #00a8bf` (cian) · `--bg: #fdfefe` · `--text: #1a1a1a` | `--primary: #00e7eb` · `--bg: #0d0d0d` · `--text: #f5f5f5` |
| **Email / cápsulas** | Primario `#1B75BB` · Secundario `#3DB5E6` · Oscuro `#0A2540` · Fondo `#EAF4FB` | — |

La web es **cian** y el email es **azul Diamadmin**. Está reconocido como inconsistencia
pendiente de unificar (punto abierto en [plan.md](plan.md)). Mientras no se decida,
**respeta la paleta del contexto en el que trabajes** y no "corrijas" una hacia la otra.

### Convenciones

- Tokens de color vía CSS custom properties en `src/app/globals.css` + clases `.text-primary` / `.bg-primary` / `.border-primary`. `src/styles/variables.css` está vacío.
- Dark mode por clase (`darkMode: "class"`) con persistencia en `localStorage` y script anti-flicker en `layout.tsx`.
- Animaciones con `motion/react` y el hook `useFadeInOnScroll` para entradas al hacer scroll.
- Motivo visual recurrente: **hexágonos / honeycomb** (`SectorHex`, `MiniHex`, `hexCenter`) y el diamante de marca.
- Diseño **mobile-first** y responsive.
- Emails: todas las plantillas se construyen sobre `userEmail()` / `adminEmail()` con bullets `◆`. Extender el patrón existente, nunca crear un layout nuevo desde cero.

### Prohibiciones

- ❌ **Resend** (ver invariante 3).
- ❌ `next/image` — rompe el static export en este proyecto; usar `<img>` (ya ocurrió en el Footer).
- ❌ Interpolar datos de usuario en HTML de email sin pasar por `esc()`.
- ❌ Añadir un endpoint sin rate limiting, validación de longitud y honeypot donde aplique.
- ❌ Inputs sin `maxLength` en el frontend.

---

## 5. Entorno de desarrollo y producción

### Local

```bash
cd frontend && npm install
npm run dev     # http://localhost:3000
npm run build   # static export
npm run test    # Vitest (29 tests)
npm run lint
```

También existe `start-diamadmin.bat` en la raíz, que valida dependencias y abre el dev server.

### Variables de entorno (Cloudflare Pages)

| Variable | Rol |
|---|---|
| `BREVO_API_KEY` | Clave de la Contacts API de Brevo |
| `BREVO_LIST_ID` | ID de la lista de newsletter |
| `BROADCAST_SECRET` | Secreto HMAC: firma de tokens **y** autorización de `/api/broadcast` |
| `MAIL_FROM` | Remitente verificado en Brevo |
| `CONTACT_NOTIFY_EMAIL` | Destino de las notificaciones al admin |
| `MAIL_TEST_TO` | Destino de pruebas |

Binding KV requerido: **`RATE_LIMIT_KV`**.

### Deuda aceptada deliberadamente

- `npm run build` usa `NEXT_DISABLE_TYPECHECK=1`; el typecheck no bloquea el build.
- Cobertura de tests limitada a `validate`, `security` y `emails`; los handlers de API no tienen tests.
- Divergencia de paletas web/email (§4).
- `src/styles/variables.css` existe pero está vacío.

---

## 6. Metodología de desarrollo (Spec-Driven Development)

### Antes de desarrollar

1. Leer `spec.md` (§3 invariantes y §6) y `plan.md`. Si la tarea no está en el plan, **añadirla primero**.
2. Contrastar con los invariantes de §3 y avisar si la petición choca con alguno.
3. Explorar el código con las tools MCP de **codebase-memory-mcp** (`search_graph`, `trace_path`, `get_architecture`, `get_code_snippet`, `query_graph`) antes de grep o lectura masiva.
4. Buscar el helper existente que ya cubra el concepto (§2) antes de crear uno nuevo.
5. Para UI nueva, delegar en el agente **`ux-ui-designer`** antes de maquetar (ver "Agentes" abajo).
6. Desglosar las tareas grandes en fases dentro de `plan.md`.

### Durante el desarrollo

- Todo endpoint nuevo: rate limiting + validación de longitud + `isValidEmail()` + honeypot donde aplique.
- Todo email nuevo: construir sobre `userEmail()` / `adminEmail()` y escapar con `esc()`.
- Reutilizar los helpers de `_lib/`; no duplicar lógica de Brevo, HMAC ni validación.
- Respetar el static export: nada que requiera runtime de Node en `src/`.

### Después de desarrollar

1. `npm run test` y `npm run build` de lo tocado.
2. **`/code-review` sobre el diff — obligatorio antes de cerrar cualquier feature.**
3. `/security-review` si se toca auth, privacidad, tokens o se añade un endpoint.
4. Verificar end-to-end en la app real (`/run`), cerrando después los procesos propios.
5. Registrar: marcar `plan.md` con fecha · decisiones nuevas → `spec.md` · cambios de alcance o stack → `README.md`.
6. Regenerar `.codebase-memory/graph.html` al cerrar una fase o tras cambios grandes.
7. Commit **solo cuando el usuario lo pida**, en el estilo del historial (`área: descripción en español`, imperativo).
8. `/simplify` opcional al cerrar una fase.

### Agentes

Definidos en `~/.claude/agents/` (configuración **global** del usuario, no versionada en este repo).

#### `ux-ui-designer` — dirección de diseño y frontend

**Obligatorio antes de maquetar UI nueva.** Cubre diseño y rediseño de páginas y componentes,
evolución del sistema de diseño, responsive, SEO on-page (metadatos, Open Graph, HTML semántico,
Core Web Vitals), animaciones y accesibilidad.

Al delegarle una tarea, pásale siempre el contexto que no puede deducir:

- La paleta del contexto en el que va a trabajar (§4: **web = cian, email = azul Diamadmin**) y que la divergencia es conocida, no un bug que deba "corregir".
- Las prohibiciones de §4, en especial **`next/image` está vetado** (rompe el static export).
- Que el proyecto es **static export**: nada que exija runtime de Node.
- El motivo visual de marca: diamante + honeycomb hexagonal.

Es el agente natural para la mayor parte de la **Fase 2** (páginas por módulo y por sector, blog,
FAQ con rich snippets) y para el punto pospuesto de **accesibilidad**.
No lo uses para la lógica de los endpoints ni para bugs sin componente visual.

#### `git-master` — operaciones de git no triviales

Conflictos de merge, rebase o cherry-pick · sincronización con remoto (push/pull/fetch) ·
estrategia y gestión de ramas · recuperación de trabajo perdido (reflog) · limpieza de historia ·
stash, bisect, submódulos y hooks.

**No** lo uses para un `git status` o un commit rutinario. Sigue aplicando la política del proyecto:
**no se commitea ni se sube nada sin que el usuario lo pida**, y los mensajes van en el estilo del
historial (`área: descripción en español`, imperativo).

Utilidad concreta aquí: el commit `808f67d` guarda un backup del grafo de graphify previo al
hardening de seguridad, y `graphify-out/` se eliminó en la migración del 2026-07-20 — si alguna vez
hace falta recuperar aquel material, es trabajo de este agente.

### Skills

| Skill | Cuándo usarla |
|---|---|
| `codebase-memory` (MCP) | Siempre, como primer paso para explorar el código |
| `web-perf` | Auditar Core Web Vitals y rendimiento de carga — clave para el SEO de Fase 2 |
| `cloudflare` / `wrangler` | Configuración de Pages, KV, bindings, despliegue |
| `cloudflare-email-service` | Solo si se evalúa mover el email fuera de Brevo (hoy vetado por el invariante 3) |
| `/code-review` | Obligatorio antes de cerrar cualquier feature |
| `/security-review` | Cambios en auth, tokens, privacidad o endpoints nuevos |
| `/simplify` | Al cerrar una fase |
| `/run` | Levantar la landing para verificar un cambio de verdad |
| `spec-driven` | Mantener `spec.md` / `plan.md` sincronizados |

---

## 7. Documentos del proyecto

| Documento | Rol |
|---|---|
| [spec.md](spec.md) | **Memoria**: qué es, arquitectura, invariantes, convenciones, metodología |
| [plan.md](plan.md) | **Trabajo**: estado actual, fases pendientes con checkboxes, histórico completado |
| [README.md](README.md) | **Escaparate** público de GitHub |
| [CLAUDE.md](CLAUDE.md) | Reglas de trabajo cargadas en cada sesión de Claude Code |
| `.codebase-memory/graph.html` | Visor 3D del grafo de código (abrir en cualquier navegador) |
