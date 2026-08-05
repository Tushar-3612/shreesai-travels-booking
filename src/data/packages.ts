export type Category =
  | "Temple Tours"
  | "Airport"
  | "Outstation"
  | "Local"
  | "Weekend Trips";

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
  phone: "+917498462597",
  phoneDisplay: "+91 7498 462 597",
  whatsapp: "917498462597",
  email: "info@shirdicarrental.com",
  address: "Near Sai Temple, Shirdi, Maharashtra 423109",
  whatsappMessage: (text: string) =>
    `https://wa.me/917498462597?text=${encodeURIComponent(text)}`,
};

export const IMG = {
  mumbaiSeaLink:
    "https://upload.wikimedia.org/wikipedia/commons/2/2b/Mumbai_Bandra-Worli_Sea_Link.jpg",
  mumbaiGateway:
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg",
  pune: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pune_West_skyline_-_March_2017.jpg/3840px-Pune_West_skyline_-_March_2017.jpg",
  nashik:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/NashikViewfromPandavLeni.jpg",
  aurangabad:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Bibi_Ka_Maqbara_-_The_Taj_Of_Deccan.jpg/3840px-Bibi_Ka_Maqbara_-_The_Taj_Of_Deccan.jpg",
  trimbakeshwar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Trimbakeshwar_Temple-Nashik-Maharashtra-1.jpg/3840px-Trimbakeshwar_Temple-Nashik-Maharashtra-1.jpg",
  shaniShingnapur:
    "https://upload.wikimedia.org/wikipedia/commons/3/3b/Shani_Shignapur_renowned_for_its_Shani_temple.jpg",
  bhimashankar:
    "https://upload.wikimedia.org/wikipedia/commons/d/d7/Bhimashankar.jpg",
  ajanta: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Ajanta_%2863%29.jpg",
  ellora:
    "https://upload.wikimedia.org/wikipedia/en/f/fc/Kailash_temple_%28Ellora_cave_no_15%29_at_Verul.png",
  saiShirdi:
    "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg",
  saiPortrait:
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Shirdi_Sai_Baba_3.jpg",
  shirdiAirport:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Glimpse_at_shirdi_airport.jpg/3840px-Glimpse_at_shirdi_airport.jpg",
  shirdiStation:
    "https://upload.wikimedia.org/wikipedia/commons/8/85/SNSI_Sainagar_Shirdi_Railway_Station.jpg",
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
    rating: 4,
    route: "Shirdi → Trimbakeshwar",
    date: "2026-06-15",
    text: "Reliable taxi service in Shirdi. The driver was knowledgeable about all the temples and attractions. Fair pricing, comfortable ride.",
  },
  {
    name: "Vikram Joshi",
    location: "Nagpur",
    rating: 5,
    route: "Shirdi → Mumbai",
    date: "2026-05-30",
    text: "Booked an Innova for a family trip. Comfortable ride, generous legroom, and the driver was extremely careful on the road. Peaceful journey.",
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
    name: "XUV XL6",
    image: "/images/xuv.jpeg",
    seats:6 ,
    fuel: "Diesel",
    ac: "Fully AC",
    description:
      "Premium SUV with a commanding drive - perfect for long highway runs, group darshan and executive pickups.",
  },
  {
    name: "Maruti Swift Dzire",
    image:
      "https://imgd.aeplcdn.com/0x0/n/cw/ec/44701/swift-dzire-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
    seats: 4,
    fuel: "Petrol",
    ac: "Fully AC",
    description:
      "Our most booked sedan - smooth, economical and ideal for Shirdi darshan, airport pickups and city rides.",
  },
  {
    name: "7 Seater Traveller",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200&auto=format&fit=crop",
    seats: 7,
    fuel: "Diesel",
    ac: "Fully AC",
    description:
      "Spacious and comfortable traveller for family trips, group tours and outstation journeys with big luggage.",
  },
];

const baseFaqs: PackageFaq[] = [
  {
    q: "How much does this package cost?",
    a: "The fare shown is our transparent starting price. Fuel, tolls, parking and our verified driver are all included. The final amount depends on the car type you choose.",
  },
  {
    q: "Can I book one-way?",
    a: "Yes. Every package supports one-way and round-trip bookings. Pick one way when you plan to stay back or travel onward - we share an exact one-way fare at the time of booking.",
  },
  {
    q: "Can I book round trip?",
    a: "Absolutely. Most pilgrims prefer a round trip, where the car waits at the temple or hotel for your return. You get a fixed return fare with no last-minute surprises.",
  },
  {
    q: "Is night travel available?",
    a: "Yes, we operate 24x7. Night travel and early-morning airport or darshan pickups are handled by our experienced night drivers.",
  },
];

export const CATEGORIES: CategoryKey[] = [
  "All",
  "Temple Tours",
  "Airport",
  "Outstation",
  "Local",
  "Weekend Trips",
];

const packages: TravelPackage[] = [
  {
    slug: "shirdi-to-mumbai",
    name: "Shirdi to Mumbai Darshan ",
    destination: "Mumbai",
    route: "Shirdi → Mumbai",
    category: "Outstation",
    distance: "256 KM",
    duration: "4.5 to 5.5 hours depending on traffic.",
    price: "₹4,500",
    priceNum: 4500,
    roundTrip: "₹8,500",
    description:
      "Comfortable one-way and round trip taxi service with experienced drivers.",
    longDescription:
      "Travel from Shirdi to Mumbai in complete comfort. We plot the fastest route via Samruddhi Mahamarg so you reach India's commercial capital without a minute wasted. Whether it is a family visit, a business meeting in BKC or a quick airport hop, our premium chauffeur-driven sedan turns the 180 km highway stretch into a calm, relaxing ride.",
    included: ["Fuel Included", "Toll Included", "Professional Driver", "Clean Vehicle" ,"Hotel accommodation"],
    notIncluded: [ "Local Mumbai sightseeing"],
    highlights: [
      "Direct run via Samruddhi Mahamarg",
      "Drop at any address in Mumbai",
      "Complimentary waiting up to 2 hours",
    ],
    image: IMG.mumbaiSeaLink,
    imageAlt: "Mumbai skyline and Bandra Worli Sea Link on the Shirdi to Mumbai route",
    gallery: [
      { src: IMG.mumbaiGateway, alt: "Gateway of India, Mumbai" },
      { src: IMG.mumbaiSeaLink, alt: "Bandra Worli Sea Link" },
      { src: IMG.carOnRoad, alt: "Premium taxi on the Mumbai highway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "Booked an Innova to Mumbai on a weekend. Spotless car, courteous driver and fuel & tolls all covered. Best fare I found in Shirdi.",
      },
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Reached Mumbai Marine Drive without a single halt. The driver knew every shortcut on the stretch. Highly recommended.",
      },
    ],
    faqs: baseFaqs,
    badge: "Most Popular",
    seoTitle: "Shirdi to Mumbai Taxi | One Way & Round Trip from ₹4,500",
    seoDescription:
      "Book Shirdi to Mumbai taxi - one way and round trip from ₹4,500. 180 km, 4 hrs, AC car, fuel & tolls included, verified professional drivers.",
  },
  {
    slug: "shirdi-to-pune",
    name: "Shirdi to Pune",
    destination: "Pune",
    route: "Shirdi → Pune",
    category: "Outstation",
    distance: "187 KM",
    duration: "6 Hours",
    price: "₹4,999",
    priceNum: 4999,
    roundTrip: "₹9,500",
    description:
      "A breezy drive to Pune with one-way and round trip options.",
    longDescription:
      "A delightful journey through the Sahyadri foothills. Our experienced Pune driver handles the navigation, highway tolls and parking while you travel in a spacious, air-conditioned car - ideal for business meetings in Hinjawadi or visiting family across the city.",
    included: ["Fuel Included", "Toll Included", "Professional Driver", "Clean Vehicle"],
    notIncluded: ["Hotel accommodation"],
    highlights: [
      "Primary Route: Pune → Chakan → Sangamner → Shirdi via NH60 Alternative Route: Via Ahilyanagar and Rahuri (approx. 200 km, 4.5 hours)",
      "Direct drop in Hinjawadi & Koregaon Park",
      "Complimentary waiting time",
    ],
    faqs: baseFaqs,
    image: IMG.pune,
    imageAlt: "Pune city skyline for the Shirdi to Pune taxi package",
    gallery: [
      { src: IMG.pune, alt: "Pune city skyline" },
      { src: IMG.carOnRoad, alt: "Sedan on the Pune highway" },
    ],
    reviews: [
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Spotless car and a driver who arrived an hour early. Reached Hinjawadi without a single delay. Excellent pricing.",
      },
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "One-way drop to Pune worked perfectly. Clean sedan, transparent charges and a courteous driver throughout.",
      },
    ],
    seoTitle: "Shirdi to Pune Taxi | One Way & Round Trip from ₹4,999",
    seoDescription:
      "Book a Shirdi to Pune taxi with fuel, tolls and driver included. 255 km in around 6 hours with clean AC cars from ₹4,999.",
  },
  {
    slug: "shirdi-to-nashik",
    name: "Shirdi to Nashik",
    destination: "Nashik",
    route: "Shirdi → Nashik",
    category: "Outstation",
    distance: "155 KM",
    duration: "3.5 Hours",
    price: "₹2,800",
    priceNum: 2800,
    roundTrip: "₹5,300",
    description:
      "A relaxed highway run into Nashik with flexible one-way drops.",
    longDescription:
      "Head to the city of grapes, ghats and the Kumbh Mela with a comfortable taxi that directly reaches any address in Nashik. Perfect when you want to visit the vineyards, walk the Godavari ghats or continue to the nearby temples. A local driver keeps the journey smooth and fuss-free.",
    included: ["Fuel Included", "Toll Included", "Professional Driver", "Clean Vehicle"],
    notIncluded: ["Local Nashik sightseeing"],
    highlights: [
      "Direct drop anywhere in Nashik",
      "Godavari ghat & vineyards nearby",
      "Flexible one-way option",
    ],
    image: IMG.nashik,
    imageAlt: "Nashik city view from Pandav Leni for the taxi package",
    gallery: [
      { src: IMG.nashik, alt: "Nashik view from Pandav Leni" },
      { src: IMG.carOnRoad, alt: "Sedan near Nashik on the highway" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Smooth ride to Nashik. The driver waited patiently for our vineyard visit and drove us back on the round trip.",
      },
    ],
    seoTitle: "Shirdi to Nashik Taxi | One Way & Round Trip from ₹2,800",
    seoDescription:
      "Instant Nashik taxi from Shirdi - one way and round trip. AC sedan with driver, fuel & tolls covered, from ₹2,800.",
  },
  {
    slug: "shirdi-to-chhatrapati-sambhajinagar",
    name: "Shirdi to Chhatrapati Sambhajinagar",
    destination: "Chhatrapati Sambhajinagar",
    route: "Shirdi → Chhatrapati Sambhajinagar",
    category: "Outstation",
    distance: "106 KM",
    duration: "2 Hours",
    price: "₹5,500",
    priceNum: 5500,
    roundTrip: "₹10,500",
    description:
      "A dependable taxi to the gateway of the Deccan's heritage.",
    longDescription:
      "Cross the plateau into the historic city of Chhatrapati Sambhajinagar, gateway to Bibi Ka Maqbara, Panchakki and the mighty Ajanta & Ellora caves. This is a complete door-to-door taxi - fuel, tolls and driver all included - so you can sit back as the countryside rolls by your window.",
    included: ["Fuel Included", "Toll Included", "Professional Driver", "Clean Vehicle"],
    notIncluded: ["Hotel accommodation"],
    highlights: [
      "Bibi Ka Maqbara & Panchakki stops",
      "Gateway to Ajanta-Ellora",
      "Family-sized cars available",
    ],
    image: IMG.aurangabad,
    imageAlt: "Bibi Ka Maqbara in Chhatrapati Sambhajinagar, the Taj of the Deccan",
    gallery: [
      { src: IMG.aurangabad, alt: "Bibi Ka Maqbara, Chhatrapati Sambhajinagar" },
      { src: IMG.ajanta, alt: "Ajanta Caves,Chhatrapati Sambhajinagar " },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "Comfortable taxi to Chhatrapati Sambhajinagar. Reached Bibi Ka Maqbara after a smooth drive and the service was truly flawless.",
      },
    ],
    seoTitle: "Shirdi to Chhatrapati Sambhajinagar Taxi | One Way & Round Trip",
    seoDescription:
      "Reliable Shirdi to Chhatrapati Sambhajinagar taxi - one way and round trip. 325 km door-to-door with driver, fuel & tolls from ₹5,500.",
  },
  {
    slug: "shirdi-to-trimbakeshwar",
    name: "Shirdi to Trimbakeshwar",
    destination: "Trimbakeshwar",
    route: "Shirdi → Trimbakeshwar",
    category: "Temple Tours",
    distance: "165 KM",
    duration: "4 Hours",
    price: "₹3,500",
    priceNum: 3500,
    roundTrip: "₹6,400",
    description:
      "A sacred car tour to the Trimbakeshwar Jyotirlinga.",
    longDescription:
      "A devoted journey to one of the twelve supreme Shiva Jyotirlingas. Our temple-experienced drivers know the best darshan windows, the right parking and the queue-hacks, so your Trimbakeshwar visit stays peaceful and blessed. The quiet Godavari source beside the temple is a serene bonus to linger over.",
    included: [
      "Fuel Included",
      "Toll Included",
      "Temple pickup & drop",
      "Professional Driver",
    ],
    notIncluded: ["Pooja / abhishek charges"],
    highlights: [
      "Early darshan planning",
      "The 12 Jyotirlinga route",
      "Riverside Godavari stop",
    ],
    image: IMG.trimbakeshwar,
    imageAlt: "Trimbakeshwar Jyotirlinga temple near Nashik",
    gallery: [
      { src: IMG.trimbakeshwar, alt: "Trimbakeshwar Temple" },
      { src: IMG.bhimashankar, alt: "Shiv linga atmosphere" },
      { src: IMG.carOnRoad, alt: "Car on the Trimbakeshwar ghat route" },
    ],
    faqs: baseFaqs,
    badge: "Temple Favourite",
    reviews: [
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "Reached Trimbakeshwar for the calmest early darshan. The team handled the ghat roads brilliantly.",
      },
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Round trip to Trimbakeshwar was seamless. The car waited at the temple and returned on time.",
      },
    ],
    seoTitle: "Shirdi to Trimbakeshwar Taxi | Jyotirlinga Darshan from ₹3,500",
    seoDescription:
      "Book a Trimbakeshwar darshan taxi from Shirdi. 165 km with early-darshan planning, fuel & tolls covered, from ₹3,500.",
  },
  {
    slug: "shirdi-to-shani-shingnapur",
    name: "Shirdi to Shani Shingnapur",
    destination: "Shani Shingnapur",
    route: "Shirdi → Shani Shingnapur",
    category: "Temple Tours",
    distance: "95 KM",
    duration: "2.5 Hours",
    price: "₹2,600",
    priceNum: 2600,
    roundTrip: "₹4,800",
    description:
      "Same-day darshan to the famous open-air Shani temple.",
    longDescription:
      "A quick and comfortable day-trip to Shani Shingnapur - the village without doors, home to the open-sky Shani temple. We plan a same-day round trip: leave Shirdi after breakfast, reach the shrine in under three hours, offer darshan and be back home well before dinner.",
    included: ["Fuel Included", "Toll Included", "Professional Driver", "Temple Parking"],
    notIncluded: ["Abhishekam offering charges"],
    highlights: [
      "Return same day darshan",
      "Open-sky Shani idol",
      "Scenic countryside drive",
    ],
    image: IMG.shaniShingnapur,
    imageAlt: "Open-air Shani temple at Shani Shingnapur",
    gallery: [
      { src: IMG.shaniShingnapur, alt: "Shani Shingnapur open-air temple" },
      { src: IMG.waterfall, alt: "Rural Maharashtra roadside" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Left at 8 am, darshan done by 11 and home before lunch. The open-air temple drive was lovely too.",
      },
    ],
    seoTitle: "Shirdi to Shani Shingnapur Taxi | Same-Day Darshan",
    seoDescription:
      "Same-day Shirdi to Shani Shingnapur taxi for darshan & return. All amenities covered, comfortable AC drive from ₹2,600.",
  },
  {
    slug: "shirdi-to-bhimashankar",
    name: "Shirdi to Bhimashankar",
    destination: "Bhimashankar",
    route: "Shirdi → Bhimashankar",
    category: "Weekend Trips",
    distance: "115 KM",
    duration: "3 Hours",
    price: "₹3,200",
    priceNum: 3200,
    roundTrip: "₹6,000",
    description:
      "A cool weekend escape to the Bhimashankar wilderness temple.",
    longDescription:
      "Climb into the deep, misty forest of Bhimashankar where a sacred Jyotirlinga rests beside a wildlife sanctuary. The drive itself is a highlight - hairpin ghats through dense forests. Our hill drivers take it steady while you savour the cold mountain air.",
    included: ["Fuel Included", "Hill-driving expert", "Professional Driver", "AC Vehicle"],
    notIncluded: ["Sanctuary entry fees"],
    highlights: [
      "Jyotirlinga inside a forest",
      "Scenic ghat roadway",
      "Perfect 1-day weekend plan",
    ],
    image: IMG.bhimashankar,
    imageAlt: "Bhimashankar temple inside the sanctuary",
    gallery: [
      { src: IMG.bhimashankar, alt: "Bhimashankar temple" },
      { src: IMG.mountain, alt: "Sahyadri ghat road" },
      { src: IMG.mountainValley, alt: "Cool mountain atmosphere" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "A perfect weekend trip. The driver took the safe scenic ghat and we loved the cool forest air at Bhimashankar.",
      },
    ],
    seoTitle: "Shirdi to Bhimashankar Taxi | Weekend Trip from ₹3,200",
    seoDescription:
      "Weekend taxi from Shirdi to Bhimashankar Jyotirlinga and sanctuary. Hill-safe drivers and AC comfort from ₹3,200.",
  },
  {
    slug: "shirdi-to-ajanta-ellora",
    name: "Shirdi to Ajanta Ellora",
    destination: "Ajanta & Ellora",
    route: "Shirdi → Ajanta Ellora",
    category: "Weekend Trips",
    distance: "350 KM",
    duration: "2 Days",
    price: "₹8,999",
    priceNum: 8999,
    roundTrip: "₹15,500",
    description:
      "A curated 2-day heritage tour of the UNESCO cave complexes.",
    longDescription:
      "The most extraordinary cultural expedition - Ajanta with its murals in gold and green, Ellora with the colossal rock-carved Kailasa temple - all in one smooth itinerary. Day one drives to Ajanta, a comfortable overnight in Chhatrapati Sambhajinagar, and day two visits the caves of Ellora before returning to Shirdi. Car, fuel, tolls and driver are arranged end-to-end.",
    included: [
      "Car for 2 full days",
      "Fuel & tolls included",
      "Driver stay arranged",
      "Expert route planning",
    ],
    notIncluded: ["Guest hotel stay", "Cave entry tickets", "Guide charges"],
    highlights: [
      "Both UNESCO World Heritage sites",
      "Overnight stay plan in Chhatrapati Sambhajinagar",
      "Private chauffeur throughout",
    ],
    image: IMG.ajanta,
    imageAlt: "Ajanta Caves rock-cut architecture on the heritage tour",
    gallery: [
      { src: IMG.ajanta, alt: "Ajanta Caves" },
      { src: IMG.ellora, alt: "Kailasa temple, Ellora" },
      { src: IMG.aurangabad, alt: "Night stay at Chhatrapati Sambhajinagar" },
    ],
    faqs: baseFaqs,
    badge: "Hidden Gem",
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "The 2-day Ajanta Ellora experience was mesmerising. Perfect timing and the car was always waiting for us.",
      },
    ],
    seoTitle: "Shirdi to Ajanta & Ellora Tour Taxi | 2-Day from ₹8,999",
    seoDescription:
      "2-day Ajanta & Ellora caves tour from Shirdi in a private taxi. Fuel, tolls, driver & 2 full days of usage from ₹8,999.",
  },
  {
    slug: "shirdi-airport",
    name: "Shirdi Airport Pickup",
    destination: "Shirdi Airport",
    route: "Shirdi Airport ⇌ Hotel",
    category: "Airport",
    distance: "14 KM",
    duration: "30 Min",
    price: "₹600",
    priceNum: 600,
    roundTrip: "₹1,100",
    description:
      "Flight-tracked pickup and drop with a personal meet & greet.",
    longDescription:
      "Your flight lands and your private AC sedan is already at the gate. Our chauffeur meets you at the arrivals terminal with a name board, helps with the bags and drives you to any hotel, darshan or stay in Shirdi. Available 24x7 for early red-eyes and midnight drops alike - with zero waiting charge.",
    included: [
      "Meet & Greet at Terminal",
      "Baggage Assistance",
      "Air Conditioned Car",
      "24x7 Availability",
    ],
    notIncluded: [],
    highlights: [
      "Name-board meet & greet",
      "Live flight tracking",
      "Zero waiting charges",
    ],
    image: IMG.shirdiAirport,
    imageAlt: "Shirdi Airport terminal with a waiting taxi",
    gallery: [
      { src: IMG.shirdiAirport, alt: "Shirdi Airport terminal" },
      { src: IMG.carOnRoad, alt: "Premium airport sedan" },
    ],
    faqs: baseFaqs,
    badge: "24x7",
    reviews: [
      {
        ...REVIEWS_POOL[1],
        name: "Priya Patil",
        text: "My flight landed 40 minutes early and the driver was still waiting at the gate. Seamless airport pickup!",
      },
    ],
    seoTitle: "Shirdi Airport Taxi | Pickup & Drop from ₹600",
    seoDescription:
      "24x7 Shirdi airport taxi with meet & greet, baggage help and zero waiting charge. AC car pickups from ₹600.",
  },
  {
    slug: "shirdi-railway-station",
    name: "Shirdi Railway Station Pickup",
    destination: "Sainagar Shirdi Station",
    route: "Station ⇔ Shirdi & Hotel",
    category: "Local",
    distance: "6 KM",
    duration: "15 Min",
    price: "₹400",
    priceNum: 400,
    roundTrip: "₹750",
    description:
      "Instant taxi from the station to any address in and around Shirdi.",
    longDescription:
      "Arriving by the Sainagar Shirdi train? Skip the station touts and book your clean AC car while the train is still running. We track your arrival rail, wait at the platform and drop you to your hotel, the Sai temple or any local address - all for a simple flat fare.",
    included: [
      "Live train tracking",
      "Door-to-door service",
      "AC car with local driver",
      "Baggage space",
    ],
    notIncluded: [],
    highlights: [
      "Tracks your train arrival",
      "Door-to-door service",
      "One flat affordable fare",
    ],
    image: IMG.shirdiStation,
    imageAlt: "Sainagar Shirdi railway station with taxi",
    gallery: [
      { src: IMG.shirdiStation, alt: "Sainagar Shirdi railway station" },
      { src: IMG.saiShirdi, alt: "Sai temple near the station" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        ...REVIEWS_POOL[2],
        name: "Amit Deshmukh",
        text: "Arrived at 7 am, the cab was waiting at the station. ₹400 flat, clean car, and we were at the temple in minutes.",
      },
    ],
    seoTitle: "Sainagar Shirdi Railway Station Taxi | from ₹400",
    seoDescription:
      "Instant taxi from Sainagar Shirdi railway station to anywhere in Shirdi. Train-tracked pickup from ₹400, available 24x7.",
  },
  {
    slug: "local-shirdi-darshan",
    name: "Local Shirdi Darshan",
    destination: "Shirdi Temple Circuit",
    route: "Full Temple Circuit",
    category: "Local",
    distance: "40 KM",
    duration: "8 Hours",
    price: "₹2,200",
    priceNum: 2200,
    roundTrip: "₹2,200",
    description:
      "The full-day Shirdi darshan in a quiet, private car at your pace.",
    longDescription:
      "Your private car for a complete day of devotion - Dwarkamai, Chavadi, the Samadhi Mandir and the peaceful Lendi gardens. Our chauffeur keeps the car waiting warmly whenever you are in prayer and follows your plan exactly, so the darshan ends only when you are ready.",
    included: [
      "Car for the whole day",
      "Fuel Included",
      "All temple stops",
      "Hotel pickup & drop",
    ],
    notIncluded: ["Private seers / prasad charges"],
    highlights: [
      "Dwarkamai & Chavadi",
      "Samadhi darshan",
      "Your plan, your pace",
    ],
    image: IMG.saiShirdi,
    imageAlt: "Sai Baba Samadhi Mandir, Shirdi local darshan",
    gallery: [
      { src: IMG.saiShirdi, alt: "Sai Baba Samadhi Mandir" },
      { src: IMG.saiPortrait, alt: "Shirdi temple sanctum" },
      { src: IMG.carOnRoad, alt: "Local darshan car" },
    ],
    faqs: baseFaqs,
    badge: "Best Seller",
    reviews: [
      {
        ...REVIEWS_POOL[3],
        name: "Sneha Kulkarni",
        text: "The all-day darshan plan was wonderfully flexible. The driver knew every temple and was so thoughtful with my grandparents.",
      },
      {
        ...REVIEWS_POOL[0],
        name: "Rahul Sharma",
        text: "Perfect for elderly parents - he steadied them at each step and waited quietly during every prayer.",
      },
    ],
    seoTitle: "Shirdi Local Darshan Taxi | Full-Day from ₹2,200",
    seoDescription:
      "Full-day Shirdi darshan tour by private car covering Dwarkamai, Chavadi, Samadhi & more on your schedule from ₹2,200.",
  },
  {
    slug: "custom-tour",
    name: "Custom Tour Package",
    destination: "Any Destination",
    route: "Custom Multi-Halt",
    category: "Weekend Trips",
    distance: "Flexible",
    duration: "Multi-Day",
    price: "Custom",
    priceNum: 0,
    roundTrip: "Custom",
    description:
      "Design your own multi-city, multi-day itinerary with our planners.",
    longDescription:
      "Thinking bigger than a single route? Plan a private multi-city, multi-day journey across Maharashtra - a wedding circuit, a family reunion drive or a complete Western Ghats pilgrimage. We route-plan with you, recommend the ideal car from our fleet and give one clear, transparent, all-inclusive price before you book.",
    included: [
      "Free route planning",
      "Best-car recommendation",
      "Transparent quote",
      "Multi-day driver",
    ],
    notIncluded: [],
    highlights: [
      "Tailor-made routing",
      "Full fleet of options",
      "One all-inclusive price",
    ],
    image: IMG.carSport,
    imageAlt: "Premium car for a custom tour from Shirdi",
    gallery: [
      { src: IMG.carSport, alt: "Premium sedan" },
      { src: IMG.mountain, alt: "Hill station tour road" },
      { src: IMG.aurangabad, alt: "Heritage stop" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        ...REVIEWS_POOL[4],
        name: "Vikram Joshi",
        text: "Built a custom 3-day circuit through three cities. Everything ran like clockwork and the bill was exactly the quote.",
      },
    ],
    seoTitle: "Custom Multi-Day Taxi Tours From Shirdi",
    seoDescription:
      "Plan a custom multi-city taxi tour from Shirdi - tailor-made routes, premium cars and one transparent all-inclusive quote.",
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