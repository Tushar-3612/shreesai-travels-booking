import type { Metadata } from "next";
import GalleryPage from "@/admin/components/gallery/GalleryPage";

export const metadata: Metadata = {
  title: "Gallery | Admin",
  robots: "noindex, nofollow",
};

export default function GalleryRoute() {
  return <GalleryPage />;
}
