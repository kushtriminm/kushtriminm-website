"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPercentage =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setVisible(scrollPercentage >= 20);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/38349833888?text=Hello!%20I%20would%20like%20more%20information."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-green-500 px-5 py-3 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-green-600 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      <span className="text-xl">💬</span>

      <span className="hidden font-semibold sm:inline">
        Need Help?
      </span>
    </a>
  );
}