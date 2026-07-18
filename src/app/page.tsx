import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import ContactBanner from "@/components/home/ContactBanner";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <ContactBanner />
      <Footer />
      <WhatsAppButton />
    </>
  );
}