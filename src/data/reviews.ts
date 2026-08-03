export interface Review {
  id: string;
  name: string;
  route: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

export const REVIEW_ROUTES = [
  "Shirdi → Mumbai",
  "Shirdi → Pune",
  "Shirdi → Nashik",
  "Shirdi → Chhatrapati Sambhajinagar",
  "Shirdi → Trimbakeshwar",
  "Shirdi → Shani Shingnapur",
  "Shirdi → Bhimashankar",
  "Shirdi → Ajanta Ellora",
  "Shirdi Airport Pickup",
  "Local Shirdi Darshan",
];

export const SEED_REVIEWS: Review[] = [
  {
    id: "seed-1",
    name: "Anjali Menon",
    route: "Shirdi → Trimbakeshwar",
    rating: 5,
    text: "The Trimbakeshwar darshan package was beautifully planned. Early darshan, a patient driver and a spotless car - felt truly cared for.",
    date: "2026-07-26",
    verified: true,
  },
  {
    id: "seed-2",
    name: "Rahul Sharma",
    route: "Shirdi → Mumbai",
    rating: 5,
    text: "Excellent service! The driver was professional and the car was spotless. Reached Mumbai on time without a single hassle. Highly recommended.",
    date: "2026-07-21",
    verified: true,
  },
  {
    id: "seed-3",
    name: "Meera Nair",
    route: "Shirdi Airport Pickup",
    rating: 5,
    text: "Our flight landed 40 minutes early and the driver was still waiting at the gate with a name board. Seamless airport pickup.",
    date: "2026-07-15",
    verified: true,
  },
  {
    id: "seed-4",
    name: "Sanjay Rathod",
    route: "Local Shirdi Darshan",
    rating: 5,
    text: "Full-day Shirdi darshan with my parents - the driver assisted them at every step. Respectful, professional and always on time.",
    date: "2026-07-08",
    verified: true,
  },
  {
    id: "seed-5",
    name: "Priya Patil",
    route: "Shirdi → Pune",
    rating: 5,
    text: "Best car rental service in Shirdi. Used them for local darshan too. Very affordable rates and extremely courteous staff.",
    date: "2026-06-29",
    verified: true,
  },
  {
    id: "seed-6",
    name: "Rohan Kshirsagar",
    route: "Shirdi → Ajanta Ellora",
    rating: 5,
    text: "The 2-day Ajanta Ellora tour was mesmerising. Perfect planning, comfortable car and the driver managed both days flawlessly.",
    date: "2026-06-20",
    verified: true,
  },
  {
    id: "seed-7",
    name: "Divya Iyer",
    route: "Shirdi → Pune",
    rating: 5,
    text: "Booked a one-way taxi to Pune. Transparent pricing, clean AC sedan and a friendly driver. Best cab experience in Shirdi.",
    date: "2026-06-11",
    verified: true,
  },
  {
    id: "seed-8",
    name: "Amit Deshmukh",
    route: "Shirdi → Nashik",
    rating: 5,
    text: "Impressed by the cleanliness of the vehicle and the punctuality. The booking process was smooth and the driver knew every route.",
    date: "2026-06-03",
    verified: true,
  },
  {
    id: "seed-9",
    name: "Sneha Kulkarni",
    route: "Local Shirdi Darshan",
    rating: 4,
    text: "Very reliable taxi service in Shirdi. The driver was knowledgeable about all the temples and attractions. Fair pricing too.",
    date: "2026-05-24",
    verified: true,
  },
  {
    id: "seed-10",
    name: "Shweta Bhosale",
    route: "Shirdi Airport Pickup",
    rating: 5,
    text: "Late-night pickup worked perfectly. The driver tracked our arrival and was waiting even before we exited. Very professional.",
    date: "2026-05-16",
    verified: true,
  },
  {
    id: "seed-11",
    name: "Vikram Joshi",
    route: "Shirdi → Bhimashankar",
    rating: 5,
    text: "A perfect weekend trip. The driver took the safe scenic ghat and we loved the cool forest air at Bhimashankar.",
    date: "2026-05-09",
    verified: true,
  },
  {
    id: "seed-12",
    name: "Kiran Pawar",
    route: "Shirdi → Shani Shingnapur",
    rating: 4,
    text: "Smooth journey to Shani Shingnapur and back the same day. The car waited at the temple and the fare was exactly as quoted.",
    date: "2026-04-30",
    verified: true,
  },
];

export function formatReviewDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function sortNewestFirst(reviews: Review[]): Review[] {
  return [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
