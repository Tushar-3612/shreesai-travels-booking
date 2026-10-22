import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import JsonLd from "@/components/packages/JsonLd";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Sai Vaishnavi Tours and Travels",
  description:
    "Learn about Sai Vaishnavi Tours and Travels - trusted taxi service in Shirdi, premium fleet of well-maintained cars and thousands of happy pilgrims and travellers.",
  openGraph: {
    title: "About Us | Sai Vaishnavi Tours and Travels",
    description:
      "The story behind Sai Vaishnavi Tours and Travels - a trusted name for safe, comfortable and affordable taxi and tour service in Shirdi.",
    type: "website",
    locale: "en_IN",
    siteName: "Sai Vaishnavi Tours and Travels",
  },
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
};

export default async function AboutPage() {
  const data = await getSiteSnapshot();
  const settings = data.settings;

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${settings.businessName}`,
    description: metadata.description,
    url: "https://www.shirdicarrental.com/about",
    mainEntity: {
      "@type": "LocalBusiness",
      name: settings.businessName,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: "Shirdi",
        addressRegion: "Maharashtra",
        postalCode: "423109",
        addressCountry: "IN",
      },
      telephone: settings.phone,
      email: settings.email,
      priceRange: "₹400 - ₹15,500",
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-10 lg:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            About Us
          </span>
          <h1 className="section-title mt-2">
            Your Trusted Travel Partner in{" "}
            <span className="gradient-text">Shirdi</span>
          </h1>
          <p className="section-subtitle">
            {settings.about.subtitle}
          </p>
        </div>
      </main>
      <AboutUs />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
