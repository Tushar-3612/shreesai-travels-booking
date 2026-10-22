"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DestinationSection from "@/components/DestinationSection";
import MostBookedRoutes from "@/components/MostBookedRoutes";
import FeaturedPackages from "@/components/FeaturedPackages";
import OurVehicles from "@/components/OurVehicles";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import ReviewsPreview from "@/components/ReviewsPreview";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  return (
    <>
      <Navbar />
      <Hero
        selectedDestination={selectedDestination}
        onDestinationChange={(name) => setSelectedDestination(name)}
      />
      <DestinationSection onSelectDestination={(name) => setSelectedDestination(name)} />
      <OurVehicles />
      <MostBookedRoutes />
      <FeaturedPackages />
      <WhyChooseUs preview />
      <AboutUs preview />
      <ReviewsPreview />
      <Gallery />
      <Footer />
    </>
  );
}

