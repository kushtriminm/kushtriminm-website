
import Hero from "@/components/home/Hero";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import FollowInstagram from "@/components/home/FollowInstagram";
import ContactBanner from "@/components/home/ContactBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedOffers />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <FollowInstagram />
      <FeaturedDestinations />
      <ContactBanner />
    </>
  );
}