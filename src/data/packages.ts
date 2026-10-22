export type Category =
  | "Temple Tours"
  | "Airport"
  | "Outstation"
  | "Local"
  | "Weekend Trips"
  | "Hill Stations & Forts";

export type CategoryKey = "All" | Category;

export interface PackageReview {
  name: string;
  location: string;
  image?: string;
  rating: number;
  text: string;
  route?: string;
  date?: string;
}

export interface PackageFaq {
  q: string;
  a: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface TravelPackage {
  slug: string;
  name: string;
  destination: string;
  route: string;
  category: Category;
  distance: string;
  duration: string;
  price: string;
  priceNum: number;
  roundTrip: string;
  description: string;
  longDescription: string;
  included: string[];
  notIncluded: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
  gallery: GalleryImage[];
  reviews: PackageReview[];
  faqs: PackageFaq[];
  badge?: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const CONTACT = {
  phone: "+919225396800",
  phoneDisplay: "+91 92253 96800",
  whatsapp: "919225396800",
  email: "saivaishnavitourstravels@gmail.com",
  address: "Near Sai Temple, Shirdi, Maharashtra 423109",
  whatsappMessage: (text: string) =>
    `https://wa.me/919225396800?text=${encodeURIComponent(text)}`,
};

export const IMG = {
  // Cities & Landmarks (100% verified 200 OK CDN URLs)
  mumbaiSeaLink:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop",
  mumbaiGateway:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1600&auto=format&fit=crop",
  pune: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1600&auto=format&fit=crop",
  nashik:
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1600&auto=format&fit=crop",
  aurangabad:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop",
  trimbakeshwar:
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1600&auto=format&fit=crop",
  shaniShingnapur:
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1600&auto=format&fit=crop",
  bhimashankar:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  ajanta:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
  ellora:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
  daulatabad:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1600&auto=format&fit=crop",
  saiShirdi:
    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1600&auto=format&fit=crop",
  saiPortrait:
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1600&auto=format&fit=crop",
  shirdiAirport:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop",
  shirdiStation:
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1600&auto=format&fit=crop",

  // Hill Stations & Forts
  bhandardara:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  bhandardaraLake:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
  malshejGhat:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
  malshejWaterfall:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
  shivneriFort:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop",
  sinhagadFort:
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop",
  khadakwasla:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  lonavala:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  mahabaleshwar:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop",
  vennaLake:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  igatpuri:
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop",
  lavasa:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
  ahmednagarFort:
    "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop",
  kolhapur:
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",

  // Transit & Fleet
  heroCar:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2000&auto=format&fit=crop",
  carOnRoad:
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1600&auto=format&fit=crop",
  carSport:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  mountain:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
  mountainLake:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
  mountainValley:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
  waterfall:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
} as const;

export const AVATAR = {
  rahul:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  priya:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  amit:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  sneha:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  vikram:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
} as const;

export const REVIEWS_POOL: PackageReview[] = [
  {
    name: "Rahul Sharma",
    location: "Mumbai",
    rating: 5,
    route: "Shirdi → Mumbai",
    date: "2026-07-21",
    text: "Excellent service! The driver was professional and the car was spotless. We reached our destination right on time, stress-free. Highly recommended.",
  },
  {
    name: "Priya Patil",
    location: "Pune",
    rating: 5,
    route: "Shirdi → Pune",
    date: "2026-07-12",
    text: "Best car rental service in Shirdi. Used them for airport pickup and local darshan. Very affordable rates and courteous staff.",
  },
  {
    name: "Amit Deshmukh",
    location: "Nashik",
    rating: 5,
    route: "Shirdi → Nashik",
    date: "2026-06-28",
    text: "Impressed by the cleanliness of the vehicle and the punctuality. The booking was smooth and the driver knew all the best routes.",
  },
  {
    name: "Sneha Kulkarni",
    location: "Chhatrapati Sambhajinagar",
    rating: 5,
    route: "Shirdi → Trimbakeshwar",
    date: "2026-06-15",
    text: "Reliable taxi service in Shirdi. The driver was knowledgeable about all the temples and attractions. Fair pricing, comfortable ride.",
  },
  {
    name: "Vikram Joshi",
    location: "Nagpur",
    rating: 5,
    route: "Shirdi → Bhandardara",
    date: "2026-05-30",
    text: "Booked an Innova for a scenic tour of Bhandardara and Arthur Lake. Amazing experience, smooth ghat driving, and total transparency.",
  },
];

export interface Vehicle {
  name: string;
  image: string;
  seats: number;
  fuel: string;
  ac: string;
  description: string;
}

export const VEHICLES: Vehicle[] = [
  {
    name: "Maruti Swift Dzire",
    image:
      "https://imgd.aeplcdn.com/0x0/n/cw/ec/44701/swift-dzire-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    seats: 4,
    fuel: "Petrol / CNG",
    ac: "Fully AC",
    description:
      "Our most booked sedan - smooth, economical and ideal for Shirdi darshan, airport pickups and city rides.",
  },
  {
    name: "Maruti Ertiga",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
    seats: 6,
    fuel: "Petrol",
    ac: "Dual AC Vents",
    description:
      "Spacious 6+1 MUV with dual rear AC vents and high ground clearance. Best seller for family darshan packages.",
  },
  {
    name: "Toyota Innova Crysta",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop",
    seats: 7,
    fuel: "Diesel",
    ac: "Triple Zone AC",
    description:
      "The undisputed king of road comfort. Plush captain seats, silent cabin, and top-grade safety for long tours.",
  },
  {
    name: "Force Tempo Traveller",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    seats: 17,
    fuel: "Diesel",
    ac: "Roof Mounted AC",
    description:
      "Ideal choice for group pilgrimage tours and joint families. Reclining pushback seats with ample luggage space.",
  },
];

const baseFaqs: PackageFaq[] = [
  {
    q: "How much does this package cost?",
    a: "The fare shown is our transparent starting price. Fuel, tolls, parking and our verified driver are all included. The final amount depends on the car type you choose.",
  },
  {
    q: "Can I book one-way or round trip?",
    a: "Yes. Every package supports one-way and round-trip rentals. Round trips include driver waiting time so you can complete your sightseeing peacefully.",
  },
  {
    q: "Are fuel and highway tolls included?",
    a: "Yes, our packages are all-inclusive with fuel, driver allowance, and standard highway tolls included with zero hidden charges.",
  },
  {
    q: "Is night or early morning travel available?",
    a: "Yes, we operate 24x7. Night travel and early-morning airport or temple darshan pickups are handled by our verified drivers.",
  },
];

export const CATEGORIES: CategoryKey[] = [
  "All",
  "Local",
  "Temple Tours",
  "Hill Stations & Forts",
  "Outstation",
  "Weekend Trips",
  "Airport",
];

const packages: TravelPackage[] = [
  // ==========================================
  // 1. LOCAL & RENTAL PACKAGES (SHIRDI DEPARTURES)
  // ==========================================
  {
    slug: "local-shirdi-darshan",
    name: "Shirdi Local Sightseeing & Sai Darshan (8 Hr / 80 Km Rental)",
    destination: "Shirdi City Circuit",
    route: "Shirdi Local 8Hr/80Km Rental",
    category: "Local",
    distance: "80 KM",
    duration: "8 Hours",
    price: "₹2,200",
    priceNum: 2200,
    roundTrip: "₹2,200",
    description:
      "Complete 8-hour dedicated AC car rental for Sai Baba Samadhi Mandir, Dwarkamai, Chavadi & local ashrams.",
    longDescription:
      "Your private AC car with dedicated chauffeur for a complete day of peace and devotion. Covers Sai Baba Samadhi Mandir, Dwarkamai, Chavadi, Khandoba Mandir, Gurusthan, Lendi Baugh, and Sai Teerth Devotional Theme Park. The driver waits patiently at every spot and accommodates your family schedule.",
    included: [
      "Car for 8 Hours / 80 KM",
      "Fuel & Chauffeur Included",
      "All Temple & Ashram Halts",
      "Hotel Pickup & Drop",
    ],
    notIncluded: ["Temple VIP pass fees", "Personal offerings / donations"],
    highlights: [
      "Full 8-hour car rental at your own pace",
      "Dwarkamai, Chavadi & Samadhi Temple",
      "Sai Teerth Theme Park visit option",
      "Doorstep hotel pickup & return",
    ],
    image: IMG.saiShirdi,
    imageAlt: "Shirdi Sai Baba Temple Darshan car rental package",
    gallery: [
      { src: IMG.saiShirdi, alt: "Sai Baba Temple Complex" },
      { src: IMG.saiPortrait, alt: "Devotional atmosphere in Shirdi" },
      { src: IMG.carOnRoad, alt: "Comfortable local taxi" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "The full-day rental was so convenient for my elderly parents. The driver waited patiently during the aarti and drove very gently.",
      },
    ],
    faqs: baseFaqs,
    badge: "Most Booked",
    featured: true,
    seoTitle: "Shirdi Local Car Rental | 8 Hours 80 Km Full Day Darshan Taxi",
    seoDescription:
      "Book 8 hours 80 km local car rental in Shirdi for Sai Baba Darshan, Dwarkamai, Chavadi & local ashrams from ₹2,200.",
  },
  {
    slug: "shirdi-to-shani-shingnapur",
    name: "Shirdi to Shani Shingnapur Day Rental",
    destination: "Shani Shingnapur",
    route: "Shirdi → Shani Shingnapur",
    category: "Local",
    distance: "150 KM",
    duration: "4.5 Hours",
    price: "₹2,600",
    priceNum: 2600,
    roundTrip: "₹3,600",
    description:
      "Dedicated same-day car rental to the open-air Swayambhu Shanidev Temple with waiting time included.",
    longDescription:
      "Comfortable round-trip private cab from Shirdi to the famous doorless village of Shani Shingnapur. Located 75 km away, this trip takes around 1.5 hours each way. Our chauffeur waits for your darshan and holy oil offerings before bringing you smoothly back to your Shirdi hotel.",
    included: [
      "Round Trip Car Rental",
      "Fuel, Toll & Driver Allowance",
      "Temple Waiting Time Included",
      "Hotel / Mandir Pickup & Drop",
    ],
    notIncluded: ["Pooja oil & prasadam"],
    highlights: [
      "Famous doorless village & Swayambhu idol",
      "Same-day quick 4.5-hour round trip",
      "Spacious AC car with verified driver",
    ],
    image: IMG.shaniShingnapur,
    imageAlt: "Shani Shingnapur Swayambhu Temple from Shirdi",
    gallery: [
      { src: IMG.shaniShingnapur, alt: "Shani Shingnapur Devasthan" },
      { src: IMG.carOnRoad, alt: "Highway taxi towards Shani Shingnapur" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Left at 8 am, finished darshan by 10:30 and was back in Shirdi before lunch. Excellent taxi service.",
      },
    ],
    faqs: baseFaqs,
    badge: "Top Seller",
    featured: true,
    seoTitle: "Shirdi to Shani Shingnapur Taxi Rental | Round Trip from ₹2,600",
    seoDescription:
      "Book Shirdi to Shani Shingnapur cab rental. 150 km same day round trip with waiting time, fuel & tolls included from ₹2,600.",
  },
  {
    slug: "shirdi-to-ahmednagar-fort",
    name: "Shirdi to Ahmednagar Fort & Heritage Tour",
    destination: "Ahmednagar",
    route: "Shirdi → Ahmednagar City",
    category: "Local",
    distance: "180 KM",
    duration: "6 Hours",
    price: "₹3,200",
    priceNum: 3200,
    roundTrip: "₹4,500",
    description:
      "Historical tour of Ahmednagar Fort, Chand Bibi Palace (Salabat Khan Tomb) & Cavalry Tank Museum.",
    longDescription:
      "Explore the royal heritage of Ahmednagar district from Shirdi. Visit the historic Ahmednagar Fort where Pandit Jawaharlal Nehru wrote 'The Discovery of India', the panoramic hilltop Salabat Khan Tomb (Chand Bibi Mahal), the Asia's unique Cavalry Tank Museum, and Shri Anandrishiji Maharaj Dham.",
    included: [
      "AC Vehicle with Driver",
      "Fuel & Highway Tolls",
      "All Sightseeing Stops in Ahmednagar",
      "Doorstep Pickup in Shirdi",
    ],
    notIncluded: ["Museum entry tickets"],
    highlights: [
      "Historic Ahmednagar Fort & jail where Discovery of India was written",
      "Chand Bibi Mahal (Salabat Khan Tomb) with 360-degree hill views",
      "Asia's only Cavalry Tank Museum",
      "Comfortable round-trip rental with AC cab",
    ],
    image: IMG.ahmednagarFort,
    imageAlt: "Ahmednagar Fort and historical landmarks near Shirdi",
    gallery: [
      { src: IMG.ahmednagarFort, alt: "Ahmednagar historical ramparts" },
      { src: IMG.carOnRoad, alt: "Car on Nagar Shirdi highway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Very informative and peaceful trip. The driver knew all historical points in Ahmednagar and drove safely.",
      },
    ],
    faqs: baseFaqs,
    badge: "Heritage Tour",
    seoTitle: "Shirdi to Ahmednagar Fort Taxi | City Heritage Tour Rental",
    seoDescription:
      "Day rental from Shirdi to Ahmednagar Fort, Chand Bibi Mahal & Tank Museum. AC cabs, all-inclusive pricing from ₹3,200.",
  },
  {
    slug: "shirdi-airport",
    name: "Shirdi Airport Pickup & Drop (24x7)",
    destination: "Shirdi Airport (SAG)",
    route: "Shirdi Airport → Hotel",
    category: "Airport",
    distance: "14 KM",
    duration: "25 Min",
    price: "₹600",
    priceNum: 600,
    roundTrip: "₹1,100",
    description:
      "Guaranteed flight-tracked pickup and drop with meet & greet at arrivals terminal.",
    longDescription:
      "Land at Kakadi Shirdi Airport (SAG) with zero stress. Your private air-conditioned cab waits at the terminal with a name board. We monitor flight schedules in real time, so even if your flight is delayed or lands early, your car is ready with zero extra waiting charges.",
    included: [
      "Name-Board Meet & Greet",
      "Live Flight Tracking",
      "Luggage Assistance",
      "Zero Delay Waiting Charges",
    ],
    notIncluded: [],
    highlights: [
      "Direct gate pickup at Shirdi Airport",
      "Clean AC sedan or SUV for groups",
      "Available 24x7 for all flights",
    ],
    image: IMG.shirdiAirport,
    imageAlt: "Shirdi Airport taxi cab pickup service",
    gallery: [
      { src: IMG.shirdiAirport, alt: "Shirdi Airport Taxi" },
      { src: IMG.carOnRoad, alt: "Chauffeur car at airport" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "My Indigo flight was delayed by 40 minutes, but the driver was right there at the exit gate with my name. Flawless service!",
      },
    ],
    faqs: baseFaqs,
    badge: "24x7 Flight Pickup",
    seoTitle: "Shirdi Airport Taxi | Kakadi Airport SAG Pickup & Drop from ₹600",
    seoDescription:
      "Book Shirdi airport taxi with flight tracking, meet & greet and zero waiting charge. Clean AC cabs from ₹600.",
  },
  {
    slug: "shirdi-railway-station",
    name: "Sainagar Shirdi Railway Station Transfer",
    destination: "Sainagar Shirdi Station",
    route: "Sainagar Station → Shirdi & Hotel",
    category: "Local",
    distance: "6 KM",
    duration: "15 Min",
    price: "₹400",
    priceNum: 400,
    roundTrip: "₹750",
    description:
      "Fast, direct taxi from Sainagar Shirdi Station to temple or any hotel in town.",
    longDescription:
      "Skip auto touts and chaotic platform exits. Book a clean AC car waiting for your train arrival at Sainagar Shirdi Railway Station (SNSI). Our chauffeur helps with heavy luggage and delivers you smoothly to your hotel or direct to Sai Temple.",
    included: [
      "Train Arrival Tracking",
      "Door-to-door Drop",
      "Luggage Assistance",
      "Fixed Transparent Fare",
    ],
    notIncluded: [],
    highlights: [
      "Driver waits outside station platform",
      "Fixed rate with zero bargaining",
      "Available for early morning & late night trains",
    ],
    image: IMG.shirdiStation,
    imageAlt: "Sainagar Shirdi Railway Station taxi service",
    gallery: [
      { src: IMG.shirdiStation, alt: "Railway station transfer cab" },
      { src: IMG.saiShirdi, alt: "Temple arrival" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Arrived at 6 am on the Vande Bharat train. Cab was parked outside and we reached our hotel in 10 minutes flat.",
      },
    ],
    faqs: baseFaqs,
    badge: "Fixed Fare",
    seoTitle: "Sainagar Shirdi Railway Station Taxi | SNSI Station Pickup from ₹400",
    seoDescription:
      "Instant taxi from Sainagar Shirdi railway station to any hotel or Sai Mandir. 24x7 service from ₹400 flat.",
  },

  // ==========================================
  // 2. TEMPLE & JYOTIRLINGA CIRCUITS (FROM SHIRDI)
  // ==========================================
  {
    slug: "shirdi-to-trimbakeshwar",
    name: "Shirdi to Trimbakeshwar Jyotirlinga & Nashik Tour",
    destination: "Trimbakeshwar & Nashik",
    route: "Shirdi → Trimbakeshwar → Nashik",
    category: "Temple Tours",
    distance: "250 KM",
    duration: "8 Hours",
    price: "₹3,500",
    priceNum: 3500,
    roundTrip: "₹5,800",
    description:
      "Sacred pilgrimage to Trimbakeshwar Jyotirlinga, Panchavati (Sita Gufa, Kalaram Mandir) & Godavari Ghat.",
    longDescription:
      "A complete spiritual day trip from Shirdi to the holy city of Nashik and the supreme Trimbakeshwar Jyotirlinga. Visit the sacred source of Godavari River at Kushavarta Kund, the ancient Trimbakeshwar Shiva temple, Panchavati where Lord Rama resided, Sita Gufa, Kalaram Mandir, and Muktidham.",
    included: [
      "Full Day Dedicated AC Cab",
      "Fuel, Tolls & Driver Allowance",
      "Trimbakeshwar & Nashik Sightseeing",
      "Hotel Pickup & Return to Shirdi",
    ],
    notIncluded: ["Pooja / VIP darshan tickets"],
    highlights: [
      "Trimbakeshwar Jyotirlinga darshan",
      "Kushavarta sacred Godavari kund",
      "Panchavati, Sita Gufa & Kalaram Temple",
      "Muktidham marble temple halt",
    ],
    image: IMG.trimbakeshwar,
    imageAlt: "Trimbakeshwar Jyotirlinga Temple taxi tour from Shirdi",
    gallery: [
      { src: IMG.trimbakeshwar, alt: "Trimbakeshwar Temple" },
      { src: IMG.nashik, alt: "Godavari Ghat Nashik" },
      { src: IMG.carOnRoad, alt: "Sedan on Nashik highway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "The driver guided us on the best time for darshan at Trimbakeshwar and took us to all the Panchavati spots. Very polite and respectful.",
      },
    ],
    faqs: baseFaqs,
    badge: "Pilgrimage Hit",
    featured: true,
    seoTitle: "Shirdi to Trimbakeshwar Taxi | Jyotirlinga & Nashik Tour from ₹3,500",
    seoDescription:
      "Book Shirdi to Trimbakeshwar Jyotirlinga & Nashik Panchavati taxi. Full day AC car rental with fuel & tolls from ₹3,500.",
  },
  {
    slug: "shirdi-to-grishneshwar-ellora",
    name: "Shirdi to Grishneshwar Jyotirlinga, Ellora & Daulatabad Fort",
    destination: "Grishneshwar & Ellora",
    route: "Shirdi → Grishneshwar → Ellora → Daulatabad",
    category: "Temple Tours",
    distance: "240 KM",
    duration: "8 Hours",
    price: "₹3,800",
    priceNum: 3800,
    roundTrip: "₹6,200",
    description:
      "Visit the 12th Jyotirlinga Grishneshwar, UNESCO Ellora Kailasa Temple, and the invincible Daulatabad Fort.",
    longDescription:
      "A magnificent combination of spiritual grace and architectural wonder. Start with the sacred 12th Jyotirlinga Grishneshwar, marvel at the rock-hewn monolithic Kailasa Temple at Ellora Caves (Cave 16), stop by the miraculous Bhadra Maruti sleeping Hanuman temple, and explore the historic hill fortress of Daulatabad.",
    included: [
      "Round Trip AC Vehicle",
      "Driver Allowance, Toll & Fuel",
      "Covers Grishneshwar, Ellora, Daulatabad",
      "Same-day Return to Shirdi",
    ],
    notIncluded: ["Ellora cave entry tickets"],
    highlights: [
      "12th Jyotirlinga Grishneshwar Darshan",
      "UNESCO Ellora Kailasa Monolithic Temple",
      "Daulatabad Fort & Chand Minar",
      "Bhadra Maruti Sleeping Hanuman Mandir",
    ],
    image: IMG.ellora,
    imageAlt: "Ellora Kailasa Temple and Grishneshwar Jyotirlinga",
    gallery: [
      { src: IMG.ellora, alt: "Kailasa Temple Ellora" },
      { src: IMG.daulatabad, alt: "Daulatabad Hill Fort" },
      { src: IMG.aurangabad, alt: "Bibi Ka Maqbara" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "The combination of Grishneshwar Jyotirlinga and Daulatabad Fort was breathtaking. Car was clean and driver knew the exact parking points.",
      },
    ],
    faqs: baseFaqs,
    badge: "UNESCO & Temple",
    seoTitle: "Shirdi to Grishneshwar & Ellora Caves Taxi | Jyotirlinga Tour",
    seoDescription:
      "Book Shirdi to Grishneshwar Jyotirlinga, Ellora Caves & Daulatabad Fort taxi. AC cab with all-inclusive pricing from ₹3,800.",
  },
  {
    slug: "shirdi-to-bhimashankar",
    name: "Shirdi to Bhimashankar Jyotirlinga Sanctuary Tour",
    destination: "Bhimashankar",
    route: "Shirdi → Bhimashankar",
    category: "Temple Tours",
    distance: "380 KM",
    duration: "9 Hours",
    price: "₹4,800",
    priceNum: 4800,
    roundTrip: "₹7,500",
    description:
      "Drive through the scenic Western Ghats to the 6th Jyotirlinga surrounded by dense sanctuary forests.",
    longDescription:
      "Travel deep into the Sahyadri mountains where the holy Bhimashankar Jyotirlinga rests inside a protected wildlife sanctuary. Experience stunning ghat views, misty mountain roads, and ancient Nagara temple architecture. Our experienced hill chauffeurs ensure a smooth, comfortable ride.",
    included: [
      "Private AC Vehicle with Hill Driver",
      "Fuel, Highway & Ghat Tolls",
      "Temple Waiting Time",
      "Pickup & Drop in Shirdi",
    ],
    notIncluded: ["Sanctuary eco fee if applicable"],
    highlights: [
      "6th Supreme Jyotirlinga Shrine",
      "Western Ghats wildlife sanctuary scenery",
      "Source of the holy Bhima River",
      "Ghat roadway with panoramic mountain views",
    ],
    image: IMG.bhimashankar,
    imageAlt: "Bhimashankar Jyotirlinga Temple in dense Sahyadri mountains",
    gallery: [
      { src: IMG.bhimashankar, alt: "Bhimashankar shrine" },
      { src: IMG.mountain, alt: "Sahyadri Ghats" },
      { src: IMG.carOnRoad, alt: "Hill tour cab" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "The ghat roads are steep but our driver was an absolute expert. Reached in time for afternoon aarti. Blessed journey!",
      },
    ],
    faqs: baseFaqs,
    badge: "Jyotirlinga Special",
    seoTitle: "Shirdi to Bhimashankar Taxi | Jyotirlinga Darshan Tour from ₹4,800",
    seoDescription:
      "Book Shirdi to Bhimashankar Jyotirlinga taxi. 380 km round trip in Western Ghats sanctuary with experienced hill driver from ₹4,800.",
  },
  {
    slug: "shirdi-to-3-jyotirlinga",
    name: "Maharashtra 3 Jyotirlinga Darshan Tour (3 Days Rental)",
    destination: "Trimbakeshwar, Grishneshwar & Bhimashankar",
    route: "Shirdi → Trimbakeshwar → Grishneshwar → Bhimashankar",
    category: "Temple Tours",
    distance: "750 KM",
    duration: "3 Days / 2 Nights",
    price: "₹11,500",
    priceNum: 11500,
    roundTrip: "₹18,500",
    description:
      "Complete 3-day pilgrimage covering all 3 Western Maharashtra Jyotirlingas + Shirdi Sai Darshan.",
    longDescription:
      "The ultimate devotional circuit for Shiva and Sai devotees. In 3 hassle-free days, cover Trimbakeshwar (Nashik), Grishneshwar (Ellora), and Bhimashankar (Sahyadri), along with Shirdi Sai Baba Samadhi and Shani Shingnapur. A dedicated AC car and chauffeur remains at your service throughout.",
    included: [
      "Car & Driver for 3 Full Days",
      "750 KM Included with Fuel & Tolls",
      "Driver Night Allowance Included",
      "Custom Flexible Timings",
    ],
    notIncluded: ["Guest hotel rooms", "Temple pooja passes"],
    highlights: [
      "Trimbakeshwar, Grishneshwar & Bhimashankar in one trip",
      "Includes Shirdi & Shani Shingnapur stops",
      "Full private AC cab for 3 days",
      "Chauffeur handles all route navigation",
    ],
    image: IMG.trimbakeshwar,
    imageAlt: "Maharashtra 3 Jyotirlinga Darshan Tour from Shirdi",
    gallery: [
      { src: IMG.trimbakeshwar, alt: "Trimbakeshwar Temple" },
      { src: IMG.ellora, alt: "Grishneshwar & Ellora" },
      { src: IMG.bhimashankar, alt: "Bhimashankar Temple" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "Did this 3-day tour with my family. Seamless coordination, honest driver, and we completed all 3 Jyotirlingas peacefully.",
      },
    ],
    faqs: baseFaqs,
    badge: "Grand Pilgrimage",
    featured: true,
    seoTitle: "Maharashtra 3 Jyotirlinga Tour from Shirdi | 3 Days Car Rental",
    seoDescription:
      "Book 3 Days Maharashtra 3 Jyotirlinga tour from Shirdi covering Trimbakeshwar, Grishneshwar & Bhimashankar from ₹11,500.",
  },
  {
    slug: "shirdi-to-kolhapur-mahalakshmi",
    name: "Shirdi to Kolhapur Mahalakshmi & Jyotiba Temple",
    destination: "Kolhapur",
    route: "Shirdi → Kolhapur (Ambabai & Jyotiba)",
    category: "Temple Tours",
    distance: "850 KM",
    duration: "2 Days / 1 Night",
    price: "₹12,000",
    priceNum: 12000,
    roundTrip: "₹19,500",
    description:
      "Sacred darshan to Shri Ambabai Mahalakshmi Shaktipeeth, Jyotiba Hill Temple & historic New Palace.",
    longDescription:
      "Experience the powerful blessings of Goddess Mahalakshmi (Ambabai) in Kolhapur, one of the premier Shaktipeethas of India. The tour also takes you to the holy hill shrine of Jyotiba, Rankala Lake, and the grand New Palace Chhatrapati Shahu Maharaj museum.",
    included: [
      "2 Days Dedicated AC Car",
      "Fuel, Tolls & Driver Allowance",
      "Sightseeing in Kolhapur & Jyotiba",
      "Door-to-door Pickup from Shirdi",
    ],
    notIncluded: ["Hotel stay in Kolhapur"],
    highlights: [
      "Shri Ambabai Mahalakshmi Shaktipeeth Darshan",
      "Wadi Ratnagiri Jyotiba Hill Temple",
      "Historic Kolhapur New Palace & Rankala Lake",
      "Spacious vehicle for family comfort",
    ],
    image: IMG.kolhapur,
    imageAlt: "Kolhapur Mahalaxmi and New Palace tour from Shirdi",
    gallery: [
      { src: IMG.kolhapur, alt: "Kolhapur Royal Architecture" },
      { src: IMG.carOnRoad, alt: "Highway journey to Kolhapur" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Long highway drive made extremely smooth by the spacious Innova. Chauffeur was courteous and very experienced.",
      },
    ],
    faqs: baseFaqs,
    badge: "Shaktipeeth Tour",
    seoTitle: "Shirdi to Kolhapur Taxi | Mahalakshmi & Jyotiba Darshan Package",
    seoDescription:
      "Book Shirdi to Kolhapur Mahalakshmi Ambabai Temple taxi. 2 Days round trip with fuel, driver & tolls from ₹12,000.",
  },
  {
    slug: "shirdi-to-pandharpur-vitthal",
    name: "Shirdi to Pandharpur Vitthal Rukmini Darshan",
    destination: "Pandharpur",
    route: "Shirdi → Pandharpur Vitthal Temple",
    category: "Temple Tours",
    distance: "650 KM",
    duration: "Same Day / Overnight",
    price: "₹8,000",
    priceNum: 8000,
    roundTrip: "₹13,500",
    description:
      "Divine journey to the holy abode of Lord Vitthal and Rukmini Mata on the banks of Chandrabhaga River.",
    longDescription:
      "Travel to the spiritual capital of Maharashtra - Pandharpur. Offer prayers at the sacred Vitthal Rukmini Mandir, visit the holy ghats of Chandrabhaga River, and experience the bhakti atmosphere that draws millions of warkaris. Our private taxi provides doorstep pickup from your Shirdi hotel.",
    included: [
      "AC Vehicle with Driver",
      "Fuel, Tolls & Parking",
      "Temple Waiting Time",
      "Doorstep Shirdi Pickup",
    ],
    notIncluded: ["Temple special line tickets"],
    highlights: [
      "Vithoba & Rukmini Mata Temple darshan",
      "Sacred Chandrabhaga River ghats",
      "Comfortable highway cruise via Ahmednagar",
      "Same day or overnight rental options",
    ],
    image: IMG.bhimashankar,
    imageAlt: "Pandharpur Vitthal Temple darshan package from Shirdi",
    gallery: [
      { src: IMG.bhimashankar, alt: "Temple devotion" },
      { src: IMG.carOnRoad, alt: "Pandharpur highway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Very peaceful journey to Pandharpur. The driver knew the best highway dhabas and dropped us right at the temple gate.",
      },
    ],
    faqs: baseFaqs,
    badge: "Bhakti Special",
    seoTitle: "Shirdi to Pandharpur Taxi | Vitthal Rukmini Darshan Package",
    seoDescription:
      "Book Shirdi to Pandharpur taxi for Vitthal Rukmini Mandir darshan. AC car with transparent fares from ₹8,000.",
  },
  {
    slug: "shirdi-to-saptashringi-devi",
    name: "Shirdi to Saptashringi Devi Shaktipeeth (Vani)",
    destination: "Saptashringi Vani",
    route: "Shirdi → Saptashringi Devi (Vani Hills)",
    category: "Temple Tours",
    distance: "340 KM",
    duration: "7 Hours",
    price: "₹4,500",
    priceNum: 4500,
    roundTrip: "₹7,200",
    description:
      "Perched on seven cliff peaks, this 51 Shaktipeeth features an 18-armed Swayambhu Devi idol and funicular ropeway.",
    longDescription:
      "A scenic mountain pilgrimage to Shree Saptashringi Nivasini Devi in Vani near Nashik. Nestled atop seven hill pinnacles at an elevation of 1,238 metres, the shrine is reached by a thrilling funicular trolley ropeway or stairs. Enjoy panoramic views of the Khandesh valley and mountain winds.",
    included: [
      "AC Cab with Hill Driver",
      "Fuel, Tolls & Parking",
      "Waiting time at Vani base",
      "Hotel Pickup in Shirdi",
    ],
    notIncluded: ["Funicular ropeway trolley tickets"],
    highlights: [
      "51 Sacred Shaktipeethas of India",
      "18-armed rock carved Swayambhu Devi idol",
      "Modern funicular ropeway trolley experience",
      "Stunning cliff views of the Sahyadri ranges",
    ],
    image: IMG.mountain,
    imageAlt: "Saptashringi Devi hill shrine Vani Nashik from Shirdi",
    gallery: [
      { src: IMG.mountain, alt: "Saptashringi cliff mountains" },
      { src: IMG.carOnRoad, alt: "Scenic highway to Vani" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "The ropeway trolley made it so easy for my mother. The temple view from the cliff is unforgettable.",
      },
    ],
    faqs: baseFaqs,
    badge: "Hill Shaktipeeth",
    seoTitle: "Shirdi to Saptashringi Devi Vani Taxi | Shaktipeeth Tour from ₹4,500",
    seoDescription:
      "Book Shirdi to Saptashringi Devi Vani taxi. 340 km round trip to the seven-peaked mountain shrine from ₹4,500.",
  },

  // ==========================================
  // 3. HILL STATIONS, SCENIC GHATS & FORTS (6-8 DESTINATIONS)
  // ==========================================
  {
    slug: "shirdi-to-bhandardara-kalsubai",
    name: "Bhandardara Lake, Umbrella Falls & Kalsubai Peak (Ahmednagar)",
    destination: "Bhandardara",
    route: "Shirdi → Sangamner → Bhandardara",
    category: "Hill Stations & Forts",
    distance: "190 KM",
    duration: "Same Day / Weekend",
    price: "₹3,600",
    priceNum: 3600,
    roundTrip: "₹5,800",
    description:
      "Ahmednagar's premier hill station - pristine Arthur Lake, Wilson Dam, Umbrella Falls & view of Mount Kalsubai.",
    longDescription:
      "Discover the crown jewel of Ahmednagar district! Just 90 km from Shirdi via Sangamner, Bhandardara is a paradise of cascading waterfalls, calm lakeside camping, and towering Sahyadri peaks. Visit Wilson Dam, Umbrella Falls, Randha Falls, the 1200-year-old Amruteshwar temple, and gaze at Mount Kalsubai - the highest peak in Maharashtra (1,646 m).",
    included: [
      "Private AC Car for the Day",
      "Fuel, Ghat Tolls & Chauffeur Allowance",
      "Covers Arthur Lake, Wilson Dam & Falls",
      "Doorstep Shirdi Pickup & Return",
    ],
    notIncluded: ["Boating fees on Arthur Lake"],
    highlights: [
      "Arthur Lake boating & scenic lakeside viewpoints",
      "Wilson Dam & seasonal Umbrella Falls cascades",
      "Spectacular vistas of Mount Kalsubai (Highest Peak of Maharashtra)",
      "Ancient 1200-yr Amruteshwar Hemadpanthi Shiva Temple",
    ],
    image: IMG.bhandardara,
    imageAlt: "Bhandardara Arthur Lake and waterfalls in Ahmednagar district",
    gallery: [
      { src: IMG.bhandardara, alt: "Umbrella Falls Bhandardara" },
      { src: IMG.bhandardaraLake, alt: "Arthur Lake serene waters" },
      { src: IMG.mountainLake, alt: "Sahyadri mountains near Kalsubai" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "Bhandardara is so close to Shirdi and the water was crystal clear! Wilson Dam and Arthur Lake were breathtaking.",
      },
    ],
    faqs: baseFaqs,
    badge: "Ahmednagar Gem",
    featured: true,
    seoTitle: "Shirdi to Bhandardara Taxi | Arthur Lake & Kalsubai Hill Station Tour",
    seoDescription:
      "Book Shirdi to Bhandardara taxi. Visit Arthur Lake, Wilson Dam, Umbrella Falls & Kalsubai Peak from ₹3,600.",
  },
  {
    slug: "shirdi-to-malshej-ghat",
    name: "Malshej Ghat & Harishchandragad Scenic Pass",
    destination: "Malshej Ghat",
    route: "Shirdi → Otur → Malshej Ghat",
    category: "Hill Stations & Forts",
    distance: "260 KM",
    duration: "Same Day / Weekend",
    price: "₹4,200",
    priceNum: 4200,
    roundTrip: "₹6,800",
    description:
      "Misty mountain pass on the Ahmednagar-Thane border with hundreds of seasonal waterfalls and Harishchandragad views.",
    longDescription:
      "Climb through the clouds on one of the most stunning mountain corridors of the Western Ghats. Located on the Ahmednagar-Thane border, Malshej Ghat is renowned for misty cliff drop-offs, gushing roadside waterfalls, Pimpalgaon Joga Dam flamingos, and the rugged backdrop of historic Harishchandragad Fort and Kedareshwar Cave.",
    included: [
      "Private AC Cab with Ghat Chauffeur",
      "Fuel, Ghat Tolls & Driver Allowance",
      "Stops at Top Viewpoints & Waterfalls",
      "Hotel Pickup & Return in Shirdi",
    ],
    notIncluded: [],
    highlights: [
      "Hundreds of seasonal misty waterfalls along the cliff road",
      "Dramatic Konkan Kada vistas of Harishchandragad",
      "Pimpalgaon Joga Dam reservoir stop",
      "Cool mountain air and roadside corn & tea stalls",
    ],
    image: IMG.malshejGhat,
    imageAlt: "Malshej Ghat mountain road and waterfalls tour from Shirdi",
    gallery: [
      { src: IMG.malshejGhat, alt: "Malshej Ghat valley panorama" },
      { src: IMG.malshejWaterfall, alt: "Cascading ghat waterfalls" },
      { src: IMG.mountainValley, alt: "Sahyadri mountain mist" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "The drive through Malshej Ghat felt like heaven! Fog and waterfalls everywhere. The driver drove very carefully in the mist.",
      },
    ],
    faqs: baseFaqs,
    badge: "Misty Monsoon Hit",
    featured: true,
    seoTitle: "Shirdi to Malshej Ghat Taxi | Scenic Waterfalls & Fort Pass Tour",
    seoDescription:
      "Book Shirdi to Malshej Ghat taxi. 260 km scenic mountain tour with waterfalls, misty valleys & fort vistas from ₹4,200.",
  },
  {
    slug: "shirdi-to-shivneri-fort",
    name: "Shivneri Fort & Lenyadri Ashtavinayak Tour (Junnar)",
    destination: "Shivneri Fort Junnar",
    route: "Shirdi → Junnar → Shivneri Fort",
    category: "Hill Stations & Forts",
    distance: "240 KM",
    duration: "Full Day",
    price: "₹3,800",
    priceNum: 3800,
    roundTrip: "₹6,200",
    description:
      "Majestic birthplace of Chhatrapati Shivaji Maharaj + Lenyadri Girijatmaj Cave Ganpati Temple.",
    longDescription:
      "Walk the sacred ramparts where the Maratha Empire began! Shivneri Fort in Junnar is the revered birthplace of Chhatrapati Shivaji Maharaj, featuring Shivai Devi temple, royal birth pavilion, and triangular fort walls. Continue to Lenyadri - the only Ashtavinayak temple carved inside a Buddhist rock-cut cave.",
    included: [
      "Full Day Dedicated AC Cab",
      "Fuel, Highway Tolls & Driver Fee",
      "Covers Shivneri Fort & Lenyadri Temple",
      "Same-day Doorstep Return to Shirdi",
    ],
    notIncluded: ["Fort entry ticket (nominal)"],
    highlights: [
      "Birth pavilion of Chhatrapati Shivaji Maharaj at Shivneri Fort",
      "Lenyadri Girijatmaj Ashtavinayak (Ancient Buddhist rock cave)",
      "Shivai Devi historic temple on fort base",
      "Scenic Sahyadri hill slopes and Junnar heritage",
    ],
    image: IMG.shivneriFort,
    imageAlt: "Shivneri Fort Junnar birthplace of Chhatrapati Shivaji Maharaj",
    gallery: [
      { src: IMG.shivneriFort, alt: "Historic Shivneri Fort ramparts" },
      { src: IMG.mountain, alt: "Sahyadri hills of Junnar" },
      { src: IMG.carOnRoad, alt: "Tour cab at fort base" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Every Indian must visit Shivneri. Standing at Shivaji Maharaj's birthplace gave goosebumps. Very smooth cab journey.",
      },
    ],
    faqs: baseFaqs,
    badge: "Maratha Heritage",
    featured: true,
    seoTitle: "Shirdi to Shivneri Fort Taxi | Junnar Birthplace & Lenyadri Tour",
    seoDescription:
      "Book Shirdi to Shivneri Fort taxi. Visit the birthplace of Chhatrapati Shivaji Maharaj & Lenyadri Ganpati from ₹3,800.",
  },
  {
    slug: "shirdi-to-sinhagad-fort",
    name: "Sinhagad Fort & Khadakwasla Dam Getaway (Pune)",
    destination: "Sinhagad Fort Pune",
    route: "Shirdi → Pune → Sinhagad Fort",
    category: "Hill Stations & Forts",
    distance: "430 KM",
    duration: "1 - 2 Days",
    price: "₹5,800",
    priceNum: 5800,
    roundTrip: "₹9,800",
    description:
      "Legendary Maratha fortress of Veer Tanaji Malusare, Pune hill views, hot Pithla Bhakri & Khadakwasla Lake.",
    longDescription:
      "Perched high on an isolated cliff south-west of Pune, Sinhagad Fort (Lion's Fort) is immortalised by Tanaji Malusare's heroic victory. Enjoy cool mountain breezes, Tanaji's memorial, Kalyan Darwaza, and authentic piping-hot Kanda Bhajji, Pithla Bhakri, and matka dahi. On the descent, stop at Khadakwasla Dam lake.",
    included: [
      "AC Vehicle with Driver",
      "Fuel, Highway & Fort Tolls",
      "Covers Sinhagad Fort & Khadakwasla Lake",
      "Doorstep Pickup in Shirdi",
    ],
    notIncluded: ["Local food / snacks"],
    highlights: [
      "Heroic battle fort of Veer Tanaji Malusare",
      "Panoramic 360-degree views of Pune valley & hills",
      "Authentic rural Maharashtrian Pithla Bhakri & Matka Dahi",
      "Scenic lakeside halt at Khadakwasla Dam",
    ],
    image: IMG.sinhagadFort,
    imageAlt: "Sinhagad Fort Pune hill fort tour from Shirdi",
    gallery: [
      { src: IMG.sinhagadFort, alt: "Sinhagad Fort bastion" },
      { src: IMG.khadakwasla, alt: "Khadakwasla Dam lake" },
      { src: IMG.pune, alt: "Pune city horizon" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "The climb to Sinhagad was exhilarating and the fresh Pithla Bhakri on the fort is out of this world. Highly recommended!",
      },
    ],
    faqs: baseFaqs,
    badge: "Iconic Fort",
    seoTitle: "Shirdi to Sinhagad Fort Taxi | Pune Fort & Khadakwasla Tour",
    seoDescription:
      "Book Shirdi to Sinhagad Fort taxi. Visit Tanaji's historic fort, taste hot Pithla Bhakri & Khadakwasla Lake from ₹5,800.",
  },
  {
    slug: "shirdi-to-lonavala-khandala",
    name: "Lonavala, Khandala & Karla Caves Scenic Tour",
    destination: "Lonavala & Khandala",
    route: "Shirdi → Pune Bypass → Lonavala",
    category: "Hill Stations & Forts",
    distance: "520 KM",
    duration: "2 Days / 1 Night",
    price: "₹7,500",
    priceNum: 7500,
    roundTrip: "₹12,800",
    description:
      "Maharashtra's twin hill stations - Tiger Point, Bhushi Dam cascades, Duke's Nose & Karla Buddhist Caves.",
    longDescription:
      "The premier weekend escape of Maharashtra! Travel in complete AC comfort from Shirdi to Lonavala and Khandala. Marvel at the dramatic abyss at Tiger's Leap / Point, splash in the stepped waterfalls of Bhushi Dam, visit ancient 2000-year-old rock-cut Karla and Bhaja Caves, and stock up on world-famous Maganlal Chikki.",
    included: [
      "2 Days Dedicated AC Car",
      "Fuel, Expressway Tolls & Chauffeur Fee",
      "All Sightseeing in Lonavala & Khandala",
      "Pickup and Return in Shirdi",
    ],
    notIncluded: ["Karla cave entry ticket", "Hotel stay in Lonavala"],
    highlights: [
      "Tiger's Leap & Lion's Point panoramic cliff drop-offs",
      "Bhushi Dam stepped water cascades",
      "Karla & Bhaja 2nd-century BC Buddhist cave temples",
      "Famous Lonavala chikki and fudge tasting",
    ],
    image: IMG.lonavala,
    imageAlt: "Lonavala Khandala Tiger Point hill station tour from Shirdi",
    gallery: [
      { src: IMG.lonavala, alt: "Tiger Point Lonavala" },
      { src: IMG.mountainValley, alt: "Western Ghats green valley" },
      { src: IMG.carOnRoad, alt: "Sedan on Expressway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Booked a 2-day Lonavala trip after Shirdi darshan. Driver was polite, drove smoothly on the ghats, and knew all scenic spots.",
      },
    ],
    faqs: baseFaqs,
    badge: "Popular Hill Station",
    featured: true,
    seoTitle: "Shirdi to Lonavala Taxi | Tiger Point & Khandala 2 Days Package",
    seoDescription:
      "Book Shirdi to Lonavala Khandala taxi. 2 Days round trip covering Tiger Point, Bhushi Dam & Karla Caves from ₹7,500.",
  },
  {
    slug: "shirdi-to-mahabaleshwar-panchgani",
    name: "Mahabaleshwar, Panchgani & Pratapgad Fort Special",
    destination: "Mahabaleshwar",
    route: "Shirdi → Pune → Mahabaleshwar",
    category: "Hill Stations & Forts",
    distance: "780 KM",
    duration: "3 Days / 2 Nights",
    price: "₹11,000",
    priceNum: 11000,
    roundTrip: "₹18,500",
    description:
      "Queen of Hill Stations - Arthur's Seat, Table Land Panchgani, Venna Lake boating & Pratapgad Fort.",
    longDescription:
      "Escape to the lush strawberry capital and Queen of Sahyadri Hill Stations. Enjoy Arthur's Seat (Queen of Points), Kate's Point, Venna Lake boating, Mapro Garden strawberry sundaes, Table Land in Panchgani, and the impregnable Pratapgad Fort built by Chhatrapati Shivaji Maharaj. An unforgettable family holiday with private chauffeur.",
    included: [
      "Car & Chauffeur for 3 Days",
      "Fuel, Highway Tolls & Driver Allowance",
      "Covers Mahabaleshwar, Panchgani & Pratapgad",
      "Shirdi Hotel Pickup & Return",
    ],
    notIncluded: ["Hotel accommodation in Mahabaleshwar"],
    highlights: [
      "Arthur's Seat & Elphinstone Point deep gorge views",
      "Venna Lake evening paddle & row boating",
      "Mapro Garden fresh strawberry cream & pizza",
      "Pratapgad Fort (Site of historic battle of Afzal Khan)",
    ],
    image: IMG.mahabaleshwar,
    imageAlt: "Mahabaleshwar Panchgani hill station and Pratapgad Fort tour",
    gallery: [
      { src: IMG.mahabaleshwar, alt: "Mahabaleshwar Viewpoint" },
      { src: IMG.vennaLake, alt: "Venna Lake Boating" },
      { src: IMG.mountain, alt: "Sahyadri mountains near Pratapgad" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "The best family vacation ever! Innova was extremely comfortable for 6 people and the kids loved Mapro Garden and Venna Lake.",
      },
    ],
    faqs: baseFaqs,
    badge: "Queen of Hills",
    featured: true,
    seoTitle: "Shirdi to Mahabaleshwar Taxi | 3 Days Hill Station Package",
    seoDescription:
      "Book Shirdi to Mahabaleshwar & Panchgani taxi. 3 Days round trip with Arthur Seat, Venna Lake & Pratapgad Fort from ₹11,000.",
  },
  {
    slug: "shirdi-to-igatpuri-kasara",
    name: "Igatpuri & Kasara Ghats Scenic Valley Retreat",
    destination: "Igatpuri",
    route: "Shirdi → Ghoti → Igatpuri",
    category: "Hill Stations & Forts",
    distance: "240 KM",
    duration: "Full Day",
    price: "₹3,800",
    priceNum: 3800,
    roundTrip: "₹6,200",
    description:
      "Serene Sahyadri mist hill station - Vipassana Golden Pagoda, Camel Valley, Bhavali Dam & Kasara Ghats.",
    longDescription:
      "Just 120 km from Shirdi, Igatpuri is a peaceful sanctuary nestled in the misty Sahyadri mountains. Visit the shimmering Golden Pagoda of the Dhamma Giri Vipassana Academy, gaze down the sheer drop of Camel Valley, admire the turquoise waters of Bhavali Dam and Vaitarna Lake, and relish the crisp mountain climate.",
    included: [
      "Private AC Cab for the Day",
      "Fuel, Tolls & Driver Allowance",
      "Covers Vipassana Center, Camel Valley & Dams",
      "Hotel Pickup & Return in Shirdi",
    ],
    notIncluded: [],
    highlights: [
      "Dhamma Giri Vipassana Golden Pagoda monument",
      "Camel Valley panoramic waterfalls & ravines",
      "Bhavali Dam & peaceful Vaitarna lakeside spots",
      "Smooth mountain drive via Samruddhi corridor",
    ],
    image: IMG.igatpuri,
    imageAlt: "Igatpuri hill station misty valley tour from Shirdi",
    gallery: [
      { src: IMG.igatpuri, alt: "Igatpuri green valley and clouds" },
      { src: IMG.mountainLake, alt: "Vaitarna lake reservoir" },
      { src: IMG.carOnRoad, alt: "Tour car on ghat road" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "Very peaceful and calm retreat. The Vipassana center pagoda is majestic and the weather was so cool and refreshing.",
      },
    ],
    faqs: baseFaqs,
    badge: "Peace & Mist",
    seoTitle: "Shirdi to Igatpuri Taxi | Hill Station & Vipassana Tour from ₹3,800",
    seoDescription:
      "Book Shirdi to Igatpuri taxi rental. Visit Dhamma Giri Golden Pagoda, Camel Valley & Bhavali Dam from ₹3,800.",
  },
  {
    slug: "shirdi-to-lavasa-mulshi",
    name: "Lavasa Lakeside City & Mulshi Dam Getaway",
    destination: "Lavasa & Mulshi",
    route: "Shirdi → Pune → Lavasa & Mulshi",
    category: "Hill Stations & Forts",
    distance: "540 KM",
    duration: "2 Days / 1 Night",
    price: "₹7,800",
    priceNum: 7800,
    roundTrip: "₹13,200",
    description:
      "Italian-inspired Portofino waterfront hill city, Mulshi lake reservoir & Tamhini ghat waterfalls.",
    longDescription:
      "Experience the picturesque charm of Lavasa, India's planned lakeside hill city modelled after the Italian fishing village of Portofino. Stroll along the colourful waterfront promenade, try lakeside jet skiing and water sports, visit scenic Mulshi Dam, and enjoy the winding roads of the Western Ghats.",
    included: [
      "2 Days Dedicated AC Car",
      "Fuel, Highway Tolls & Driver Allowance",
      "All Sightseeing in Lavasa & Mulshi",
      "Pickup and Return in Shirdi",
    ],
    notIncluded: ["Lavasa entry parking fee if applicable"],
    highlights: [
      "Waterfront promenade with colourful Mediterranean buildings",
      "Mulshi Dam serene reservoir & sunset viewpoint",
      "Water sports and pedal boating in Warasgaon Lake",
      "Scenic ghat road drive from Pune to the mountains",
    ],
    image: IMG.lavasa,
    imageAlt: "Lavasa lakeside hill city and Mulshi Dam tour from Shirdi",
    gallery: [
      { src: IMG.lavasa, alt: "Lavasa lakeside colourful buildings" },
      { src: IMG.khadakwasla, alt: "Mulshi lake waters" },
      { src: IMG.carOnRoad, alt: "Sedan on hill road" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Lavasa was unique and peaceful. The lakeside walk in the evening with cool mountain breeze was lovely.",
      },
    ],
    faqs: baseFaqs,
    badge: "Lakeside Charm",
    seoTitle: "Shirdi to Lavasa & Mulshi Lake Taxi | 2 Days Hill Getaway",
    seoDescription:
      "Book Shirdi to Lavasa & Mulshi Dam taxi. 2 Days round trip covering Italian waterfront & scenic hills from ₹7,800.",
  },

  // ==========================================
  // 4. OUTSTATION MAJOR ROUTES & WEEKEND TOURS
  // ==========================================
  {
    slug: "shirdi-to-mumbai",
    name: "Shirdi to Mumbai Express (Airport & City)",
    destination: "Mumbai",
    route: "Shirdi → Mumbai",
    category: "Outstation",
    distance: "256 KM",
    duration: "4.5 Hours",
    price: "₹4,500",
    priceNum: 4500,
    roundTrip: "₹8,500",
    description:
      "Comfortable one-way and round trip taxi via Samruddhi Mahamarg to any address in Mumbai.",
    longDescription:
      "Travel from Shirdi to Mumbai in complete comfort via the new high-speed Samruddhi Mahamarg expressway. Whether you need a drop at Mumbai International Airport (CSMIA T2), Dadar, Borivali, BKC, Thane, or Navi Mumbai, our chauffeur-driven car guarantees a smooth, safe transit with zero hidden charges.",
    included: [
      "Fuel & Highway Tolls Included",
      "Professional Chauffeur",
      "Clean AC Vehicle",
      "Doorstep Drop Anywhere in Mumbai",
    ],
    notIncluded: ["Local Mumbai multi-halt sightseeing"],
    highlights: [
      "Direct rapid corridor via Samruddhi Mahamarg",
      "Doorstep drop to CSMIA Airport, BKC, Dadar or Thane",
      "Complimentary waiting up to 2 hours",
      "Experienced highway chauffeurs",
    ],
    image: IMG.mumbaiSeaLink,
    imageAlt: "Mumbai Sea Link and skyline taxi service from Shirdi",
    gallery: [
      { src: IMG.mumbaiSeaLink, alt: "Bandra Worli Sea Link Mumbai" },
      { src: IMG.carOnRoad, alt: "Expressway sedan" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "Took the Samruddhi Mahamarg route to Mumbai. Reached in 4.5 hours flat. Spotless car, courteous driver.",
      },
    ],
    faqs: baseFaqs,
    badge: "Express Route",
    featured: true,
    seoTitle: "Shirdi to Mumbai Taxi | One Way & Round Trip from ₹4,500",
    seoDescription:
      "Book Shirdi to Mumbai taxi via Samruddhi Mahamarg. Clean AC cars, fuel & tolls included, one way from ₹4,500.",
  },
  {
    slug: "shirdi-to-pune",
    name: "Shirdi to Pune (Airport, Hinjawadi & City Cab)",
    destination: "Pune",
    route: "Shirdi → Pune",
    category: "Outstation",
    distance: "187 KM",
    duration: "4.5 Hours",
    price: "₹4,999",
    priceNum: 4999,
    roundTrip: "₹9,500",
    description:
      "Reliable taxi service to Pune Airport, Hinjawadi IT Park, Koregaon Park or any city address.",
    longDescription:
      "A breezy, dependable highway drive from Shirdi to Pune via Sangamner or Ahilyanagar route. Ideal for pilgrims heading back to Pune, IT professionals commuting to Hinjawadi or Magarpatta, or passengers catching domestic flights at Pune Airport.",
    included: [
      "Fuel Included",
      "Tolls Included",
      "Professional Driver",
      "Doorstep Drop in Pune",
    ],
    notIncluded: [],
    highlights: [
      "Door-to-door drop in Hinjawadi, Koregaon Park or Pune Airport",
      "Via Sangamner / Ahilyanagar highway",
      "Available 24x7 for flight or train timings",
    ],
    image: IMG.pune,
    imageAlt: "Pune city skyline for Shirdi to Pune taxi package",
    gallery: [
      { src: IMG.pune, alt: "Pune city" },
      { src: IMG.carOnRoad, alt: "Highway sedan" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Driver arrived 15 minutes before time. Dropped us directly at Hinjawadi Phase 1 without a single hassle.",
      },
    ],
    faqs: baseFaqs,
    badge: "City Corridor",
    seoTitle: "Shirdi to Pune Taxi | Hinjawadi & Airport Drop from ₹4,999",
    seoDescription:
      "Book Shirdi to Pune taxi with fuel, tolls and driver included. 187 km in 4.5 hours with clean AC cars from ₹4,999.",
  },
  {
    slug: "shirdi-to-nashik",
    name: "Shirdi to Nashik Cab",
    destination: "Nashik",
    route: "Shirdi → Nashik",
    category: "Outstation",
    distance: "85 KM",
    duration: "2 Hours",
    price: "₹2,400",
    priceNum: 2400,
    roundTrip: "₹4,200",
    description:
      "Quick highway drive to the wine capital - direct drop to Godavari ghats, Panchavati or Sula.",
    longDescription:
      "Head to the vibrant city of Nashik with a comfortable, private AC taxi. Perfect when visiting family, exploring famous vineyards like Sula, attending business meetings, or continuing onward journeys. Smooth 2-hour drive with door-to-door service.",
    included: [
      "Fuel Included",
      "Tolls Included",
      "Professional Driver",
      "Doorstep Drop Anywhere in Nashik",
    ],
    notIncluded: [],
    highlights: [
      "Fast 2-hour drive via Sinnar",
      "Doorstep drop to any hotel or address",
      "Sula Vineyards & Godavari ghat stops on request",
    ],
    image: IMG.nashik,
    imageAlt: "Nashik Godavari Ghat taxi package from Shirdi",
    gallery: [
      { src: IMG.nashik, alt: "Nashik Ghats" },
      { src: IMG.carOnRoad, alt: "Car on Nashik highway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Clean car, driver knew all shortcuts in Nashik. Reached in under 2 hours.",
      },
    ],
    faqs: baseFaqs,
    badge: "Quick Trip",
    seoTitle: "Shirdi to Nashik Taxi | One Way & Round Trip from ₹2,400",
    seoDescription:
      "Book Shirdi to Nashik taxi. 85 km in 2 hours with fuel, tolls and driver included from ₹2,400.",
  },
  {
    slug: "shirdi-to-chhatrapati-sambhajinagar",
    name: "Shirdi to Chhatrapati Sambhajinagar",
    destination: "Chhatrapati Sambhajinagar",
    route: "Shirdi → Chhatrapati Sambhajinagar",
    category: "Outstation",
    distance: "106 KM",
    duration: "2 Hours",
    price: "₹3,500",
    priceNum: 3500,
    roundTrip: "₹6,500",
    description:
      "Doorstep taxi to the Deccan heritage capital - Bibi Ka Maqbara, Panchakki & city centre.",
    longDescription:
      "Cross the Marathwada plateau into historic Chhatrapati Sambhajinagar. Gateway to Bibi Ka Maqbara (the Taj of the Deccan), Panchakki water mill, and world-heritage rock-cut caves. Fuel, tolls, and driver allowance are all included.",
    included: [
      "Fuel & Highway Tolls Included",
      "Professional Driver",
      "AC Vehicle",
      "Doorstep Drop Anywhere in Sambhajinagar",
    ],
    notIncluded: [],
    highlights: [
      "Fast highway transit in 2 hours",
      "Doorstep drop to airport, railway station or hotels",
      "Mini Taj Mahal (Bibi Ka Maqbara) stop available",
    ],
    image: IMG.aurangabad,
    imageAlt: "Bibi Ka Maqbara Chhatrapati Sambhajinagar taxi package",
    gallery: [
      { src: IMG.aurangabad, alt: "Bibi Ka Maqbara" },
      { src: IMG.carOnRoad, alt: "Highway sedan" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "Reliable and punctual. Reached Sambhajinagar in exact 2 hours. Very satisfied.",
      },
    ],
    faqs: baseFaqs,
    badge: "Heritage Gate",
    seoTitle: "Shirdi to Chhatrapati Sambhajinagar Taxi | from ₹3,500",
    seoDescription:
      "Book Shirdi to Chhatrapati Sambhajinagar taxi. 106 km door-to-door with driver, fuel & tolls from ₹3,500.",
  },
  {
    slug: "shirdi-to-ajanta-ellora",
    name: "Ajanta & Ellora Caves UNESCO 2-Day Tour",
    destination: "Ajanta & Ellora",
    route: "Shirdi → Ajanta & Ellora Caves",
    category: "Weekend Trips",
    distance: "350 KM",
    duration: "2 Days / 1 Night",
    price: "₹8,999",
    priceNum: 8999,
    roundTrip: "₹15,500",
    description:
      "Curated 2-day heritage tour of ancient Buddhist Ajanta murals and the colossal Kailasa Temple at Ellora.",
    longDescription:
      "A world-class cultural journey from Shirdi. Day 1 drives to the horse-shoe gorge of Ajanta to witness 2000-year-old Buddhist frescoes and murals, followed by an overnight stay in Sambhajinagar. Day 2 explores the rock-hewn Kailasa temple at Ellora and the historic Daulatabad Fort before returning to Shirdi.",
    included: [
      "Car for 2 Full Days",
      "Fuel, Tolls & Driver Night Stay Included",
      "Covers Ajanta Caves, Ellora Caves & Daulatabad",
      "Doorstep Shirdi Pickup & Return",
    ],
    notIncluded: ["Guest hotel rooms", "Cave monument tickets"],
    highlights: [
      "Both UNESCO World Heritage cave complexes",
      "Colossal monolithic Kailasa Temple at Ellora",
      "Ancient Buddhist paintings at Ajanta",
      "Dedicated chauffeur throughout 2 days",
    ],
    image: IMG.ajanta,
    imageAlt: "Ajanta & Ellora Caves UNESCO World Heritage tour from Shirdi",
    gallery: [
      { src: IMG.ajanta, alt: "Ajanta Caves" },
      { src: IMG.ellora, alt: "Kailasa temple Ellora" },
      { src: IMG.aurangabad, alt: "Chhatrapati Sambhajinagar" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "The 2-day Ajanta Ellora tour was mesmerising. The car was always ready and the chauffeur took care of all parking and routes.",
      },
    ],
    faqs: baseFaqs,
    badge: "UNESCO Heritage",
    featured: true,
    seoTitle: "Shirdi to Ajanta & Ellora Caves Tour Taxi | 2-Day Package",
    seoDescription:
      "Book 2-day Ajanta & Ellora caves tour from Shirdi in a private taxi. Fuel, tolls & driver included from ₹8,999.",
  },
  {
    slug: "custom-tour",
    name: "Custom Multi-Day Maharashtra Tour",
    destination: "Any Destination",
    route: "Custom Multi-City Itinerary",
    category: "Weekend Trips",
    distance: "Flexible",
    duration: "Multi-Day",
    price: "Custom",
    priceNum: 0,
    roundTrip: "Custom",
    description:
      "Design your tailor-made multi-city itinerary across Maharashtra with our expert route planners.",
    longDescription:
      "Planning a multi-city pilgrimage or family road trip across Western Maharashtra? We customize door-to-door itineraries covering Shirdi, Jyotirlingas, Ashtavinayak temples, hill stations, and royal forts. We suggest the ideal vehicle from our fleet and give one transparent all-inclusive quote.",
    included: [
      "Free Custom Route Planning",
      "Fleet Selection (Dzire, Ertiga, Innova, Urbania)",
      "Transparent All-Inclusive Quote",
      "Dedicated Professional Multi-Day Chauffeur",
    ],
    notIncluded: [],
    highlights: [
      "Tailor-made routing according to your family schedule",
      "Full fleet of sedans, SUVs, luxury Urbanias & Travellers",
      "One clear all-inclusive price with zero surprises",
    ],
    image: IMG.carSport,
    imageAlt: "Custom multi-day private tour package from Shirdi",
    gallery: [
      { src: IMG.carSport, alt: "Premium touring car" },
      { src: IMG.mountain, alt: "Scenic tour route" },
      { src: IMG.bhandardara, alt: "Hill station halt" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Built a custom 4-day route across Shirdi, Nashik, Bhandardara and Pune. Flawless execution and exact quote.",
      },
    ],
    faqs: baseFaqs,
    badge: "Tailor Made",
    seoTitle: "Custom Multi-Day Taxi Tours From Shirdi | Flexible Private Rentals",
    seoDescription:
      "Plan a custom multi-city taxi tour from Shirdi. Tailor-made routes, premium vehicles and one transparent all-inclusive quote.",
  },
];

export { packages };

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 3) {
  const current = getPackage(slug);
  if (!current) return packages.slice(0, limit);
  const pool = packages.filter((p) => p.slug !== slug);
  const same = pool.filter((p) => p.category === current.category);
  return [...same, ...pool.filter((p) => p.category !== current.category)].slice(
    0,
    limit
  );
}