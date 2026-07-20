# Diamadmin — Landing oficial

Landing de **Diamadmin**, un ERP modular para pymes que centraliza stock, ventas, compras,
facturación, finanzas y RRHH en una sola plataforma.

🌐 **https://www.diamadmin.com** · 🚀 Cloudflare Pages

> **Estado:** productiva. Fase 1 completada · **Fase 2 (contenido SEO) en curso** — ver [plan.md](plan.md).

---

## Qué es

Esta landing es la **capa de validación** de Diamadmin: explica el producto y capta interés real
(contacto, newsletter con double opt-in y lista de espera) antes del lanzamiento de la aplicación.

La aplicación real vive en `app.diamadmin.com`, con **Angular + Spring Boot + PostgreSQL**, en un
repositorio y un hosting independientes. La landing no depende de la app ni la app de la landing.

---

## Qué funciona ya

- **Landing multi-sector** con 8 sectores (Retail, Logística, Salud, Hostelería, Industria, Real Estate, RRHH, Finanzas) y grid de módulos filtrable.
- **SEO técnico completo:** JSON-LD (`SoftwareApplication`, `Organization`, `FAQPage`, `WebSite`), Open Graph, Twitter Cards, sitemap dinámico, canonical URLs y redirección 301 apex → www.
- **Sistema de mailing sobre Brevo:** contacto, sugerencias, newsletter con **double opt-in**, bajas con token HMAC firmado, derecho al olvido (RGPD) y envío masivo protegido.
- **12 cápsulas de newsletter** — serie educativa en [capsulas/](capsulas/).
- **Lista de espera** con confirmación por email y alta en la lista de contactos.
- **Seguridad:** rate limiting por IP sobre Cloudflare KV, CSP y security headers, validación estricta y honeypot en todos los endpoints públicos.
- **Cumplimiento legal:** privacidad (RGPD/LOPD-GDD), cookies (LSSI-CE/AEPD), aviso legal y cookie banner.
- **Dark / light mode** con persistencia y script anti-flicker · animaciones Framer Motion · responsive mobile-first.
- **Analytics sin cookies** con Umami · **29 tests** con Vitest.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15.1.6 (App Router, static export) |
| UI | React 18 · TypeScript 5 · TailwindCSS 3.4 |
| Animación / iconos | motion (Framer Motion) · lucide-react |
| Backend | Cloudflare Pages Functions |
| Email | Brevo (SMTP + Contacts API) |
| Rate limiting | Cloudflare KV |
| Analytics | Umami |
| Tests | Vitest |

---

## Estructura

```
├── capsulas/                # 12 plantillas HTML de newsletter
├── frontend/
│   ├── functions/           # Cloudflare Pages Functions
│   │   ├── _lib/            # brevo · emails · security · urls · validate
│   │   ├── _shared/         # rateLimit
│   │   └── api/             # 8 endpoints + middleware
│   ├── public/              # _headers · _redirects · favicon · images
│   ├── src/                 # app/ · components/ · config/ · hooks/ · styles/
│   └── __tests__/
└── spec.md · plan.md · CLAUDE.md
```

---

## Arranque

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build    # static export
npm run test     # Vitest
npm run lint
```

En Windows, `start-diamadmin.bat` en la raíz valida dependencias y abre el dev server.

### Variables de entorno (Cloudflare Pages)

`BREVO_API_KEY` · `BREVO_LIST_ID` · `BROADCAST_SECRET` · `MAIL_FROM` · `CONTACT_NOTIFY_EMAIL` · `MAIL_TEST_TO`

Binding KV requerido: `RATE_LIMIT_KV`.

---

## Documentación

| Documento | Contenido |
|---|---|
| [spec.md](spec.md) | Especificación viva: arquitectura, invariantes, convenciones y metodología |
| [plan.md](plan.md) | Plan de trabajo: fases pendientes, deuda técnica e histórico |
| [CLAUDE.md](CLAUDE.md) | Reglas de trabajo para Claude Code |
| `.codebase-memory/graph.html` | Visor 3D del grafo de código (abrir en el navegador) |

---

> Este repositorio sigue **Spec-Driven Development**: `spec.md` y `plan.md` son la fuente de verdad.
> Nada se implementa sin su punto en el plan, y toda decisión nueva se registra en la spec.
