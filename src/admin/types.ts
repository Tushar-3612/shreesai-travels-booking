export type BookingStatus = "Pending" | "Completed" | "Cancelled";
export type TripType = "One Way" | "Round Trip";

export interface AdminBooking {
  id: string;
  customerName: string;
  phone: string;
  pickup: string;
  drop: string;
  pickupAddress: string;
  date: string;
  time: string;
  vehicle: string;
  passengers: number;
  tripType: TripType;
  message: string;
  status: BookingStatus;
  createdAt: string;
}

export interface AdminPackage {
  id: string;
  slug: string;
  route: string;
  from: string;
  to: string;
  category: string;
  distance: string;
  duration: string;
  price: string;
  priceNum: number;
  roundTrip: string;
  description: string;
  included: string[];
  image: string;
  imageAlt: string;
  gallery: string[];
  badge: string;
  status: "active" | "inactive";
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface AdminVehicle {
  id: string;
  name: string;
  image: string;
  price: string;
  seats: number;
  fuel: string;
  ac: string;
  transmission: "Manual" | "Automatic";
  description: string;
  status: "available" | "unavailable";
}

export interface AdminService {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "active" | "inactive";
}

export type ReviewStatus = "approved" | "pending" | "rejected";

export interface AdminReview {
  id: string;
  name: string;
  route: string;
  rating: number;
  text: string;
  date: string;
  status: ReviewStatus;
  featured: boolean;
  source: "seed" | "user" | "admin";
}

export interface GalleryItem {
  id: string;
  src: string;
  label: string;
  tag: string;
}

export interface MediaItem {
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface HeroSlide {
  heading: string;
  gold: string;
  subtitle: string;
  image: string;
}

export interface TrustCounter {
  value: string;
  label: string;
}

export interface WhyItem {
  icon: string;
  title: string;
  description: string;
}

export interface RouteItem {
  route: string;
  slug: string;
  price: string;
}

export interface AboutContent {
  heading: string;
  subtitle: string;
  mission: string;
  vision: string;
  description: string;
  image: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  gaId: string;
  gscVerification: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  logo: string;
  favicon: string;
  heroSlides: HeroSlide[];
  trustCounters: TrustCounter[];
  about: AboutContent;
  whyChooseUs: WhyItem[];
  mostBookedRoutes: RouteItem[];
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsLink: string;
  instagram: string;
  facebook: string;
  youtube: string;
  workingHours: string;
  footerCopyright: string;
  companyDescription: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  seo: SeoSettings;
}

export interface AdminProfile {
  name: string;
  email: string;
  photoUrl: string;
}
