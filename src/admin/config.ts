export const ADMIN_CONFIG = {
  brand: {
    name: "Sai Vaishnavi Tours and Travels",
    tagline: "Admin Panel",
  },
  jwt: {
    secret:
      process.env.ADMIN_JWT_SECRET || "scr-admin-jwt-secret-change-me-in-prod",
    expiresInSeconds: 8 * 60 * 60,
    cookieName: "scr_admin_token",
  },
  credentials: {
    email: process.env.ADMIN_EMAIL || "admin@shirdicarrental.com",
    password: process.env.ADMIN_PASSWORD || "admin123",
    name: "Administrator",
  },
  uploads: {
    maxSizeBytes: 5 * 1024 * 1024,
    allowedExtensions: [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".svg",
      ".ico",
      ".avif",
      ".bmp",
    ],
  },
};

console.log("ADMIN_EMAIL =", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD =", process.env.ADMIN_PASSWORD);