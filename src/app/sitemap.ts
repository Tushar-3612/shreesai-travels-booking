import type { MetadataRoute } from "next";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.shirdicarrental.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let packages: { slug: string }[] = [];
  try {
    packages = (await getSiteSnapshot()).packages;
  } catch {
    packages = [];
  }

  const packageEntries: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${BASE_URL}/packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...packageEntries,
  ];
}
