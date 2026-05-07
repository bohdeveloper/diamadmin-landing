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

### Frontend (estado actual)
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- ESLint
- Cloudflare Pages

> El sitio se genera como **static export**, priorizando SEO, velocidad y simplicidad.

---

## 2. Arquitectura actual

Next.js (Landing)<br>  
↓<br>
Cloudflare Pages  

- Sitio estático sin backend propio
- Renderizado en build-time
- Optimizado para SEO y Core Web Vitals
- Preparado para añadir APIs externas (formularios, analytics, etc.)

---

## 3. Relación con la aplicación real

Diamadmin está dividido desde el inicio en **dos capas independientes**:

### 🌍 Landing (este repo)
- Dominio: `diamadmin.com`
- Objetivo: marketing, validación, captación
- Tecnología: Next.js + Pages
- Estado: estático

### ⚙️ Aplicación real (otro repo)
- Dominio: `app.diamadmin.com`
- Angular + Spring Boot + Base de datos
- Hosting independiente (VPS / PaaS)
- Autenticación, permisos, lógica de negocio

La landing **no depende de la app**, y la app **no depende de la landing**.

---

## 4. Estructura del proyecto (simplificada)
src/<br>
├── app/<br>
│   ├── page.tsx          # Home<br>
│   ├── features/         # Secciones (producto, roadmap, etc.)<br>
│   └── layout.tsx<br>
├── data/<br>
│   └── features.ts       # Contenido desacoplado<br>
├── services/<br>
│   └── contact.service.ts (futuro)<br>
├── types/<br>
│   └── feature.ts

La UI **no accede directamente a los datos**, permitiendo evolucionar el proyecto sin refactor pesado.

---

## 5. Estado actual del proyecto

✅ Landing funcional y productiva  
✅ SEO técnico optimizado  
✅ Configuración estable con Cloudflare Pages  
✅ Contenido desacoplado de la UI  
✅ Preparada para validar el producto  

---

## 6. Instalación

```bash
npm install
```


 # Desarrollo local
 ```bash
npm run build     # Build estático
npm run start     # Servir build
npm run lint      # Linter
```

8. Puesta en marcha
```bash
npm run dev
```

🌍 Disponible en: http://localhost:3000