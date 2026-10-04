"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/38349833888?text=Hello!%20I%20am%20interested%20in%20your%20travel%20offers."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/10 transition hover:scale-105 hover:bg-[#1ebe5b] sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp size={26} aria-hidden="true" />

      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  );
}