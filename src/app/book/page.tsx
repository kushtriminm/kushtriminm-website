import type { Metadata } from "next";
import BookButton from "@/components/booking/BookButton";
import BookingModal from "@/components/booking/BookingModal";
import RequestForm from "@/components/booking/RequestForm";

export const metadata: Metadata = {
  title: "Rezervo | Kushtrimi NM Worldwide",
  description:
    "Zgjidh hotelin ose destinacionin dhe kërko ofertë. Çmimet dhe vendet e lira i konfirmojmë ne në WhatsApp.",
};

// All the words on this page. Change them here.
const labels = {
  eyebrow: "Rezervo",
  heading: "Kërko ofertë",
  intro:
    "Rezervimet i konfirmojmë ne personalisht. Zgjidh çfarë të duhet dhe na dërgo kërkesën në WhatsApp, me të gjitha detajet gati.",
  hotelTitle: "Kam zgjedhur një hotel",
  hotelText:
    "Zgjidh hotelin nga lista (Shqipëri, Turqi, Egjipt), datat dhe numrin e personave. Ku kemi çmimet, të shfaqim totalin orientues.",
  hotelButton: "Zgjidh hotelin",
  otherTitle: "Çdo destinacion tjetër",
  otherText: "Dubai, qytete evropiane, Greqi ose kudo që dëshiron. Na tregon dhe e gjejmë ofertën.",
};

export default function BookPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-5 pb-8 pt-36 text-center sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase text-red-500">{labels.eyebrow}</p>
          <h1 className="mt-3 text-2xl font-bold uppercase tracking-wide sm:text-4xl">{labels.heading}</h1>
          <p className="mx-auto mt-5 max-w-xl text-gray-300">{labels.intro}</p>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="rounded-3xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold uppercase tracking-wide">{labels.hotelTitle}</h2>
            <p className="mt-2 text-sm text-gray-400">{labels.hotelText}</p>
            <BookButton className="mt-5 w-full rounded-full bg-red-600 py-3.5 font-bold text-white transition hover:bg-red-700">
              {labels.hotelButton}
            </BookButton>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold uppercase tracking-wide">{labels.otherTitle}</h2>
            <p className="mb-6 mt-2 text-sm text-gray-400">{labels.otherText}</p>
            <RequestForm />
          </div>
        </div>
      </section>

      <BookingModal />
    </main>
  );
}