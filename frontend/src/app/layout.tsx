import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/* ============================
   VIEWPORT
============================ */
export const viewport = {
  themeColor: "#0d0d0d",
};

/* ============================
   METADATA SEO GLOBAL
============================ */
export const metadata = {
  metadataBase: new URL("https://www.diamadmin.com"),

  title: {
    default: "Diamadmin · Administración Empresarial para Pymes",
    template: "%s | Diamadmin",
  },
  description:
    "Diamadmin es la aplicación de administración empresarial modular para organizar tu negocio. Controla stock, facturación, RRHH, logística y más desde una sola plataforma. Ideal para pymes de cualquier sector.",

  keywords: [
    "administración empresarial",
    "aplicación administrativa",
    "software de gestión empresarial",
    "controlar stock empresa",
    "organizar mi negocio",
    "ERP pymes",
    "gestión de stock",
    "facturación para pymes",
    "software de gestión modular",
    "sistema administrativo empresarial",
    "digitalización empresarial",
    "gestión de negocios online",
    "panel de administración empresa",
    "software hostelería",
    "gestión logística",
    "gestión clínica",
    "RRHH software",
    "Diamadmin",
  ],

  authors: [{ name: "Diamadmin", url: "https://www.diamadmin.com" }],
  creator: "Diamadmin",
  publisher: "Diamadmin",

  alternates: {
    canonical: "https://www.diamadmin.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  manifest: "/favicon/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/favicon/favicon-32x32.png", color: "#1B75BB" },
    ],
  },

  /* ---------- OPEN GRAPH ---------- */
  openGraph: {
    title: "Diamadmin · Administración Empresarial para Pymes",
    description:
      "Organiza tu negocio, controla el stock, gestiona tu equipo y automatiza la facturación. Diamadmin: la plataforma de administración empresarial modular para pymes de cualquier sector.",
    url: "https://www.diamadmin.com",
    siteName: "Diamadmin",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/images/logo_diamadmin.png",
        alt: "Diamadmin - Aplicación de administración empresarial para pymes",
      },
    ],
  },

  /* ---------- TWITTER ---------- */
  twitter: {
    card: "summary_large_image",
    title: "Diamadmin · Administración Empresarial para Pymes",
    description:
      "Controla el stock, organiza tu negocio y gestiona cada área desde un único panel. Diamadmin: software de gestión modular para pymes.",
    images: ["/images/logo_diamadmin.png"],
    creator: "@diamadmin",
  },
};

/* ============================
   ROOT LAYOUT
============================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>

        {/* ============================
           JSON-LD: SOFTWARE APPLICATION
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Diamadmin",
              "url": "https://www.diamadmin.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description":
                "Diamadmin es una aplicación de administración empresarial modular para pymes. Permite controlar stock, organizar el negocio, gestionar facturación, RRHH y logística desde un único panel.",
              "featureList": [
                "Control de stock e inventario",
                "Facturación y contabilidad",
                "Gestión de RRHH y nóminas",
                "Módulo de ventas y TPV",
                "Gestión logística y almacén",
                "Historial clínico y gestión sanitaria",
                "Analytics y dashboards en tiempo real",
                "Gestión inmobiliaria",
                "Hostelería y comanda digital",
                "Módulo de producción industrial",
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "description": "Prueba gratuita disponible",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Diamadmin",
                "url": "https://www.diamadmin.com",
              },
            }),
          }}
        />

        {/* ============================
           JSON-LD: ORGANIZATION
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Diamadmin",
              "url": "https://www.diamadmin.com",
              "logo": "https://www.diamadmin.com/images/logo.png",
              "description":
                "Diamadmin desarrolla software de administración empresarial modular para pymes. Soluciones para controlar stock, organizar negocios y digitalizar operaciones en más de 12 sectores.",
              "foundingDate": "2024",
              "areaServed": "ES",
              "serviceType": [
                "Software de administración empresarial",
                "Aplicación para organizar negocios",
                "Control de stock para empresas",
                "ERP modular para pymes",
              ],
            }),
          }}
        />

        {/* ============================
           JSON-LD: FAQ (featured snippets)
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Qué es Diamadmin?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Diamadmin es una aplicación de administración empresarial modular para pymes. Permite centralizar y controlar ventas, stock, facturación, RRHH, logística y más desde un único panel, adaptándose a más de 12 sectores.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "¿Cómo puedo controlar el stock de mi empresa con Diamadmin?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Con el módulo de Logística & Stock de Diamadmin puedes gestionar el inventario en tiempo real, controlar entradas y salidas, recibir alertas de stock mínimo y sincronizarlo con ventas y compras, todo integrado en tu operativa.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "¿Cómo organizo mi negocio con Diamadmin?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Diamadmin te ayuda a organizar tu negocio activando únicamente los módulos que necesitas: ventas, facturación, gestión de equipo, análisis de datos, logística, etc. La configuración es guiada y puedes estar operativo en pocos días.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "¿Para qué sectores está disponible Diamadmin?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Diamadmin cubre más de 12 sectores: retail, hostelería, logística, salud, industria, real estate, RRHH, finanzas y más. Cada sector dispone de módulos específicos adaptados a su operativa.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "¿Es Diamadmin una alternativa al ERP tradicional?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Diamadmin ofrece las funcionalidades de un ERP empresarial con una interfaz moderna y precios adaptados a pymes, sin la complejidad ni los costes de implementación de los sistemas tradicionales.",
                  },
                },
              ],
            }),
          }}
        />

        {/* ============================
           JSON-LD: WEBSITE
        ============================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Diamadmin",
              "url": "https://www.diamadmin.com",
              "description":
                "Software de administración empresarial modular para pymes. Controla tu negocio, gestiona el stock y digitaliza operaciones con Diamadmin.",
              "inLanguage": "es-ES",
            }),
          }}
        />

        {/* ============================
           SCRIPT ANTI-FLICKER (THEME)
        ============================ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* ============================
           UMAMI ANALYTICS
           Sin cookies · compatible RGPD · no requiere banner de consentimiento
           Crear sitio en umami.is para diamadmin.com y reemplazar data-website-id
        ============================ */}
        {/* <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="PENDIENTE"
        /> */}

        <CookieBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}