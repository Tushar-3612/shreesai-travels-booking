import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSuccess from "@/components/BookingSuccess";
import { readCollection } from "@/lib/cms/store";
import type { AdminBooking } from "@/admin/types";

export const metadata: Metadata = {
  title: "Booking Confirmation | Shirdi Car Rental",
  description:
    "View and manage your taxi booking confirmation. Check pickup, drop, journey details, and contact us.",
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ bookingId?: string }>;
}

export default async function BookingSuccessPage({ searchParams }: Props) {
  const { bookingId } = await searchParams;

  if (!bookingId) {
    return (
      <NotFoundState
        title="No Booking Reference"
        description="Your booking reference was not found in the URL. Please submit the booking form again."
      />
    );
  }

  const bookings = readCollection<AdminBooking[]>("bookings");
  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <NotFoundState
        title="Booking Not Found"
        description={`We could not find a booking with reference ID "${bookingId}". Please check your reference number.`}
      />
    );
  }

  return (
    <>
      <Navbar />
      <BookingSuccess booking={booking} />
      <Footer />
    </>
  );
}

function NotFoundState({ title, description }: { title: string; description: string }) {
  return (
    <>
      <Navbar />
      <main className="section-padding bg-bg-alt min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-10 w-10 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9 3.375c0 1.616.75 3.097 2.016 4.067A11.985 11.985 0 0012 21c2.652 0 5.125-.9 6.984-2.417A9.036 9.036 0 0021 15.75M9 10a3 3 0 116 0 3 3 0 01-6 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-secondary mb-3">{title}</h1>
          <p className="text-text-muted max-w-md mx-auto mb-8">{description}</p>
          <a
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a Taxi
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
