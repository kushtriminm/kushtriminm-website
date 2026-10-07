import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Quote } from "lucide-react";
import LightUp from "@/components/LightUp";

export const metadata: Metadata = {
  title: "Rreth nesh | Kushtrimi NM Worldwide",
  description:
    "Mbi 30 vjet pranë jush, në çdo udhëtim. Nga autobusët te fluturimet, hotelet dhe pushimet në mbarë botën.",
};

// Optional team photo, e.g. "/images/about/team.jpg" (file goes in public/images/about/).
// Leave as "" to hide it.
const teamPhoto = "" as string;

// All the words on this page. Edit them here.
const labels = {
  eyebrow: "Rreth nesh",
  title1: "Mbi 30 vjet pranë jush,",
  title2: "në çdo udhëtim",
  thanks: "Faleminderit që na besoni udhëtimin tuaj!",
  whatsapp: "Na shkruaj në WhatsApp",
  destinations: "Shiko destinacionet",
};

const story = [
  "Historia e agjencisë sonë lindi nga pasioni për rrugën dhe besimi i klientëve tanë ndër vite. Për më shumë se tre dekada, kemi kuptuar një gjë të thjeshtë: një udhëtim i bukur nuk matet vetëm me kilometra, por me kujtimet që lë pas.",
  "Ajo që nisi dikur me udhëtime tokësore, sot është shndërruar në një dritare të hapur drejt gjithë botës. Me fluturime ndërkombëtare, hotele të zgjedhura me kujdes dhe ture të organizuara me autobus, ne jemi këtu për t'ju lidhur me destinacione të reja dhe përvoja që mbeten gjatë në kujtesë.",
  "Sepse pas çdo bilete apo rezervimi që ju bëni, ne shohim një ëndërr, një familje dhe një pushim që meriton të jetë i përsosur.",
];

export default function AboutPage() {
  return (
    <main className="relative overflow-x-clip bg-black text-white">
      {/* Soft glows, free to fade out (not clipped by a section) */}
      <div className="pointer-events-none absolute left-1/2 top-16 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[34rem] h-96 w-[30rem] -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />

      {/* Heading */}
      <section className="relative px-5 pb-10 pt-36 text-center sm:pb-14 sm:pt-44">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase text-red-500">
            {labels.eyebrow}
          </p>
          <h1 className="mt-3 text-2xl font-bold uppercase leading-[1.25] tracking-wide sm:text-4xl">
            {labels.title1}
            <br />
            <span className="text-red-500">{labels.title2}</span>
          </h1>
        </div>
      </section>

      {/* Optional team photo */}
      {teamPhoto && (
        <section className="relative px-5 pb-10">
          <div className="relative mx-auto aspect-[16/9] max-w-3xl overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={teamPhoto}
              alt="Ekipi i Kushtrimi NM Worldwide"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Story card */}
      <section className="relative px-5 pb-12 sm:pb-16">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 px-6 py-10 shadow-[0_0_60px_rgba(220,38,38,0.12)] sm:px-12 sm:py-14">
          <Quote
            className="absolute right-5 top-5 text-red-500/15"
            size={72}
            aria-hidden="true"
          />

          <div className="relative space-y-6 text-base leading-8 text-gray-400 sm:text-lg sm:leading-9">
            {story.map((paragraph) => (
  <LightUp key={paragraph}>{paragraph}</LightUp>
))}
          </div>
        </div>
      </section>

      {/* Thank you */}
      <section className="relative px-5 pb-12 text-center sm:pb-16">
        <div className="mx-auto max-w-xl">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
            <Heart size={22} aria-hidden="true" />
          </span>
          <p className="mt-6 text-xl font-bold uppercase leading-snug tracking-wide text-white sm:text-2xl">
            {labels.thanks}
          </p>
        </div>
      </section>

      {/* Buttons */}
      <section className="relative px-5 pb-24 text-center sm:pb-32">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-9 py-3.5 font-bold transition hover:bg-red-700 sm:w-auto"
          >
            <MessageCircle size={18} />
            {labels.whatsapp}
          </a>
          <Link
            href="/destinations"
            className="w-full rounded-full border border-white/30 px-9 py-3.5 text-center font-bold transition hover:bg-white hover:text-black sm:w-auto"
          >
            {labels.destinations}
          </Link>
        </div>
      </section>
    </main>
  );
}