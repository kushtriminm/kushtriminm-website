"use client";

import { useLang, type Lang } from "./LanguageProvider";

const options: Lang[] = ["sq", "en"];

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Gjuha / Language"
      className={`inline-flex rounded-full border border-white/20 p-0.5 text-xs font-bold ${className}`}
    >
      {options.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`min-w-[40px] rounded-full px-2.5 py-1.5 transition ${
            lang === l ? "bg-red-600 text-white" : "text-gray-300 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}