# 🗺️ ROADMAP — EVOLUCIÓN DE DIAMADMIN

> Diamadmin es un sistema de gestión empresarial (ERP) modular para pymes que centraliza stock, ventas, compras, facturación y RRHH en una sola plataforma.
> Este roadmap refleja la evolución del producto desde la landing de validación hasta una aplicación ERP madura.

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

### Email y captación
- [x] Formulario de contacto con validación, honeypot y envío real (Brevo SMTP)
- [x] Formulario de sugerencias funcional
- [x] Newsletter con double opt-in: confirmación por email → Brevo Contact List
- [x] Gestión de bajas con token HMAC firmado
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

### Calidad
- [x] Tests automatizados (Vitest): validación, HMAC, generación de emails (29 tests)
- [x] Código muerto eliminado (mailer.ts, emails.ts duplicado, utils.ts)
- [x] Sin dependencias innecesarias (nodemailer eliminado)

**Resultado:** landing operativa con captación de emails, newsletter con doble opt-in y base legal completa.

---

## FASE 1 — Landing: métricas, conversión y calidad ⏳ PENDIENTE

**Objetivo:** medir qué funciona, mejorar la conversión y dejar la landing lista de forma definitiva.

### Analytics y métricas
- [ ] Analytics de privacidad sin cookies (Plausible o Umami)
- [ ] Tracking de eventos clave: clic en CTA, envíos de formulario, scroll depth
- [ ] Estrategia de precios revisada → sección de pricing definitiva y activa
- [ ] A/B testing básico en el headline principal

### Páginas y flujos
- [ ] Página de confirmación de suscripción con CTA claro (`/confirmar`)
- [ ] Página de baja confirmada con opción de reactivar (`/baja`)
- [ ] Páginas de error personalizadas (`/404`, `/500`)

### Calidad y tests
- [ ] Ampliar cobertura de tests: handlers de contacto, sugerencias y newsletter
- [ ] Revisión de accesibilidad (contraste, aria-labels, navegación por teclado)

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

## FASE 3 — Landing → App: transición y conexión ⏳ PENDIENTE

**Objetivo:** enlazar la landing con `app.diamadmin.com` y gestionar el acceso a la alpha.

- [ ] CTA principal apunta a `app.diamadmin.com` (registro / lista de espera)
- [ ] Sistema de lista de espera con invitaciones por correo
- [ ] Login / registro desde la landing redirige a la app
- [ ] Estado del sistema visible (uptime, versión actual)
- [ ] Notas de versión / changelog público
- [ ] Documentación básica de usuario (`/docs`)

---

## FASE 4 — App: núcleo técnico 🔄 EN CURSO

**Objetivo:** arquitectura sólida, CRUD funcional desde el navegador y autenticación real antes de abrir a usuarios.

**Stack:** Angular 21 · Spring Boot 4 · Java 21 · PostgreSQL · JWT

### Backend (Spring Boot + PostgreSQL) — completado
- [x] Proyecto Spring Boot 4 + Java 21 + JPA/Hibernate configurado
- [x] Arquitectura modular por dominios: `core` · `catalog` · `common`
- [x] Entidades JPA: `User`, `Role`, `Product`, `Brand`, `Category`, `Model`
- [x] CRUD completo de `Product` en backend (GET all, GET id, POST, PUT, DELETE)
- [x] DTOs desacoplados con validación Bean Validation
- [x] `GlobalExceptionHandler` centralizado (404, 400)
- [x] CORS configurado para `localhost:4200`
- [x] `init.sql` con datos seed + `DatabaseBootstrap`

### Frontend Angular — en progreso
- [x] Proyecto Angular 21 configurado (standalone components, lazy loading)
- [x] `ProductService` consumiendo `/api/products`
- [x] `ProductListComponent` mostrando listado real desde backend
- [ ] `ProductFormComponent`: alta y edición con validación reactiva
- [ ] Layout base: sidebar, topbar, área de contenido
- [ ] `DashboardComponent` con métricas clave
- [ ] Tema visual consistente con la landing (paleta azul/diamante)

### Autenticación (bloquea la alpha)
- [ ] Spring Security + JWT (sin sesiones de servidor)
- [ ] Endpoints `/auth/login` y `/auth/refresh`
- [ ] Protección de endpoints por rol (`ADMIN`, `MANAGER`, `VIEWER`)
- [ ] Guards de rutas y `HttpInterceptor` en Angular

### Infraestructura
- [ ] Variables de entorno separadas: dev / prod
- [ ] CI básico con GitHub Actions (build + test en cada PR)

**Dominio:** `app.diamadmin.com`

---

## FASE 5 — App: alpha privada ⏳ PENDIENTE

**Objetivo:** primeras empresas reales usando los módulos básicos con sus datos.

- Registro de empresas por invitación (integración con lista de espera de la landing)
- Onboarding guiado: selección de sector y módulos activos
- CRUD completo de catálogo (Brand, Category, Model) desde el frontend
- Módulo de Inventario / Stock: movimientos, alertas de stock mínimo, historial
- Módulo de Contactos: clientes y proveedores con historial de actividad
- Panel de superadmin: gestión de tenants y licencias
- Auditoría básica: `createdAt`, `updatedAt`, `createdBy` en todas las entidades

---

## FASE 6 — App: ventas, compras y facturación ⏳ PENDIENTE

**Objetivo:** ciclo completo de compra-venta con facturación integrada.

- Módulo de Ventas: presupuestos, pedidos de venta, albaranes, devoluciones
- Módulo de Compras: pedidos a proveedores, recepción de mercancía, facturas de proveedor
- Módulo de Facturación: facturas con numeración legal, PDF, envío por email, estado de cobro
- Módulo de Caja / TPV básico
- Historial de auditoría por entidad (tabla `audit_log`)

---

## FASE 7 — App: estabilidad, calidad y seguridad ⏳ PENDIENTE

**Objetivo:** base sólida para producción real que las empresas puedan usar sin fricciones.

- Hardening OWASP: rate limiting, CORS estricto, HTTPS, validación estricta
- 2FA opcional (TOTP)
- Tests unitarios backend (JUnit 5 + Mockito), tests de integración (Testcontainers)
- Tests de componente Angular + tests E2E (Playwright)
- Logs estructurados (SLF4J + Logback) + health checks (`/actuator`)
- Documentación API con Swagger / OpenAPI
- Pipeline CI/CD completo: lint → test → build → deploy
- Migraciones de BD controladas con Flyway o Liquibase

---

## FASE 8 — App: módulos avanzados, multitenancy y monetización ⏳ PENDIENTE

**Objetivo:** ampliar a sectores especializados y convertir la tracción en un modelo sostenible.

- Parametrización por tenant: módulos activables/desactivables, configuración por empresa
- Módulos sectoriales: RRHH, Hostelería, Clínica, Real Estate, Logística, Producción
- Planes de pago (Stripe): Basic · Pro · Enterprise con feature flags por plan
- API pública (OpenAPI/Swagger) para integraciones de terceros
- Internacionalización (ES, EN, PT)
- Documentación pública de usuario en `diamadmin.com/docs`

---

> **Tecnología landing:** Next.js 15 · Tailwind CSS · Cloudflare Pages · Cloudflare Pages Functions · Brevo API
> **Tecnología app:** Angular 21 · Spring Boot 4 · Java 21 · PostgreSQL · JWT
> **Dominios:** `www.diamadmin.com` · `app.diamadmin.com`
