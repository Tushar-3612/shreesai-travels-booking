import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ReviewsPage from "@/components/ReviewsPage";
import Footer from "@/components/Footer";
import JsonLd from "@/components/packages/JsonLd";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Reviews | Shirdi Car Rental & Taxi Service",
  description:
    "Read verified customer reviews of Shirdi Car Rental - rated 4.9/5 by 1,200+ happy travellers for airport transfers, temple darshan and outstation taxi packages.",
  openGraph: {
    title: "Customer Reviews | Shirdi Car Rental",
    description:
      "4.9/5 rated taxi service in Shirdi. Read what verified pilgrims and travellers say about our packages.",
    type: "website",
    locale: "en_IN",
    siteName: "Shirdi Car Rental",
  },
  alternates: { canonical: "/reviews" },
  robots: { index: true, follow: true },
};

export default async function ReviewsIndexPage() {
  const data = await getSiteSnapshot();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.settings.businessName,
    url: "https://www.shirdicarrental.com/reviews",
    telephone: data.settings.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.stats.avgRating.toFixed(1),
      reviewCount: data.stats.reviewCount || 1,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <ReviewsPage />
      <Footer />
    </>
  );
}
