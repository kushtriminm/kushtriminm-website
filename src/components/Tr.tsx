"use client";

import { useLang } from "./LanguageProvider";

// Shows the Albanian or the English text, depending on the language chosen in the menu.
export default function Tr({ sq, en }: { sq: string; en: string }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : sq}</>;
}