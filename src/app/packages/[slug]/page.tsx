import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetail from "@/components/packages/PackageDetail";
import JsonLd from "@/components/packages/JsonLd";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getSiteSnapshot();
  const pkg = data.packages.find((p) => p.slug === slug);
  if (!pkg) {
    return {
      title: "Package Not Found | Sai Vaishnavi Tours and Travels",
      description:
        "The taxi package you are looking for does not exist. Explore all taxi packages from Shirdi.",
    };
  }
  return {
    title: pkg.seoTitle,
    description: pkg.seoDescription,
    keywords: `${pkg.name} taxi, taxi ${pkg.route}, car hire, cab booking, Shirdi taxi, one way taxi, round trip taxi`,
    openGraph: {
      title: `${pkg.name} | ${data.settings.businessName}`,
      description: pkg.seoDescription,
      type: "website",
      locale: "en_IN",
      siteName: data.settings.businessName,
      images: [
        {
          url: pkg.image,
          width: 1200,
          height: 630,
          alt: pkg.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.seoTitle,
      description: pkg.seoDescription,
      images: [pkg.image],
    },
    alternates: { canonical: `/packages/${pkg.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const data = await getSiteSnapshot();
  const pkg = data.packages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${pkg.name} Taxi Package - ${data.settings.businessName}`,
    description: pkg.seoDescription,
    image:
     [pkg.image, ...pkg.gallery.map((g) => g.src)],
    brand: {
      "@type": "Brand",
      name: data.settings.businessName,
      logo: "https://shreesai-travels-booking.vercel.app/images/logo.jpeg",
    },
    sku: `SCR-${pkg.slug.toUpperCase()}`,
    offers: pkg.priceNum > 0
      ? {
          "@type": "Offer",
          priceCurrency: "INR",
          price: pkg.priceNum,
          availability: "https://schema.org/InStock",
          url: `https://shreesai-travels-booking.vercel.app/packages/${pkg.slug}`,
          priceValidUntil: "2027-12-31",
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.stats.avgRating.toFixed(1),
      reviewCount: data.stats.reviewCount || 1,
    },
    additionalType: ["https://schema.org/Taxi", "https://schema.org/Trip"],
    areaServed: {
      "@type": "City",
      name: "Shirdi",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
  };

  // Remove undefined offer for custom-tour packages so the JSON stays valid.
  if (!pkg.priceNum) delete (schema as { offer?: unknown }).offer;

  return (
    <>
      <JsonLd data={schema} />
      <PackageDetail pkg={pkg} allPackages={data.packages} />
    </>
  );
}
