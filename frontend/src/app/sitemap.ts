import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.diamadmin.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Activa estas entradas cuando existan páginas independientes:
    // { url: `${baseUrl}/modulos`,       lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    // { url: `${baseUrl}/precios`,       lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    // { url: `${baseUrl}/como-funciona`, lastModified: new Date(), changeFrequency: "yearly",   priority: 0.7 },
    // { url: `${baseUrl}/contacto`,      lastModified: new Date(), changeFrequency: "yearly",   priority: 0.6 },
  ];
}

