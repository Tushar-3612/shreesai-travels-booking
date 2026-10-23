import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sai Vaishnavi Tours and Travels",
    short_name: "Sai Vaishnavi",
    description: "Premier Car Rental & Tour Packages in Shirdi",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#EA580C",
    icons: [
      {
        src: "/images/metadata-emblem.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/logo.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/images/metadata-emblem.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
