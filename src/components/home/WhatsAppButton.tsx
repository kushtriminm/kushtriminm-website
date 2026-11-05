"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { useLang } from "@/components/LanguageProvider";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    tooltip: "Na shkruaj në WhatsApp",
    message: "Përshëndetje! Dua më shumë informacione.",
  },
  en: {
    tooltip: "Chat with us on WhatsApp",
    message: "Hello! I would like more information.",
  },
};

// Pages where the floating button is hidden (they already have their own WhatsApp button).
const hiddenOn = ["/book"];

export default function WhatsAppButton() {
  const pathname = usePathname();
  const { lang } = useLang();
  const t = labels[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hiddenOn.includes(pathname)) return null;

  return (
    <a
      href={`https://wa.me/38349833888?text=${encodeURIComponent(t.message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.tooltip}
      className={`group fixed right-4 z-40 bottom-[calc(1rem_+_env(safe-area-inset-bottom))] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-neutral-900/90 text-green-500 shadow-lg backdrop-blur transition duration-300 hover:border-green-500 hover:bg-green-500 hover:text-white ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaWhatsapp size={24} />

      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        {t.tooltip}
      </span>
    </a>
  );
}