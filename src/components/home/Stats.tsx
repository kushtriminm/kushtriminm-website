import { MapPin } from "lucide-react";

// Edit the hours here. No other code needs to change.
const hours = [
  { days: "Mon - Fri", time: "09:00 - 19:00" },
  { days: "Saturday", time: "09:00 - 18:00" },
  { days: "Sunday", time: "Closed" },
];

export default function Stats() {
  return (
    <section className="bg-black px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl rounded-3xl bg-neutral-900/60 px-6 py-8 text-center sm:px-10 sm:py-10">
        <MapPin
          className="mx-auto text-red-500"
          size={22}
          aria-hidden="true"
        />

        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
          Visit our office
        </p>

        <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
          Xheladin Hana, Gjakov&euml;
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-sm sm:gap-6">
          {hours.map((item) => (
            <div key={item.days}>
              <dt className="text-gray-400">{item.days}</dt>
              <dd className="mt-1 font-semibold text-white">{item.time}</dd>
            </div>
          ))}
        </dl>

        <a
          href="https://www.google.com/maps/search/?api=1&query=42.3768706,20.4321499"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-red-500 transition hover:text-red-400"
        >
          Get directions &rarr;
        </a>
      </div>
    </section>
  );
}