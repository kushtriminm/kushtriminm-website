import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FollowInstagram from "@/components/home/FollowInstagram";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedDestinations />

      <WhyChooseUs />

      <Testimonials />

      <FollowInstagram />

      <Location />
    </>
  );
}