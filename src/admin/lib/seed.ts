import { CONTACT, IMG, VEHICLES, packages } from "@/data/packages";
import { SEED_REVIEWS } from "@/data/reviews";
import type {
  AdminBooking,
  AdminDestination,
  AdminPackage,
  AdminReview,
  AdminService,
  AdminVehicle,
  GalleryItem,
  PricingConfig,
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
  return [
    {
      id: "veh-dzire",
      name: "New Model Swift Dzire",
      image: "/images/dzire.jpg",
      price: "₹13 / km",
      seats: 4,
      fuel: "Petrol / CNG",
      ac: "Fully AC",
      transmission: "Manual",
      description: "Compact sedan with whisper-quiet cabin, chilling AC, and high fuel efficiency. Perfect for couples and small families.",
      status: "available",
    },
    {
      id: "veh-ertiga",
      name: "Maruti Suzuki Ertiga",
      image: "/images/xuv.jpeg",
      price: "₹15 / km",
      seats: 6,
      fuel: "Petrol",
      ac: "Dual AC Vents",
      transmission: "Manual",
      description: "Spacious 6+1 MUV with dual rear AC vents and high ground clearance. Best seller for family darshan packages.",
      status: "available",
    },
    {
      id: "veh-innova",
      name: "Toyota Innova Crysta",
      image: "/images/crysta1.jpeg",
      price: "₹20 / km",
      seats: 7,
      fuel: "Diesel",
      ac: "Triple Zone AC",
      transmission: "Manual",
      description: "The undisputed king of road comfort. Plush captain seats, silent cabin, and top-grade safety for long tours.",
      status: "available",
    },
    {
      id: "veh-traveller-14",
      name: "Force Tempo Traveller (14 Seater)",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
      price: "₹25 / km",
      seats: 14,
      fuel: "Diesel",
      ac: "Roof Mounted AC",
      transmission: "Manual",
      description: "Ideal choice for group pilgrimage tours and joint families. 14 reclining pushback seats with Bluetooth music.",
      status: "available",
    },
    {
      id: "veh-traveller-17",
      name: "Force Tempo Traveller (17 Seater)",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop",
      price: "₹28 / km",
      seats: 17,
      fuel: "Diesel",
      ac: "Dual Blower AC",
      transmission: "Manual",
      description: "Executive 17-seater minibus outfitted with luxury reclining seats, sound system, and top roof luggage carrier.",
      status: "available",
    },
    {
      id: "veh-urbania",
      name: "Force Urbania Luxury (17 Seater)",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
      price: "₹38 / km",
      seats: 17,
      fuel: "Diesel",
      ac: "Dual Roof AC Vents",
      transmission: "Manual",
      description: "Ultra luxury European-designed van with individual USB chargers, panoramic windows, and smooth air suspension.",
      status: "available",
    },
  ];
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

export function seedDestinations(): AdminDestination[] {
  return [
    {
      id: "dst-1",
      name: "Shirdi to Nashik Darshan Package",
      city: "Nashik",
      state: "Maharashtra",
      image: "/images/nashik_img.avif",
      imageAlt: "Trimbakeshwar Temple Nashik",
      description: "Sacred Pilgrimage to Trimbakeshwar Jyotirlinga, Panchawati (Sita Gufa, Kalaram Mandir) & Muktidham Temple.",
      distance: 250,
      popular: true,
      status: "active",
    },
    {
      id: "dst-2",
      name: "Shirdi to Sambhaji Nagar (Aurangabad) Darshan",
      city: "Aurangabad",
      state: "Maharashtra",
      image: "/images/sambhaji_nagar.jpg",
      imageAlt: "Ellora Caves & Grushneshwar",
      description: "Visit 12th Jyotirlinga Grushneshwar, UNESCO Ellora Caves, Bhadra Maruti sleeping Hanuman & Mini Taj Mahal.",
      distance: 240,
      popular: true,
      status: "active",
    },
    {
      id: "dst-3",
      name: "Shirdi to Bhimashankar Darshan Package",
      city: "Bhimashankar",
      state: "Maharashtra",
      image: IMG.bhimashankar,
      imageAlt: "Bhimashankar Jyotirlinga",
      description: "Scenic drive into Western Ghats to the sacred 6th Jyotirlinga surrounded by dense sanctuary forest.",
      distance: 380,
      popular: true,
      status: "active",
    },
    {
      id: "dst-4",
      name: "Shirdi to Shani Shingnapur Darshan Package",
      city: "Nevasa",
      state: "Maharashtra",
      image: IMG.shaniShingnapur,
      imageAlt: "Shani Shingnapur Swayambhu Temple",
      description: "Divine visit to Lord Shanidev open-air Swayambhu Devasthana, located 75 km from Shirdi.",
      distance: 150,
      popular: true,
      status: "active",
    },
    {
      id: "dst-5",
      name: "Shirdi to Mumbai Full City Darshan",
      city: "Mumbai",
      state: "Maharashtra",
      image: IMG.mumbaiSeaLink,
      imageAlt: "Mumbai Gateway & Sea Link",
      description: "Express journey via Samruddhi Mahamarg covering CSMIA Airport, Marine Drive, Siddhivinayak & Gateway of India.",
      distance: 520,
      popular: true,
      status: "active",
    },
    {
      id: "dst-6",
      name: "Shirdi to Kolhapur Darshan Package",
      city: "Kolhapur",
      state: "Maharashtra",
      image: IMG.kolhapur,
      imageAlt: "Mahalaxmi Ambabai Temple Kolhapur",
      description: "850 km tour to Shri Mahalaxmi Ambabai Shakti Peetha, Jyotiba Temple & New Palace Rajwada.",
      distance: 850,
      popular: true,
      status: "active",
    },
    {
      id: "dst-7",
      name: "Shirdi to Pandharpur Darshan Package",
      city: "Solapur",
      state: "Maharashtra",
      image: "/images/pandharpur.webp",
      imageAlt: "Shri Vitthal Rukmini Mandir",
      description: "Holy abode of Lord Vitthal and Goddess Rukmini on the banks of Chandrabhaga River.",
      distance: 650,
      popular: true,
      status: "active",
    },
    {
      id: "dst-8",
      name: "Shirdi to Saptashringi Devi Darshan",
      city: "Vani Nashik",
      state: "Maharashtra",
      image: "/images/vani.jpg",
      imageAlt: "Saptashringi Devi Temple Vani",
      description: "51 Shakti Peethas hill shrine in Vani, Nashik featuring 18-armed rock carved idol and funicular ropeway.",
      distance: 340,
      popular: false,
      status: "active",
    },
    {
      id: "dst-9",
      name: "Bhandardara Lake, Umbrella Falls & Kalsubai Peak",
      city: "Ahmednagar",
      state: "Maharashtra",
      image: IMG.bhandardara,
      imageAlt: "Bhandardara Arthur Lake and Kalsubai Peak",
      description: "Ahmednagar's premier hill station: Arthur Lake boating, Wilson Dam, Umbrella Falls & view of Mount Kalsubai.",
      distance: 190,
      popular: true,
      status: "active",
    },
    {
      id: "dst-10",
      name: "Malshej Ghat & Harishchandragad Scenic Pass",
      city: "Ahmednagar",
      state: "Maharashtra",
      image: IMG.malshejGhat,
      imageAlt: "Malshej Ghat waterfalls and misty valley",
      description: "Misty mountain corridor on the Ahmednagar-Thane border with cascading waterfalls and Harishchandragad fort views.",
      distance: 260,
      popular: true,
      status: "active",
    },
    {
      id: "dst-11",
      name: "Shivneri Fort & Lenyadri Ashtavinayak Tour",
      city: "Junnar",
      state: "Maharashtra",
      image: IMG.shivneriFort,
      imageAlt: "Shivneri Fort birthplace of Chhatrapati Shivaji Maharaj",
      description: "Revered birthplace of Chhatrapati Shivaji Maharaj at Shivneri Fort + Lenyadri Buddhist cave Ganpati Temple.",
      distance: 240,
      popular: true,
      status: "active",
    },
    {
      id: "dst-12",
      name: "Sinhagad Fort & Khadakwasla Dam Getaway",
      city: "Pune",
      state: "Maharashtra",
      image: IMG.sinhagadFort,
      imageAlt: "Sinhagad Fort Tanaji memorial and Pune valley",
      description: "Historic Maratha fort of Veer Tanaji Malusare, authentic hot Pithla Bhakri & lakeside Khadakwasla Dam.",
      distance: 430,
      popular: true,
      status: "active",
    },
    {
      id: "dst-13",
      name: "Lonavala Khandala & Karla Caves Tour",
      city: "Lonavala",
      state: "Maharashtra",
      image: IMG.lonavala,
      imageAlt: "Lonavala Tiger Point & Bhushi Dam",
      description: "2 Days getaway: Tiger's Leap, Bhushi Dam cascades, 2000-yr Karla Caves, Duke's Nose & Chikki shopping.",
      distance: 520,
      popular: true,
      status: "active",
    },
    {
      id: "dst-14",
      name: "Mahabaleshwar, Panchgani & Pratapgad Fort",
      city: "Mahabaleshwar",
      state: "Maharashtra",
      image: IMG.mahabaleshwar,
      imageAlt: "Mahabaleshwar Strawberry Gardens & Viewpoints",
      description: "Queen of Hill Stations 3-day vacation: Mapro Garden, Arthur's Seat, Venna Lake boating & Pratapgad Fort.",
      distance: 780,
      popular: true,
      status: "active",
    },
    {
      id: "dst-15",
      name: "Igatpuri & Kasara Ghats Scenic Retreat",
      city: "Igatpuri",
      state: "Maharashtra",
      image: IMG.igatpuri,
      imageAlt: "Igatpuri Vipassana Golden Pagoda and Camel Valley",
      description: "Sahyadri mist retreat: Dhamma Giri Vipassana Golden Pagoda, Camel Valley waterfalls & Bhavali Dam.",
      distance: 240,
      popular: true,
      status: "active",
    },
    {
      id: "dst-16",
      name: "Lavasa Lakeside City & Mulshi Dam Getaway",
      city: "Lavasa",
      state: "Maharashtra",
      image: IMG.lavasa,
      imageAlt: "Lavasa waterfront promenade and Mulshi Lake",
      description: "Italian Portofino-inspired lakeside city with waterfront dining, water sports & scenic Mulshi Dam waters.",
      distance: 540,
      popular: true,
      status: "active",
    },
    {
      id: "dst-17",
      name: "Ahmednagar Fort & Heritage Tour",
      city: "Ahmednagar",
      state: "Maharashtra",
      image: IMG.ahmednagarFort,
      imageAlt: "Historic Ahmednagar Fort and Chand Bibi Mahal",
      description: "Visit Ahmednagar Fort where Discovery of India was written, hilltop Chand Bibi Mahal & Cavalry Tank Museum.",
      distance: 180,
      popular: false,
      status: "active",
    },
  ];
}

export function seedPricing(): PricingConfig {
  const vehicleDefaults = seedVehicles();
  const vehiclePricing = vehicleDefaults.map((v, i) => {
    const rate =
      v.id === "veh-dzire" ? 13 :
      v.id === "veh-ertiga" ? 15 :
      v.id === "veh-innova" ? 20 :
      v.id === "veh-traveller-14" ? 25 :
      v.id === "veh-traveller-17" ? 28 :
      v.id === "veh-urbania" ? 38 : 15;
    return {
      id: `vp-${i + 1}`,
      vehicleId: v.id,
      name: v.name,
      type: v.fuel === "Electric" ? "Electric" : "SUV",
      capacity: v.seats,
      baseFare: 300,
      perKm: rate,
      perDay: 1800,
      extraKmRate: rate,
      driverCharge: 300,
      status: "active" as const,
    };
  });

  const destinationDefaults = seedDestinations().filter((d) => d.distance > 0);
  const destinationPricing = destinationDefaults.map((d, i) => ({
    id: `dp-${i + 1}`,
    name: d.name,
    from: "Shirdi",
    distance: d.distance,
    oneWay: Math.round((d.distance * (i % 2 === 0 ? 13 : 12) + 300) / 50) * 50,
    roundTrip: Math.round((d.distance * 2 * (i % 2 === 0 ? 11 : 10) + 600) / 50) * 50,
    perDay: Math.round((d.distance * 10 + 1800) / 50) * 50,
    additionalCharge: 0,
    status: "active" as const,
  }));

  return {
    vehiclePricing,
    destinationPricing,
    extraCharges: {
      driverAllowance: 300,
      nightCharge: 0,
      toll: 0,
      parking: 0,
      extraKm: 13,
      currency: "INR",
      minFare: 500,
    },
    calculator: {
      enabled: true,
      currency: "INR",
      minFare: 500,
      defaultVehicle: vehiclePricing[0]?.name ?? "",
      defaultTripType: "One Way",
    },
  };
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
    businessName: "Sai Vaishnavi Tours and Travels",
    tagline: "Premier Car Rental & Tour Packages in Shirdi",
    logo: "/images/logo.jpeg",
    favicon: "/images/logo.jpeg",
    heroSlides: [
      {
        heading: "Sai Vaishnavi Tours and Travels",
        gold: "Sai Vaishnavi",
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
        "Founded with a passion for serving pilgrims and travelers, Sai Vaishnavi Tours and Travels has grown from a small fleet to a trusted name in Shirdi's transportation and package tours sector. Every vehicle is maintained to the highest standards, and every driver is trained to provide courteous and safe service.",
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
    footerCopyright: "Sai Vaishnavi Tours and Travels. All rights reserved.",
    companyDescription:
      "Your trusted tour and taxi partner in Shirdi. Book comfortable, affordable, and safe rides for pilgrimage darshans, hill stations, and outstation trips.",
    primaryColor: "#2563EB",
    secondaryColor: "#0F172A",
    accentColor: "#F59E0B",
    seo: {
      title: "Sai Vaishnavi Tours and Travels | Reliable Car & Taxi Booking in Shirdi",
      description:
        "Book comfortable, affordable, and safe car rentals and taxi services in Shirdi with Sai Vaishnavi Tours and Travels. Local travel, airport transfers, outstation trips. 24/7 service, professional drivers.",
      keywords:
        "car rental Shirdi, taxi service Shirdi, Sai Vaishnavi Tours and Travels, Shirdi airport taxi, car hire Shirdi, outstation taxi Shirdi, Shirdi local sightseeing",
      ogImage: "/images/metadata-emblem.png",
      gaId: "",
      gscVerification: "",
    },
  };
}
