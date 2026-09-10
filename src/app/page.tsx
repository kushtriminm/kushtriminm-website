
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import HotelsPreview from "@/components/home/HotelsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import FollowInstagram from "@/components/home/FollowInstagram";
import ContactBanner from "@/components/home/ContactBanner";

export default function Home() {
  return (
    <>
      <Hero />

      <Stats />

      <FeaturedDestinations />

      <HotelsPreview />

      <WhyChooseUs />

      <Testimonials />

      <FollowInstagram />

      <ContactBanner />
    </>
  );
}