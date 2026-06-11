# Graph Report - diamadmin-landing  (2026-06-11)

## Corpus Check
- 56 files · ~69,433 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 303 nodes · 507 edges · 34 communities (21 shown, 13 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Cloudflare API Routes|Cloudflare API Routes]]
- [[_COMMUNITY_Email Capsulas Content|Email Capsulas Content]]
- [[_COMMUNITY_Landing Page Sections|Landing Page Sections]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_Email Template Library|Email Template Library]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Layout and Navigation|App Layout and Navigation]]
- [[_COMMUNITY_Brand Identity and Assets|Brand Identity and Assets]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Unsubscribe Flow|Unsubscribe Flow]]
- [[_COMMUNITY_Opt-in Confirmation Flow|Opt-in Confirmation Flow]]
- [[_COMMUNITY_Privacy Policy Page|Privacy Policy Page]]
- [[_COMMUNITY_Security Middleware|Security Middleware]]
- [[_COMMUNITY_404 Page|404 Page]]
- [[_COMMUNITY_Legal Notice Page|Legal Notice Page]]
- [[_COMMUNITY_Cookies Policy Page|Cookies Policy Page]]
- [[_COMMUNITY_Favicon Assets|Favicon Assets]]
- [[_COMMUNITY_Subscription and Pricing|Subscription and Pricing]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Apple Touch Icon|Apple Touch Icon]]
- [[_COMMUNITY_App Icon|App Icon]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `sendEmail()` - 16 edges
3. `isValidEmail()` - 16 edges
4. `onRequestPost()` - 12 edges
5. `Cápsula Email Template Design Pattern (Diamadmin branding)` - 12 edges
6. `esc()` - 11 edges
7. `hmacHex()` - 11 edges
8. `checkLength()` - 10 edges
9. `onRequestGet()` - 10 edges
10. `ROADMAP — Evolución de Diamadmin` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Modular Approach — Start Small, Grow Incrementally` --semantically_similar_to--> `Modular ERP Design Philosophy for SMEs`  [INFERRED] [semantically similar]
  capsulas/capsula-digitalizacion.html → ROADMAP.md
- `README — Diamadmin Landing` --references--> `ROADMAP — Evolución de Diamadmin`  [INFERRED]
  README.md → ROADMAP.md
- `CLAUDE.md — Graphify Instructions` --references--> `README — Diamadmin Landing`  [EXTRACTED]
  CLAUDE.md → README.md
- `Módulo de Equipo — Roles, Permisos y Presencia` --conceptually_related_to--> `Fase 4 — App: Núcleo Técnico Angular + Spring Boot`  [INFERRED]
  capsulas/capsula-equipo.html → ROADMAP.md
- `Módulo de Stock e Inventario — Core Feature` --conceptually_related_to--> `Fase 4 — App: Núcleo Técnico Angular + Spring Boot`  [INFERRED]
  capsulas/capsula-stock.html → ROADMAP.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cápsulas Newsletter — Subscriber Education Email Series** — capsulas_bienvenida, capsulas_casos_uso, capsulas_digitalizacion, capsulas_eficiencia, capsulas_equipo, capsulas_finanzas, capsulas_hosteleria, capsulas_integraciones, capsulas_modulos, capsulas_pymes, capsulas_retail, capsulas_stock [EXTRACTED 1.00]
- **Core ERP Modules — Stock, Equipo, Finanzas, Integraciones** — concept_modulo_stock, concept_modulo_equipo, concept_modulo_finanzas, concept_integraciones [EXTRACTED 1.00]
- **Sector-Specific Cápsulas — Hostelería and Retail** — capsulas_hosteleria, capsulas_retail, concept_sector_hosteleria, concept_sector_retail [INFERRED 0.85]

## Communities (34 total, 13 thin omitted)

### Community 0 - "Cloudflare API Routes"
Cohesion: 0.18
Nodes (24): Env, onRequestPost(), timingSafeCompare(), Env, onRequestGet(), Env, onRequestGet(), page() (+16 more)

### Community 1 - "Email Capsulas Content"
Cohesion: 0.09
Nodes (36): Email Cápsula — Bienvenida (Welcome), Email Cápsula — Caso de Uso (Ferretería Retail), Email Cápsula — Digitalización Pymes, Email Cápsula — Eficiencia y Automatización, Email Cápsula — Módulo de Equipo y RRHH, Email Cápsula — Control Financiero, Email Cápsula — Sector Hostelería, Email Cápsula — Integraciones Externas (+28 more)

### Community 2 - "Landing Page Sections"
Cohesion: 0.07
Nodes (9): HERO_STATS, steps, Tab, bebasNeue, SECTORS, modulos, sectores, pillars (+1 more)

### Community 3 - "Frontend Dependencies"
Cohesion: 0.07
Nodes (27): dependencies, lucide-react, motion, next, react, react-dom, devDependencies, autoprefixer (+19 more)

### Community 4 - "Email Template Library"
Cohesion: 0.24
Nodes (23): adminContactoEmailHtml(), adminEmail(), adminListaEsperaEmailHtml(), adminNewsletterEmailHtml(), AdminOpts, adminSugerenciaEmailHtml(), bajaConfirmadaEmailHtml(), BENEFICIOS (+15 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, ignoreDeprecations, incremental, isolatedModules, jsx, lib (+12 more)

### Community 6 - "App Layout and Navigation"
Cohesion: 0.14
Nodes (4): inter, metadata, viewport, links

### Community 7 - "Brand Identity and Assets"
Cohesion: 0.23
Nodes (12): Blue Color Scheme, Blue Diamond Icon, Diamadmin Brand, Brand Color: Blue Palette, Brand Color: Dark Navy, Diamond Icon (Logo Mark), Diamond Gem Icon, Android Chrome 512x512 Favicon (Diamond Logo) (+4 more)

### Community 8 - "Project Documentation"
Cohesion: 0.38
Nodes (7): CLAUDE.md — Graphify Instructions, app.diamadmin.com — Angular + Spring Boot Application, Cloudflare Pages Deployment, README — Diamadmin Landing, Next.js 15 + React 18 + TypeScript + TailwindCSS Stack, Static Export SEO Strategy, Two-Layer Architecture: Landing + App

### Community 16 - "Favicon Assets"
Cohesion: 1.00
Nodes (3): Android Chrome 192x192 Favicon (Diamond Logo), Brand Identity — Diamadmin, Diamond Logo Icon

### Community 30 - "Community 30"
Cohesion: 0.12
Nodes (15): Analytics y métricas, Calidad, Calidad y tests, Captación anticipada, Email y captación, FASE 0 — Landing y validación ✅ COMPLETADA, FASE 1 — Landing: métricas, conversión y calidad ✅ COMPLETADA, FASE 2 — Landing: contenido SEO y autoridad ⏳ PENDIENTE (+7 more)

### Community 31 - "Community 31"
Cohesion: 0.33
Nodes (13): Env, onRequestPost(), Env, onRequestPost(), Env, Env, onRequestPost(), checkLength() (+5 more)

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (10): 1. Tecnologías utilizadas, 2. Arquitectura actual, 3. Relación con la aplicación real, 4. Estructura del proyecto, 5. Estado actual del proyecto, 6. Instalación y desarrollo local, ⚙️ Aplicación real (otro repo), Diamadmin – Landing oficial (+2 more)

## Knowledge Gaps
- **102 isolated node(s):** `eslintConfig`, `UserOpts`, `AdminOpts`, `BENEFICIOS`, `SECURITY_HEADERS` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ROADMAP — Evolución de Diamadmin` connect `Email Capsulas Content` to `Project Documentation`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `UserOpts`, `AdminOpts` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Email Capsulas Content` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._
- **Should `Landing Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `App Layout and Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._