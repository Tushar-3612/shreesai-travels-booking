import { CONTACT, IMG, VEHICLES, packages } from "@/data/packages";
import { SEED_REVIEWS } from "@/data/reviews";
import type {
  AdminBooking,
  AdminPackage,
  AdminReview,
  AdminService,
  AdminVehicle,
  GalleryItem,
  SiteSettings,
} from "../types";

const daysFromNow = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export function seedBookings(): AdminBooking[] {
  return [
    {
      id: "bk-1001",
      customerName: "Rahul Sharma",
      phone: "+91 98200 12345",
      pickup: "Sai Chhaya Hotel, Shirdi",
      drop: "Mumbai Airport T2",
      pickupAddress: "Sai Chhaya Hotel, Near Sai Temple, Shirdi 423109",
      date: daysFromNow(3),
      time: "05:30",
      vehicle: "Swift Dzire",
      passengers: 1,
      tripType: "One Way",
      message: "Early morning flight drop. 2 medium bags, please be on time.",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600e3 * 2).toISOString(),
    },
    {
      id: "bk-1002",
      customerName: "Priya Patil",
      phone: "+91 98345 67890",
      pickup: "Shirdi Sai Mandir",
      drop: "Hinjawadi, Pune",
      pickupAddress: "Shirdi Sai Mandir, Shirdi 423109",
      date: daysFromNow(1),
      time: "07:00",
      vehicle: "XUV XL6",
      passengers: 5,
      tripType: "Round Trip",
      message: "Round trip for a family of 5. Will return next evening.",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600e3 * 5).toISOString(),
    },
    {
      id: "bk-1003",
      customerName: "Amit Deshmukh",
      phone: "+91 97654 32100",
      pickup: "Sai Ashram Road, Shirdi",
      drop: "Nashik (Godavari Ghat)",
      pickupAddress: "Sai Ashram Road, Shirdi 423109",
      date: daysFromNow(2),
      time: "09:00",
      vehicle: "7 Seater Traveller",
      passengers: 4,
      tripType: "One Way",
      message: "Pickup from hotel reception. 4 passengers with luggage.",
      status: "Pending",
      createdAt: new Date(Date.now() - 3600e3 * 9).toISOString(),
    },
    {
      id: "bk-1004",
      customerName: "Sneha Kulkarni",
      phone: "+91 98901 23456",
      pickup: "Shirdi Airport",
      drop: "Hotel Sun-n-Sand, Shirdi",
      pickupAddress: "Shirdi Airport Terminal, Departures, Shirdi 423109",
      date: daysFromNow(-2),
      time: "18:15",
      vehicle: "Swift Dzire",
      passengers: 2,
      tripType: "One Way",
      message: "Flight 6E 512. Meet at arrival gate with name board.",
      status: "Completed",
      createdAt: new Date(Date.now() - 3600e3 * 30).toISOString(),
    },
    {
      id: "bk-1005",
      customerName: "Vikram Joshi",
      phone: "+91 90220 11223",
      pickup: "Shirdi Temple Complex",
      drop: "Bhimashankar Jyotirlinga",
      pickupAddress: "Shirdi Temple Complex, Shirdi 423109",
      date: daysFromNow(-5),
      time: "06:00",
      vehicle: "XUV XL6",
      passengers: 6,
      tripType: "Round Trip",
      message: "Weekend trip with family, return same day by 8 pm.",
      status: "Completed",
      createdAt: new Date(Date.now() - 3600e3 * 80).toISOString(),
    },
    {
      id: "bk-1006",
      customerName: "Meera Nair",
      phone: "+91 98500 44556",
      pickup: "Sainagar Shirdi Station",
      drop: "Shirdi Sai Darshan",
      pickupAddress: "Sainagar Shirdi Railway Station, Platform 1, Shirdi 423109",
      date: daysFromNow(-8),
      time: "07:45",
      vehicle: "Swift Dzire",
      passengers: 1,
      tripType: "One Way",
      message: "Train arrival 07:20. Track live and wait at platform exit.",
      status: "Completed",
      createdAt: new Date(Date.now() - 3600e3 * 140).toISOString(),
    },
    {
      id: "bk-1007",
      customerName: "Kiran Pawar",
      phone: "+91 95600 77889",
      pickup: "Shirdi",
      drop: "Shani Shingnapur",
      pickupAddress: "Shirdi Sai Mandir, Shirdi 423109",
      date: daysFromNow(-1),
      time: "08:00",
      vehicle: "7 Seater Traveller",
      passengers: 6,
      tripType: "Round Trip",
      message: "Same day darshan return. 6 elderly passengers.",
      status: "Cancelled",
      createdAt: new Date(Date.now() - 3600e3 * 12).toISOString(),
    },
    {
      id: "bk-1008",
      customerName: "Divya Iyer",
      phone: "+91 97410 66554",
      pickup: "Hotel Grand, Shirdi",
      drop: "Chhatrapati Sambhajinagar (Bibi Ka Maqbara)",
      pickupAddress: "Hotel Grand, Near Sai Temple, Shirdi 423109",
      date: daysFromNow(-12),
      time: "06:30",
      vehicle: "Swift Dzire",
      passengers: 2,
      tripType: "One Way",
      message: "Booked Ajanta Ellora day tour from Chhatrapati Sambhajinagar. 2 passengers.",
      status: "Cancelled",
      createdAt: new Date(Date.now() - 3600e3 * 200).toISOString(),
    },
  ];
}

export function seedPackages(): AdminPackage[] {
  return packages.map((p) => {
    const [from, to] = p.route.split("→").map((part) => part.trim());
    return {
      id: `pkg-${p.slug}`,
      slug: p.slug,
      route: p.route,
      from: from || "Shirdi",
      to: to || p.destination,
      category: p.category,
      distance: p.distance,
      duration: p.duration,
      price: p.price,
      priceNum: p.priceNum,
      roundTrip: p.roundTrip,
      description: p.description,
      included: [...p.included],
      image: p.image,
      imageAlt: p.imageAlt,
      gallery: p.gallery.map((g) => g.src),
      badge: p.badge ?? "",
      status: "active",
      featured: p.badge === "Most Popular" || p.badge === "Best Seller",
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
    };
  });
}

export function seedVehicles(): AdminVehicle[] {
  return VEHICLES.map((v, index) => ({
    id: `veh-${index + 1}`,
    name: v.name,
    image: v.image,
    price: index === 0 ? "₹12 / km" : index === 1 ? "₹10 / km" : "₹14 / km",
    seats: v.seats,
    fuel: v.fuel,
    ac: v.ac,
    transmission: "Manual",
    description: v.description,
    status: "available",
  }));
}

export function seedServices(): AdminService[] {
  return [
    {
      id: "svc-1",
      name: "Airport Pickup",
      icon: "FaPlane",
      description:
        "24x7 door-to-door airport transfers with flight tracking, meet & greet and zero waiting charges.",
      status: "active",
    },
    {
      id: "svc-2",
      name: "Railway Pickup",
      icon: "FaTrain",
      description:
        "Sainagar Shirdi station pickups with live train tracking and flat, transparent fares.",
      status: "active",
    },
    {
      id: "svc-3",
      name: "Local Darshan",
      icon: "FaLandmark",
      description:
        "Full-day Shirdi temple circuit - Dwarkamai, Chavadi, Samadhi Mandir and Lendi gardens at your pace.",
      status: "active",
    },
    {
      id: "svc-4",
      name: "Outstation Trip",
      icon: "FaCarSide",
      description:
        "One-way and round trips to Mumbai, Pune, Nashik, Chhatrapati Sambhajinagar and beyond with fuel & tolls included.",
      status: "active",
    },
    {
      id: "svc-5",
      name: "Temple Tour",
      icon: "FaMountain",
      description:
        "Jyotirlinga and temple circuits - Trimbakeshwar, Bhimashankar, Shani Shingnapur with darshan planning.",
      status: "active",
    },
    {
      id: "svc-6",
      name: "Custom Tour",
      icon: "FaRoute",
      description:
        "Tailor-made multi-day, multi-city itineraries across Maharashtra with free route planning.",
      status: "active",
    },
  ];
}

export function seedReviews(): AdminReview[] {
  return SEED_REVIEWS.map((r) => ({
    id: r.id,
    name: r.name,
    route: r.route,
    rating: r.rating,
    text: r.text,
    date: r.date,
    status: "approved" as const,
    featured: false,
    source: "seed" as const,
  }));
}

export function seedGallery(): GalleryItem[] {
  return [
    { id: "gal-1", src: IMG.saiShirdi, label: "Shirdi", tag: "Sai Samadhi Mandir" },
    { id: "gal-2", src: IMG.mumbaiSeaLink, label: "Mumbai", tag: "Bandra-Worli Sea Link" },
    { id: "gal-3", src: IMG.pune, label: "Pune", tag: "City skyline" },
    { id: "gal-4", src: IMG.nashik, label: "Nashik", tag: "Pandav Leni view" },
    { id: "gal-5", src: IMG.ajanta, label: "Ajanta Ellora", tag: "UNESCO caves" },
    { id: "gal-6", src: IMG.bhimashankar, label: "Bhimashankar", tag: "Jyotirlinga & forest" },
    { id: "gal-7", src: IMG.trimbakeshwar, label: "Trimbakeshwar", tag: "Jyotirlinga temple" },
    { id: "gal-8", src: IMG.shaniShingnapur, label: "Shani Shingnapur", tag: "Open-air temple" },
    { id: "gal-9", src: IMG.shirdiAirport, label: "Airport Pickup", tag: "24x7 transfers" },
    {
      id: "gal-10",
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
      label: "Family Tour",
      tag: "Group journeys",
    },
    {
      id: "gal-11",
      src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
      label: "Luxury Taxi",
      tag: "Premium rides",
    },
    { id: "gal-12", src: IMG.saiPortrait, label: "Temple Visit", tag: "Darshan tours" },
  ];
}

export function seedSettings(): SiteSettings {
  return {
    businessName: "Shirdi Car Rental",
    tagline: "Trusted Car Rental & Taxi Service in Shirdi",
    logo: "",
    favicon: "/favicon.ico",
    heroSlides: [
      {
        heading: "Shree Sai Tours And Travels",
        gold: "Shree Sai",
        subtitle:
          "Premium chauffeur-driven cars for Shirdi darshan, airport transfers and outstation journeys across Maharashtra.",
        image: IMG.heroCar,
      },
      {
        heading: "Professional Taxi Service in Shirdi",
        gold: "Shirdi",
        subtitle:
          "24x7 taxi service with verified drivers, clean AC cars and transparent fares on every route.",
        image: IMG.mountainValley,
      },
      {
        heading: "Explore Maharashtra Comfortably",
        gold: "Maharashtra",
        subtitle:
          "From Shirdi to Mumbai, Pune, Nashik and the great temples of the Deccan - travel in total comfort.",
        image: IMG.mumbaiSeaLink,
      },
      {
        heading: "Safe & Affordable Cab Service",
        gold: "Cab Service",
        subtitle:
          "Fuel, tolls and driver included. No hidden charges - just safe, comfortable and affordable journeys.",
        image: IMG.carOnRoad,
      },
      {
        heading: "Book Trusted Taxi Services",
        gold: "Trusted",
        subtitle:
          "Thousands of happy travellers trust us for Shirdi darshan, airport pickups and weekend trips.",
        image: IMG.waterfall,
      },
    ],
    trustCounters: [
      { value: "5000+", label: "Happy Customers" },
      { value: "8+", label: "Years of Service" },
      { value: "50+", label: "Fleet of Cars" },
      { value: "99%", label: "Satisfaction Rate" },
    ],
    about: {
      heading: "Your Trusted Travel Partner in Shirdi",
      subtitle:
        "We are dedicated to providing the best car rental and taxi services to pilgrims and travelers visiting Shirdi.",
      mission:
        "To provide safe, reliable, and affordable transportation services to every traveler visiting Shirdi, ensuring a comfortable and memorable journey.",
      vision:
        "To become the most trusted and preferred car rental and taxi service provider in Shirdi, known for our professionalism and customer-first approach.",
      description:
        "Founded with a passion for serving pilgrims and travelers, Shirdi Car Rental has grown from a small fleet to a trusted name in Shirdi's transportation sector. Every vehicle is maintained to the highest standards, and every driver is trained to provide courteous and safe service.",
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1936&auto=format&fit=crop",
    },
    whyChooseUs: [
      {
        icon: "FiUsers",
        title: "Professional Drivers",
        description:
          "Experienced, courteous, and licensed drivers ensuring a safe journey every time.",
      },
      {
        icon: "FiShield",
        title: "Clean & Sanitized Cars",
        description:
          "All vehicles are thoroughly cleaned and sanitized before every trip.",
      },
      {
        icon: "FiDollarSign",
        title: "Affordable Prices",
        description:
          "Transparent pricing with no hidden charges. Best rates guaranteed for all trips.",
      },
      {
        icon: "FiClock",
        title: "On Time Pickup",
        description:
          "Punctuality is our promise. We ensure timely pickup and drop-off every time.",
      },
      {
        icon: "FiHeadphones",
        title: "24/7 Support",
        description:
          "Round-the-clock customer support for bookings, inquiries, and assistance.",
      },
      {
        icon: "FiSmile",
        title: "Safe & Comfortable",
        description:
          "Your safety and comfort are our top priorities on every journey.",
      },
    ],
    mostBookedRoutes: [
      { route: "Shirdi → Mumbai", slug: "shirdi-to-mumbai", price: "₹4,500" },
      { route: "Shirdi → Pune", slug: "shirdi-to-pune", price: "₹4,999" },
      { route: "Shirdi → Nashik", slug: "shirdi-to-nashik", price: "₹2,800" },
      { route: "Shirdi → Chhatrapati Sambhajinagar", slug: "shirdi-to-chhatrapati-sambhajinagar", price: "₹5,500" },
      { route: "Shirdi → Trimbakeshwar", slug: "shirdi-to-trimbakeshwar", price: "₹3,500" },
      { route: "Shirdi → Shani Shingnapur", slug: "shirdi-to-shani-shingnapur", price: "₹2,600" },
      { route: "Shirdi → Bhimashankar", slug: "shirdi-to-bhimashankar", price: "₹3,200" },
      { route: "Shirdi Airport Pickup", slug: "shirdi-airport", price: "₹600" },
      { route: "Local Shirdi Darshan", slug: "local-shirdi-darshan", price: "₹2,200" },
    ],
    phone: CONTACT.phone,
    phoneDisplay: CONTACT.phoneDisplay,
    whatsapp: CONTACT.whatsapp,
    email: CONTACT.email,
    address: CONTACT.address,
    googleMapsLink: "https://maps.google.com/?q=Shirdi, Maharashtra 423109",
    instagram: "https://www.instagram.com/its_vishal_7578/?utm_source=ig_web_button_share_sheet",
    facebook: "",
    youtube: "",
    workingHours: "Open 24x7",
    footerCopyright: "Shirdi Car Rental. All rights reserved.",
    companyDescription:
      "Your trusted car rental and taxi service in Shirdi. Book comfortable, affordable, and safe rides for all your travel needs.",
    primaryColor: "#2563EB",
    secondaryColor: "#0F172A",
    accentColor: "#F59E0B",
    seo: {
      title: "Shirdi Car Rental | Reliable Car & Taxi Booking in Shirdi",
      description:
        "Book comfortable, affordable, and safe car rentals and taxi services in Shirdi. Local travel, airport transfers, outstation trips. 24/7 service, professional drivers.",
      keywords:
        "car rental Shirdi, taxi service Shirdi, Shirdi airport taxi, car hire Shirdi, outstation taxi Shirdi, Shirdi local sightseeing",
      ogImage: "",
      gaId: "",
      gscVerification: "",
    },
  };
}
