import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import Toaster from "@/components/Toaster";
import { SiteProvider } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

const DOMAIN_URL = "https://shreesai-travels-booking.vercel.app";
const SITE_TITLE = "Sai Vaishnavi Tours and Travels | Best Cab Booking in Shirdi";
const SITE_DESCRIPTION =
  "Book safe, reliable, and affordable taxi services in Shirdi with Sai Vaishnavi Tours and Travels. 24/7 Shirdi Airport drop, temple darshan, and outstation cabs to Pune, Mumbai, Nashik.";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "cab booking in shirdi",
    "taxi service shirdi",
    "shirdi car rental",
    "sai vaishnavi tours and travels",
    "best cab booking in shirdi",
    "shirdi airport taxi",
    "shirdi airport cab drop",
    "shirdi to pune cab",
    "shirdi to mumbai taxi",
    "shirdi to nashik cab",
    "trimbakeshwar darshan taxi",
    "shani shingnapur car rental",
    "bhimashankar tour package",
    "outstation cabs shirdi",
    "shirdi cab booking online",
    "tempo traveller in shirdi",
    "urbania rental shirdi",
  ],
  alternates: {
    canonical: DOMAIN_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: DOMAIN_URL,
    siteName: "Sai Vaishnavi Tours and Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/metadata-emblem.png",
        width: 800,
        height: 800,
        alt: "Sai Vaishnavi Tours and Travels Emblem",
      },
      {
        url: "/images/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Sai Vaishnavi Tours and Travels Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/metadata-emblem.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/metadata-emblem.png" },
      { url: "/images/logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: ["/images/logo.jpeg"],
    apple: [{ url: "/images/logo.jpeg" }],
  },
};

const taxiServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${DOMAIN_URL}/#taxiservice`,
  name: "Sai Vaishnavi Tours and Travels",
  alternateName: [
    "Sai Vaishnavi Travels",
    "Sai Vaishnavi Tours & Travels",
    "Shirdi Cab Booking",
  ],
  description: SITE_DESCRIPTION,
  url: DOMAIN_URL,
  telephone: "+91 74984 62597",
  priceRange: "₹400 - ₹15,500",
  image: `${DOMAIN_URL}/images/metadata-emblem.png`,
  logo: `${DOMAIN_URL}/images/logo.jpeg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Airport Road Dwarawati Shirdi",
    addressLocality: "Shirdi",
    addressRegion: "Maharashtra",
    postalCode: "423109",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.7668,
    longitude: 74.4762,
  },
  areaServed: [
    { "@type": "City", name: "Shirdi" },
    { "@type": "City", name: "Pune" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Nashik" },
    { "@type": "City", name: "Trimbakeshwar" },
    { "@type": "City", name: "Shani Shingnapur" },
    { "@type": "City", name: "Chhatrapati Sambhajinagar" },
    { "@type": "City", name: "Bhimashankar" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  serviceType: [
    "Taxi Service in Shirdi",
    "Cab Booking in Shirdi",
    "Shirdi Airport Taxi & Transfers",
    "Outstation Cabs to Pune, Mumbai & Nashik",
    "Pilgrimage Temple Darshan Charters",
  ],
  provider: {
    "@type": "LocalBusiness",
    name: "Sai Vaishnavi Tours and Travels",
    telephone: "+91 74984 62597",
    url: DOMAIN_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Airport Road Dwarawati Shirdi",
      addressLocality: "Shirdi",
      addressRegion: "Maharashtra",
      postalCode: "423109",
      addressCountry: "IN",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased pb-16 md:pb-0" suppressHydrationWarning>
        <SiteProvider>
          <PageTransition>{children}</PageTransition>
          <Toaster />
        </SiteProvider>
      </body>
    </html>
  );
}
