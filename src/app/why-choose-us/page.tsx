import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedPackages from "@/components/FeaturedPackages";
import Footer from "@/components/Footer";
import JsonLd from "@/components/packages/JsonLd";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Why Choose Us | Sai Vaishnavi Tours and Travels",
  description:
    "Discover why travellers trust Sai Vaishnavi Tours and Travels - professional drivers, 24x7 service, clean cars, affordable fares, safe journeys and instant booking.",
  openGraph: {
    title: "Why Choose Us | Sai Vaishnavi Tours and Travels",
    description:
      "Professional drivers, clean cars, transparent fares and 24x7 support - the reasons travellers pick Sai Vaishnavi Tours and Travels.",
    type: "website",
    locale: "en_IN",
    siteName: "Sai Vaishnavi Tours and Travels",
    images: [
      {
        url: "/images/metadata-emblem.png",
        width: 800,
        height: 800,
        alt: "Sai Vaishnavi Travels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/metadata-emblem.png"],
  },
  alternates: { canonical: "/why-choose-us" },
  robots: { index: true, follow: true },
};

export default async function WhyChooseUsPage() {
  const data = await getSiteSnapshot();

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Why Choose ${data.settings.businessName}`,
    description: metadata.description,
    url: "https://www.shirdicarrental.com/why-choose-us",
    about: {
      "@type": "LocalBusiness",
      name: data.settings.businessName,
      telephone: data.settings.phone,
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-10 lg:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Why Choose Us
          </span>
          <h1 className="section-title mt-2">
            The Sai Vaishnavi <span className="gradient-text">Difference</span>
          </h1>
          <p className="section-subtitle">
            Safe journeys, transparent fares and drivers you can trust - built
            over years of serving pilgrims and travellers.
          </p>
        </div>
      </main>
      <WhyChooseUs />
      <FeaturedPackages />
      <Footer />
    </>
  );
}
