import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MostBookedRoutes from "@/components/MostBookedRoutes";
import FeaturedPackages from "@/components/FeaturedPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/AboutUs";
import ReviewsPreview from "@/components/ReviewsPreview";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
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
