import Hero from "@/components/home/Hero";
import BusTours from "@/components/home/BusTours";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FollowInstagram from "@/components/home/FollowInstagram";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <main>
      <Hero />

      <div id="udhetime" className="scroll-mt-20">
        <BusTours />
      </div>

      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <FollowInstagram />
      <Location />
    </main>
  );
}