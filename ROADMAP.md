# ROADMAP — Diamadmin Landing

Evolución de la landing page de diamadmin.com desde validación hasta soporte de la app real.

---

## FASE 0 — Landing y validación ✅ COMPLETADA

**Objetivo:** explicar el producto, generar confianza y validar interés real.

### Producto y diseño
- [x] Landing estática desplegada en diamadmin.com
- [x] Copy claro sobre qué es Diamadmin y para quién es
- [x] Identidad visual completa (paleta azul/diamante, tipografía, iconografía)
- [x] Animaciones e interacciones (Framer Motion)
- [x] Dark / light mode con persistencia en localStorage
- [x] Diseño responsive mobile-first

### SEO
- [x] SEO técnico completo: JSON-LD (SoftwareApplication, Organization, FAQPage, WebSite)
- [x] Open Graph y Twitter Cards con imagen real
- [x] Sitemap dinámico (`app/sitemap.ts`)
- [x] Robots.txt correcto (sin conflicto con sitemap)
- [x] Favicon, Apple Touch Icon y Web Manifest completos
- [x] Canonical URLs en todas las páginas
- [x] Meta keywords, description y title templates

### Formularios y backend
- [x] Formulario de contacto con validación, honeypot y envío real (Brevo SMTP)
- [x] Formulario de sugerencias funcional
- [x] Newsletter con double opt-in: confirmación por email → Brevo Contact List
- [x] Gestión de bajas con token HMAC firmado
- [x] Notificaciones al admin en cada acción
- [x] Templates de email con diseño consistente y branding Diamadmin
- [x] Validación estricta de inputs en todos los handlers (longitud, formato, honeypot)
- [x] Middleware de seguridad API: CORS, límite de tamaño, security headers
- [x] Headers HTTP de seguridad en todas las rutas (`_headers`)

### Legal y cumplimiento
- [x] Política de privacidad (RGPD / LOPD-GDD)
- [x] Política de cookies (LSSI-CE, AEPD)
- [x] Aviso legal (LSSI-CE)
- [x] Cookie banner con persistencia y enlace a política
- [x] Footer con enlaces legales en todas las páginas

### Calidad
- [x] Tests automatizados (Vitest): validación, HMAC, generación de emails (29 tests)
- [x] Código muerto eliminado (mailer.ts, emails.ts duplicado, utils.ts)
- [x] Sin dependencias innecesarias (nodemailer eliminado)

---

## FASE 1 — Métricas y conversión ⏳ PENDIENTE

**Objetivo:** medir qué funciona, mejorar conversión y generar contenido para SEO.

- [ ] Analytics de privacidad (Plausible o Umami, sin cookies de terceros)
- [ ] Tracking de eventos clave: clic en CTA, envío formularios, scroll depth
- [ ] Página de confirmación de suscripción con CTA claro (`/confirmar`)
- [ ] Página de baja confirmada con opción de reactivar (`/baja`)
- [ ] Página de error genérica (`/404`, `/500`)
- [ ] A/B testing básico en el headline principal
- [ ] Estrategia de precios definida → sección de pricing activa

---

## FASE 2 — Contenido y autoridad SEO ⏳ PENDIENTE

**Objetivo:** posicionamiento orgánico y captación de tráfico cualificado.

- [ ] Blog o sección de artículos (`/blog`)
- [ ] Artículos para palabras clave objetivo (ERP pymes, gestión stock, etc.)
- [ ] Página de módulos con detalle por módulo (`/modulos/[slug]`)
- [ ] Páginas por sector (`/sectores/hosteleria`, `/sectores/logistica`, etc.)
- [ ] Testimonios y casos de uso reales (cuando haya usuarios)
- [ ] FAQ expandida con rich snippets

---

## FASE 3 — Conexión con la app real ⏳ PENDIENTE

**Objetivo:** enlazar la landing con `app.diamadmin.com` cuando esté en alpha.

- [ ] CTA principal apunta a `app.diamadmin.com` (registro / lista de espera)
- [ ] Sistema de lista de espera con invitaciones por correo
- [ ] Login / registro desde la landing redirige a la app
- [ ] Estado del sistema visible (uptime, versión actual)
- [ ] Notas de versión / changelog público
- [ ] Documentación básica de usuario (`/docs`)

---

## FASE 4 — Internacionalización ⏳ PENDIENTE (largo plazo)

**Objetivo:** ampliar mercado más allá de España.

- [ ] i18n: inglés y portugués
- [ ] SEO internacional (hreflang, URLs por idioma)
- [ ] Adaptar textos legales a otros países (GDPR europeo ya cubierto)

---

> **Tecnología:** Next.js 15 · Tailwind CSS · Cloudflare Pages · Cloudflare Pages Functions · Brevo API
> **Dominio:** `www.diamadmin.com`
