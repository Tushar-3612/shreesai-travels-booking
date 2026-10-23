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

const FALLBACK_TITLE = "Sai Vaishnavi Tours and Travels | Reliable Car & Taxi Booking in Shirdi";
const FALLBACK_DESCRIPTION =
  "Book comfortable, affordable, and safe car rentals and taxi services in Shirdi with Sai Vaishnavi Tours and Travels. Local travel, airport transfers, outstation trips. 24/7 service, professional drivers.";

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = (await getSiteSnapshot()).settings;
  } catch {
    settings = null;
  }
  const seo = settings?.seo;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const title = seo?.title || FALLBACK_TITLE;
  const description = seo?.description || FALLBACK_DESCRIPTION;
  const logoUrl = settings?.logo || "/images/logo.jpeg";
  const ogImageUrl =
    seo?.ogImage?.includes("metadata-emblem")
      ? seo.ogImage
      : "/images/metadata-emblem.png";

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
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 800,
          alt: businessName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: settings?.favicon || "/images/logo.jpeg" },
        { url: "/images/logo.jpeg", type: "image/jpeg" },
      ],
      shortcut: ["/images/logo.jpeg"],
      apple: [{ url: "/images/logo.jpeg" }],
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
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/logo.jpeg" />
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
