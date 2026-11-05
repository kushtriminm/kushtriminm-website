"use client";

import type { ReactNode } from "react";
import { useLang } from "./LanguageProvider";

// A WhatsApp link whose pre-written message follows the chosen language.
export default function WhatsAppLink({
  sq,
  en,
  className,
  children,
}: {
  sq: string;
  en: string;
  className?: string;
  children: ReactNode;
}) {
  const { lang } = useLang();
  const text = lang === "en" ? en : sq;

  return (
    <a
      href={`https://wa.me/38349833888?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}