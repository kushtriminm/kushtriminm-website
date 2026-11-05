import Hero from "@/components/home/Hero";
import GuidedTours from "@/components/tours/GuidedTours";
import ChristmasTrips from "@/components/home/ChristmasTrips";
import Testimonials from "@/components/home/Testimonials";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import EarlyBooking from "@/components/home/EarlyBooking";
import FollowInstagram from "@/components/home/FollowInstagram";
import Location from "@/components/home/Location";

export default function Home() {
  return (
    <main>
      <Hero />

      <div id="udhetime" className="scroll-mt-20">
        <GuidedTours />
      </div>

      <ChristmasTrips />
      <Testimonials />
      <FeaturedDestinations />
      <EarlyBooking />
      <FollowInstagram />
      <Location />
    </main>
  );
}