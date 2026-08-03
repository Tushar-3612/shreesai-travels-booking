import type { Metadata } from "next";
import BookingsPage from "@/admin/components/bookings/BookingsPage";

export const metadata: Metadata = {
  title: "Bookings | Admin",
  robots: "noindex, nofollow",
};

export default function BookingsRoute() {
  return <BookingsPage />;
}
