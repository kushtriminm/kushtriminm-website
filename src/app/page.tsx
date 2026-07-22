import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import FollowInstagram from "@/components/home/FollowInstagram";
import ContactBanner from "@/components/home/ContactBanner";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedOffers />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <FollowInstagram />
      <FeaturedDestinations />
      <ContactBanner />
      <Footer />
      <WhatsAppButton />
    </>
  );
}