import type { Metadata } from "next";
import RequestForm from "@/components/booking/RequestForm";

export const metadata: Metadata = {
  title: "Rezervo | Kushtrimi NM Worldwide",
  description:
    "Zgjidh destinacionin, hotelin dhe datat, dhe kërko ofertë. Çmimet dhe vendet e lira i konfirmojmë ne në WhatsApp.",
};

// All the words on this page. Change them here.
const labels = {
  eyebrow: "Rezervo",
  heading: "Kërko ofertë",
  intro:
    "Zgjidh destinacionin, hotelin dhe datat. Rezervimet i konfirmojmë ne personalisht, me çmimin final në WhatsApp.",
};

export default function BookPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden px-5 pb-6 pt-32 text-center sm:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[30rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase text-red-500">{labels.eyebrow}</p>
          <h1 className="mt-3 text-2xl font-bold uppercase tracking-wide sm:text-4xl">{labels.heading}</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">{labels.intro}</p>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-2xl ">
          <RequestForm />
        </div>
      </section>
    </main>
  );
}