import Hero from "@/components/home/Hero";
import GuidedTours from "@/components/tours/GuidedTours";
import ChristmasTrips from "@/components/home/ChristmasTrips";
import Testimonials from "@/components/home/Testimonials";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import EarlyBooking from "@/components/home/EarlyBooking";
import FollowInstagram from "@/components/home/FollowInstagram";
import Location from "@/components/home/Location";
import MomentOffers from "@/components/home/MomentOffers";
import { getMomentOffers } from "@/lib/live";
import { randomHeroImage } from "@/data/hero-images";

export default async function Home() {
  // Offers of the moment from the agent panel (the row hides itself when there are none).
  const momentOffers = await getMomentOffers();

  return (
    <main>
      {/* The page opens on a random photo (a new pick each time the page refreshes, every minute) */}
      <Hero firstImage={randomHeroImage()} />

      <MomentOffers offers={momentOffers} variant="home" />

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