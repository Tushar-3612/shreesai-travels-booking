import type { Metadata } from "next";
import PackagesPage from "@/components/packages/PackagesPage";
import JsonLd from "@/components/packages/JsonLd";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Taxi Packages from Shirdi | Check Popular Destinations & Fares",
  description:
    "Browse popular taxi packages from Shirdi - Mumbai, Pune, Nashik, Trimbakeshwar, Shami Nandapur, Shirdi Airport & more. Transparent fares, fuel & tolls included, professional drivers, 24x7 service.",
  keywords:
    "taxi packages from Shirdi, Shirdi car rental packages, Cab booking Shirdi, Shirdi temple tour package, one way taxi Shirdi, Shirdi airport taxi",
  openGraph: {
    title: "Taxi Packages from Shirdi | Popular Destinations & Fares",
    description:
      "Select your destination and get a fixed, transparent quote. 12+ verified taxi packages with fuel, tolls and professional drivers included.",
    type: "website",
    locale: "en_IN",
    siteName: "Shirdi Car Rental",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxi Packages from Shirdi",
    description:
      "Premium taxi packages from Shirdi to Mumbai, Pune, Nashik, temples & airports. Transparent fares, 24x7 booking.",
  },
  alternates: { canonical: "/packages" },
  robots: { index: true, follow: true },
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function PackagesIndex({ searchParams }: Props) {
  const params = await searchParams;
  const data = getSiteSnapshot();

  const category =
    typeof params.category === "string" &&
    data.categories.includes(params.category)
      ? params.category
      : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Taxi Packages from Shirdi",
    description: metadata.description,
    url: "https://www.shirdicarrental.com/packages",
    provider: {
      "@type": "LocalBusiness",
      name: data.settings.businessName,
      image: data.settings.seo.ogImage || data.packages[0]?.image,
      telephone: data.settings.phone,
      priceRange: "₹400-₹15,500",
    },
    hasPart: data.packages.map((p) => ({
      "@type": "Trip",
      name: p.name,
      url: `https://www.shirdicarrental.com/packages/${p.slug}`,
      description: p.description,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PackagesPage
        initialCategory={category}
        packages={data.packages}
        categories={data.categories}
      />
    </>
  );
}
