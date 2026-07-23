
import Hero from "@/components/home/Hero";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import FollowInstagram from "@/components/home/FollowInstagram";
import ContactBanner from "@/components/home/ContactBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedOffers />
      <WhyChooseUs />
      <Testimonials />
      <Stats />
      <FollowInstagram />
      <FeaturedDestinations />
      <ContactBanner />
    </>
  );
}