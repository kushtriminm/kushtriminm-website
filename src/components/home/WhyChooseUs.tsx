import { MessageCircle, Plane, ShieldCheck, Check } from "lucide-react";

// Edit the four reasons here. Keep them true: they are what customers say about you.
const reasons = [
  {
    icon: MessageCircle,
    title: "Përgjigje e shpejtë",
    text: "Na shkruaj në WhatsApp, na telefono ose na vizito në zyrë. Të përgjigjemi shpejt dhe me durim.",
  },
  {
    icon: ShieldCheck,
    title: "Transparencë e plotë",
    text: "Çmimet, kushtet dhe pagesat shtesë të shpjegohen qartë që në fillim, pa surpriza.",
  },
  {
    icon: Check,
    title: "Gjithçka e rregulluar",
    text: "Fluturime, hotele dhe udhëtime me autobus, të organizuara nga një vend i vetëm.",
  },
  {
    icon: Plane,
    title: "Kudo në botë",
    text: "Nga qytetet evropiane te plazhet e verës, të ndihmojmë të gjesh udhëtimin e duhur.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black px-5 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase text-red-500">Pse ne?</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-5xl">
            Pse të udhëtosh me ne
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 lg:grid-cols-4 lg:gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] sm:p-7"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 transition duration-300 group-hover:from-red-600/10" />

                <span className="absolute -right-1 -top-3 text-7xl font-black text-white/[0.04] transition group-hover:text-red-500/10 sm:text-8xl">
                  0{index + 1}
                </span>

                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] sm:h-12 sm:w-12">
                  <Icon size={22} />
                </span>

                <h3 className="relative mt-5 text-base font-extrabold uppercase leading-tight tracking-wide text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}