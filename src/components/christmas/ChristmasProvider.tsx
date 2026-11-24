"use client";

import { createContext, useContext } from "react";

// Whether the site shows its Christmas look (logo, lights, snow).
// The layout decides it on the server from the dates in src/lib/season.ts.
const ChristmasContext = createContext(false);

export function ChristmasProvider({ on, children }: { on: boolean; children: React.ReactNode }) {
  return <ChristmasContext.Provider value={on}>{children}</ChristmasContext.Provider>;
}

export function useChristmas() {
  return useContext(ChristmasContext);
}
