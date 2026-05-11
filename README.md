# Diamadmin – Landing oficial

🌐 **Dominio:** https://diamadmin.com  
🚀 **Despliegue:** Cloudflare Pages

---

Landing oficial de **Diamadmin**, una aplicación de gestión administrativa modular orientada a pequeños y medianos negocios.

La landing está diseñada como **sitio estático optimizado para rendimiento y SEO**, y cumple dos objetivos clave:

- Explicar claramente qué es Diamadmin y qué problema resuelve
- Validar el producto antes del lanzamiento de la aplicación completa

La aplicación real vive en un dominio separado (`app.diamadmin.com`) y en un repositorio distinto.

---

## 1. Tecnologías utilizadas

### Frontend
- Next.js 15.1.6
- React 18
- TypeScript
- TailwindCSS
- motion/react (Framer Motion)
- lucide-react
- Bebas Neue (Google Fonts)
- ESLint
- cross-env
- Cloudflare Pages

> El sitio se genera como **static export**, priorizando SEO, velocidad y simplicidad.

---

## 2. Arquitectura actual

```
Next.js (Landing)
↓
Cloudflare Pages
```

- Sitio estático sin backend propio
- Renderizado en build-time
- Optimizado para SEO y Core Web Vitals
- Formularios de contacto con UX completa (integración backend pendiente)

---

## 3. Relación con la aplicación real

Diamadmin está dividido desde el inicio en **dos capas independientes**:

### 🌍 Landing (este repo)
- Dominio: `diamadmin.com`
- Objetivo: marketing, validación, captación
- Tecnología: Next.js + Cloudflare Pages
- Estado: productivo

### ⚙️ Aplicación real (otro repo)
- Dominio: `app.diamadmin.com`
- Angular + Spring Boot + PostgreSQL
- Hosting independiente (VPS / PaaS)
- Autenticación, permisos, lógica de negocio
- Arquitectura multi-sector: Retail, Logística, Salud, Hostelería, Industria, Real Estate, RRHH, Finanzas

La landing **no depende de la app**, y la app **no depende de la landing**.

---

## 4. Estructura del proyecto

```
frontend/src/
├── app/
│   ├── globals.css
│   ├── layout.tsx        # Root layout + SEO metadata + JSON-LD
│   ├── page.tsx          # Composición de secciones
│   └── sitemap.ts        # Sitemap dinámico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   └── sections/
│       ├── Hero.tsx          # Animación diamante + honeycomb de sectores
│       ├── Producto.tsx
│       ├── Modulos.tsx       # Grid filtrable por sector
│       ├── ComoFunciona.tsx
│       ├── QuienesSomos.tsx
│       └── Contacto.tsx      # Formulario 3 pestañas (contacto, sugerencia, newsletter)
├── hooks/
│   └── useFadeInOnScroll.ts
├── lib/
│   └── utils.ts
├── styles/
│   └── variables.css
└── types/
    └── css.d.ts
```

---

## 5. Estado actual del proyecto

✅ Landing funcional y productiva  
✅ SEO técnico completo (JSON-LD, sitemap, Open Graph, Twitter Cards)  
✅ Configuración estable con Cloudflare Pages  
✅ Dark / light mode con ThemeToggle y anti-flicker script  
✅ Animaciones Framer Motion en Hero y todas las secciones  
✅ Multi-sector: 8 sectores cubiertos (Retail, Logística, Salud, Hostelería, Industria, Real Estate, RRHH, Finanzas)  
✅ Grid de módulos con filtro por sector  
✅ Formulario de contacto con 3 pestañas (UX completa)  
⏳ Integración backend del formulario de contacto  
⏳ Analytics / métricas de visitas  
⏳ Estrategia de precios (actualmente ocultos, pendiente decisión)  

---

## 6. Instalación y desarrollo local

```bash
# Instalar dependencias
cd frontend && npm install

# Desarrollo local
npm run dev          # http://localhost:3000

# Build estático
npm run build

# Servir build
npm run start

# Linter
npm run lint
```
