"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronRight, HelpCircle, Phone, Search, X } from "lucide-react";
import { FaViber, FaWhatsapp } from "react-icons/fa";
import { faqs } from "@/data/faq";
import { useLang } from "./LanguageProvider";

// All the words here, in both languages. Change them here.
const labels = {
  sq: {
    open: "Pyetje të shpeshta",
    title: "Si mund të të ndihmojmë?",
    placeholder: "Shkruaj pyetjen tënde...",
    close: "Mbyll",
    back: "Kthehu",
    none: "Nuk kemi një përgjigje të gatshme për këtë. Na shkruaj ose na telefono dhe të ndihmojmë menjëherë.",
    help: "Ende të duhet ndihmë?",
    call: "Telefono",
    waMessage: "Përshëndetje! Kam një pyetje",
  },
  en: {
    open: "Frequently asked questions",
    title: "How can we help you?",
    placeholder: "Type your question...",
    close: "Close",
    back: "Back",
    none: "We don't have a ready answer for this. Message or call us and we will help you straight away.",
    help: "Still need help?",
    call: "Call",
    waMessage: "Hello! I have a question",
  },
};

// Very common words that should not decide a match.
const skip = new Set([
  "the", "and", "for", "are", "can", "how", "what", "does", "with", "you",
  "per", "dhe", "mund", "une", "dua", "nga", "qe", "cfare", "ose", "nje", "si", "ka",
]);

function norm(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function Contact({ text, lang }: { text: string; lang: "sq" | "en" }) {
  const t = labels[lang];
  const wa = `https://wa.me/38349833888?text=${encodeURIComponent(text ? `${t.waMessage}: ${text}` : t.waMessage)}`;
  const base =
    "flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-bold text-white transition";

  return (
    <div className="flex flex-wrap gap-2">
      <a href={wa} target="_blank" rel="noopener noreferrer" className={`${base} bg-green-600 hover:bg-green-700`}>
        <FaWhatsapp size={16} />
        WhatsApp
      </a>
      <a href="viber://chat?number=%2B38349833888" className={`${base} bg-purple-600 hover:bg-purple-700`}>
        <FaViber size={16} />
        Viber
      </a>
      <a href="tel:+38349833888" className={`${base} border border-white/30 hover:bg-white hover:text-black`}>
        <Phone size={16} />
        {t.call}
      </a>
    </div>
  );
}

export default function FaqAssistant() {
  const { lang } = useLang();
  const t = labels[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    setActive(null);
    setQuery("");
  }

  const terms = norm(query)
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !skip.has(w));

  const list = faqs
    .map((item, index) => {
      const hay = norm(`${item.q.sq} ${item.q.en} ${item.keywords}`);
      const score = terms.filter((w) => hay.includes(w)).length;
      return { item, index, score };
    })
    .filter((x) => terms.length === 0 || x.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const current = active !== null ? faqs[active] : null;

  return (
    <>
      <button
        type="button"
        aria-label={t.open}
        onClick={() => setOpen(true)}
        className={`fixed left-4 z-40 bottom-[calc(1rem_+_env(safe-area-inset-bottom))] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-neutral-900/90 text-white shadow-lg backdrop-blur transition duration-300 hover:border-red-500 hover:bg-red-600 ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        tabIndex={visible ? 0 : -1}
      >
        <HelpCircle size={22} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.open}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="fixed inset-0 z-[55]"
        >
          <div className="absolute inset-0 bg-black/60 sm:bg-transparent" onClick={close} />

          <div className="absolute inset-x-3 bottom-3 flex max-h-[82svh] flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[24rem]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              {current ? (
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="flex min-h-[44px] items-center gap-2 text-sm font-bold text-gray-300 hover:text-white"
                >
                  <ArrowLeft size={16} />
                  {t.back}
                </button>
              ) : (
                <p className="min-w-0 text-balance text-sm font-extrabold uppercase tracking-wide">{t.title}</p>
              )}
              <button
                type="button"
                aria-label={t.close}
                onClick={close}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {current ? (
              <div className="overflow-y-auto p-4">
                <p className="break-words font-bold text-white">{current.q[lang]}</p>
                <p className="mt-3 break-words text-sm leading-6 text-gray-300">{current.a[lang]}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-gray-500">{t.help}</p>
                <div className="mt-2">
                  <Contact text={current.q[lang]} lang={lang} />
                </div>
              </div>
            ) : (
              <>
                <div className="relative border-b border-white/10 p-3">
                  <Search size={16} className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.placeholder}
                    aria-label={t.placeholder}
                    autoComplete="off"
                    className="min-h-[44px] w-full rounded-xl bg-black pl-9 pr-3 text-base text-white outline-none placeholder:text-gray-600 focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div className="overflow-y-auto p-2">
                  {list.length === 0 ? (
                    <div className="p-3">
                      <p className="text-sm text-gray-300">{t.none}</p>
                      <div className="mt-4">
                        <Contact text={query} lang={lang} />
                      </div>
                    </div>
                  ) : (
                    <ul>
                      {list.map(({ item, index }) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => setActive(index)}
                            className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-white/5 hover:text-white"
                          >
                            <span className="min-w-0 break-words">{item.q[lang]}</span>
                            <ChevronRight size={16} className="shrink-0 text-red-500" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {list.length > 0 && (
                  <div className="border-t border-white/10 p-3">
                    <Contact text={query} lang={lang} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}