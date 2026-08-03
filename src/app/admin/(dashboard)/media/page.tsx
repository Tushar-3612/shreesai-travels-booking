import type { Metadata } from "next";
import MediaLibraryPage from "@/admin/components/media/MediaLibraryPage";

export const metadata: Metadata = {
  title: "Media Library | Admin",
  robots: "noindex, nofollow",
};

export default function MediaRoute() {
  return <MediaLibraryPage />;
}
