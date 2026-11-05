"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "sq" | "en";

// The language a visitor sees when we cannot tell (and on the server). Change "en" to "sq" to start in Albanian.
export const DEFAULT_LANG: Lang = "en";

// Time zones where we show Albanian first. Add or remove zones here.
const ALBANIAN_ZONES = ["Europe/Belgrade", "Europe/Pristina", "Europe/Tirane", "Europe/Skopje"];

const KEY = "kushtrimi-lang";
const EVENT = "kushtrimi-lang-change";

// 1) the visitor's own choice, 2) Albanian browser or time zone, 3) the default.
function read(): Lang {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "sq" || saved === "en") return saved;
  } catch {
    // Storage can be blocked, so we fall through to the automatic choice.
  }

  try {
    const langs = [...(navigator.languages ?? []), navigator.language];
    if (langs.some((l) => l && l.toLowerCase().startsWith("sq"))) return "sq";
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone && ALBANIAN_ZONES.includes(zone)) return "sq";
  } catch {
    // Old browsers: keep the default.
  }

  return DEFAULT_LANG;
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore<Lang>(subscribe, read, () => DEFAULT_LANG);

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Storage can be blocked; the page still works in the chosen language until reload.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}