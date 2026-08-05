import { seedDatabase } from "../src/lib/seed";

seedDatabase().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
