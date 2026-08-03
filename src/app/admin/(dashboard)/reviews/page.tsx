import type { Metadata } from "next";
import ReviewsPage from "@/admin/components/reviews/ReviewsPage";

export const metadata: Metadata = {
  title: "Reviews | Admin",
  robots: "noindex, nofollow",
};

export default function ReviewsRoute() {
  return <ReviewsPage />;
}
