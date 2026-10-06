import { Quote, Star } from "lucide-react";

// Real Google reviews, copied exactly as written. To add one, copy a block.
const reviews = [
  {
    name: "Vanesa K.",
    trip: "Shqipëri",
    lang: "sq",
    text: "Sherbim shum i mir nga fillimi deri në fund! Staf korrekt, komunikim shum i mir . Jam shum e kenaqur dhe padyshim do ti zgjidhja perseri per udhetimet e ardhshme. ❤️",
  },
  {
    name: "Soara R.",
    trip: "Budapest",
    lang: "sq",
    text: "Shume e kenaqur per profesionalizmin e Kushtrim NM 🙌🏻🙌🏻",
  },
  {
    name: "Flora R.",
    trip: "Turqi",
    lang: "en",
    text: "Arranged many trips with them and always had the best experiences. They respond to all the questions you have regarding the trip and are always available to help for everything the costumer needs🙏🏻 highly recommend booking trips with them☺️",
  },
  {
    name: "Atdhe B.",
    trip: "Gjermani",
    lang: "en",
    text: "It was a pleasure working with your agency. A big thank you to Kushtrimi-NM Worldwide for their transparency and professionalism.",
  },
  {
    name: "Arianit K.",
    trip: "Egjipt",
    lang: "en",
    text: "Excellent experience! Friendly staff, fast communication, and everything was handled perfectly. Thank you!",
  },
  {
    name: "Tatiana V.",
    trip: "Maltë",
    lang: "pt",
    text: "Melhor atendimento !! Faz a diferença ter uma agência qualificada e um atendimento diferenciado. Amei!",
  },
];

const GOOGLE_LISTING = "https://maps.app.goo.gl/tMp9PKN37FJ7hCEXA";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-14 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase text-red-500">
            Vlerësime nga Google
          </p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
  Klientë të kënaqur.
</h2>
        </div>

        {/* Phone: swipe sideways. Desktop: 3-column grid. */}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {reviews.map((item) => (
            <div
              key={item.name}
              className="group relative flex w-[84%] shrink-0 snap-center flex-col rounded-[28px] border border-white/10 bg-neutral-900/70 p-6 transition hover:-translate-y-1 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] md:w-auto md:p-8"
            >
              <Quote
                className="absolute right-6 top-6 text-red-500/30"
                size={40}
              />

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-red-500 text-red-500"
                  />
                ))}
              </div>

              <p
                lang={item.lang}
                className="mt-5 flex-1 text-base leading-7 text-gray-300"
              >
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">&#9992; {item.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-1 text-center text-xs text-gray-500 md:hidden">
          Swipe for more &rarr;
        </p>

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_LISTING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-white/30 px-8 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
          >
            Shiko të gjitha vlerësimet në Google
          </a>
        </div>
      </div>
    </section>
  );
}