import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import Toaster from "@/components/Toaster";
import { SiteProvider } from "@/lib/site";
import { getSiteSnapshot } from "@/lib/cms/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

const FALLBACK_TITLE = "Shirdi Car Rental | Reliable Car & Taxi Booking in Shirdi";
const FALLBACK_DESCRIPTION =
  "Book comfortable, affordable, and safe car rentals and taxi services in Shirdi. Local travel, airport transfers, outstation trips. 24/7 service, professional drivers.";

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = getSiteSnapshot().settings;
  } catch {
    settings = null;
  }
  const seo = settings?.seo;
  const businessName = settings?.businessName || "Shirdi Car Rental";
  const title = seo?.title || FALLBACK_TITLE;
  const description = seo?.description || FALLBACK_DESCRIPTION;

  return {
    metadataBase: new URL("https://www.shirdicarrental.com"),
    title,
    description,
    keywords: seo?.keywords,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      siteName: businessName,
      images: seo?.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seo?.ogImage ? [seo.ogImage] : undefined,
    },
    icons: {
      icon: settings?.favicon || "/favicon.ico",
    },
    verification: seo?.gscVerification
      ? { google: seo.gscVerification }
      : undefined,
    robots: "index, follow",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <SiteProvider>
          <PageTransition>{children}</PageTransition>
          <Toaster />
        </SiteProvider>
      </body>
    </html>
  );
}
