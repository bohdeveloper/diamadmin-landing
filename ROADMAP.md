# 🗺️ ROADMAP — EVOLUCIÓN DE DIAMADMIN LANDING

> Diamadmin es un sistema de gestión empresarial (ERP) modular para pymes que centraliza stock, ventas, compras, facturación y RRHH en una sola plataforma.
> Este roadmap refleja la evolución de la landing de validación: captación, SEO, contenido y conversión.

---

## FASE 0 — Landing y validación ✅ COMPLETADA

**Objetivo:** explicar el producto, generar confianza y validar interés real.

### Producto y diseño
- [x] Landing estática desplegada en `diamadmin.com`
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
- [x] Redirección apex → www (`_redirects`, 301 permanente)

### Email y captación
- [x] Formulario de contacto con validación, honeypot y envío real (Brevo SMTP)
- [x] Formulario de sugerencias funcional
- [x] Newsletter con double opt-in: confirmación por email → Brevo Contact List
- [x] Gestión de bajas con token HMAC firmado
- [x] Derecho al olvido: endpoint `/api/delete-data` elimina contacto de Brevo completamente
- [x] Endpoint `/api/broadcast` para envío de newsletter a todos los suscriptores (requiere `BROADCAST_SECRET`)
- [x] 12 plantillas cápsula de newsletter (serie educativa en `capsulas/`)
- [x] Notificaciones al admin en cada acción
- [x] Templates de email con diseño consistente y branding Diamadmin
- [x] Validación estricta de inputs en todos los handlers (longitud, formato, honeypot)

### Legal y cumplimiento
- [x] Política de privacidad (RGPD / LOPD-GDD)
- [x] Política de cookies (LSSI-CE, AEPD)
- [x] Aviso legal (LSSI-CE)
- [x] Cookie banner con persistencia y enlace a política
- [x] Footer con enlaces legales en todas las páginas

### Seguridad
- [x] Middleware de seguridad API: CORS, límite de tamaño, security headers
- [x] Headers HTTP de seguridad en todas las rutas (`_headers`)
- [x] Rate limiting por IP en todos los endpoints públicos (Cloudflare KV)
- [x] BROADCAST_SECRET obligatorio en confirm, unsubscribe y delete-data
- [x] Comparación timing-safe en broadcast
- [x] Content-Security-Policy en `_headers`
- [x] maxLength en todos los inputs del frontend

### Calidad
- [x] Tests automatizados (Vitest): validación, HMAC, generación de emails (29 tests)
- [x] Código muerto eliminado (mailer.ts, emails.ts duplicado, utils.ts)
- [x] Sin dependencias innecesarias (nodemailer eliminado)

**Resultado:** landing operativa con captación de emails, newsletter con doble opt-in y base legal completa.

---

## FASE 1 — Landing: métricas, conversión y calidad ✅ COMPLETADA

**Objetivo:** medir qué funciona, mejorar la conversión y dejar la landing lista de forma definitiva.

### Analytics y métricas
- [x] Analytics de privacidad sin cookies (Umami — `ef92d61a-ea38-4566-862c-14d2d516774b`)
- [ ] Tracking de eventos clave: clic en CTA, envíos de formulario, scroll depth *(pospuesto)*
- [ ] Estrategia de precios revisada → sección de pricing definitiva y activa *(pospuesto)*
- [ ] A/B testing básico en el headline principal *(pospuesto)*

### Páginas y flujos
- [x] Página de confirmación de suscripción con CTA claro (`/confirmar`)
- [x] Página de baja confirmada con opción de reactivar (`/baja`)
- [x] Páginas de error personalizadas (`/404`, `/500`)
- [x] `confirm.ts` y `unsubscribe.ts` redirigen a páginas Next.js (antes devolvían HTML inline)

### Captación anticipada
- [x] Sección de lista de espera con formulario (`#lista-espera`)
- [x] Endpoint `/api/lista-espera` con email de confirmación (Brevo) y alta en lista de contactos

### Calidad y tests
- [ ] Ampliar cobertura de tests: handlers de contacto, sugerencias, newsletter y lista de espera *(pospuesto)*
- [ ] Revisión de accesibilidad *(pospuesto)*

---

## FASE 2 — Landing: contenido SEO y autoridad ⏳ PENDIENTE

**Objetivo:** posicionamiento orgánico y captación de tráfico cualificado.

- [ ] Sección `/blog` con artículos sobre gestión empresarial, stock, facturación para pymes
- [ ] Artículos para palabras clave objetivo (ERP pymes, gestión stock, software facturación)
- [ ] Página de módulos con detalle por módulo (`/modulos/stock`, `/modulos/facturacion`, etc.)
- [ ] Páginas por sector (`/sectores/hosteleria`, `/sectores/logistica`, `/sectores/comercio`)
- [ ] Testimonios y casos de uso reales (cuando haya primeros usuarios)
- [ ] FAQ expandida con rich snippets

---

## FASE 3 — Landing: conversión hacia la app ⏳ PENDIENTE

**Objetivo:** preparar la landing para cuando la app esté disponible.

- [ ] CTA principal apunta a registro / lista de espera cuando haya alpha
- [ ] Notas de versión / changelog público (`/changelog`)
- [ ] Documentación básica de usuario (`/docs`)
- [ ] Estado del sistema visible (uptime, versión actual)

---

> **Tecnología:** Next.js 15 · Tailwind CSS · Cloudflare Pages · Cloudflare Pages Functions · Brevo API
> **Dominio:** `www.diamadmin.com`
