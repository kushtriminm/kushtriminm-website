import Hero from "@/components/home/Hero";
import GuidedTours from "@/components/tours/GuidedTours";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Testimonials from "@/components/home/Testimonials";
import FollowInstagram from "@/components/home/FollowInstagram";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <main>
      <Hero />

      <div id="udhetime" className="scroll-mt-20">
        <GuidedTours />
      </div>

      <FeaturedDestinations />
      <Testimonials />
      <FollowInstagram />
      <Location />
    </main>
  );
}