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

// The language a first-time visitor sees. Change "en" to "sq" to start in Albanian.
export const DEFAULT_LANG: Lang = "en";

const KEY = "kushtrimi-lang";
const EVENT = "kushtrimi-lang-change";

function read(): Lang {
  try {
    const saved = window.localStorage.getItem(KEY);
    return saved === "sq" || saved === "en" ? saved : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
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
      // Storage can be blocked; the page still works in the default language.
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