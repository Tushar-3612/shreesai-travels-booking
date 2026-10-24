import type { MetadataRoute } from "next";
import { getSiteSnapshot } from "@/lib/cms/site";
import { packages as fallbackPackages } from "@/data/packages";

export const dynamic = "force-dynamic";

const BASE_URL = "https://shreesai-travels-booking.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let packageList: { slug: string }[] = [];
  try {
    const data = await getSiteSnapshot();
    packageList = data.packages && data.packages.length > 0 ? data.packages : fallbackPackages;
  } catch {
    packageList = fallbackPackages;
  }

  const packageEntries: MetadataRoute.Sitemap = packageList.map((p) => ({
    url: `${BASE_URL}/packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...packageEntries,
  ];
}
