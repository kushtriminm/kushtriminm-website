"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/38349833888?text=Hello!%20I%20am%20interested%20in%20your%20travel%20offers."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 hover:bg-green-600"
    >
      <MessageCircle size={32} />
    </a>
  );
}