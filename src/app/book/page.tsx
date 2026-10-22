import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Taxi from Shirdi | Quick & Secure Online Booking",
  description:
    "Book your cab online in 30 seconds. Transparent all-inclusive fares with fuel, tolls & driver. AC cars for Shirdi darshan, airport pickups & outstation trips. 24x7 support.",
  keywords:
    "book taxi shirdi, online cab booking, Shirdi airport taxi, outstation taxi, AC car rental, Shirdi darshan taxi",
  openGraph: {
    title: "Book a Taxi from Shirdi | Secure Online Booking",
    description:
      "Book your cab online in 30 seconds with transparent, all-inclusive fares. AC cars for Shirdi darshan, airport & outstation trips.",
    type: "website",
    locale: "en_IN",
    siteName: "Shirdi Car Rental",
  },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <BookingForm />
      <Footer />
    </>
  );
}
