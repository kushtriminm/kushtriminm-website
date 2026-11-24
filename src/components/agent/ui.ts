// Shared looks for the agent panel.
export const field =
  "w-full min-h-[44px] rounded-xl border border-white/15 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none";
export const label = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-400";
export const card = "rounded-2xl border border-white/10 bg-neutral-900 p-4 sm:p-6";
export const btnRed =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50";
export const btnLine =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-black disabled:opacity-50";
export const btnGhost =
  "inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-3 text-sm font-bold text-gray-300 transition hover:bg-white/10 hover:text-white";

// "2026-11-24T15:30" (what a date-time box shows, in local time) <-> ISO time.
export function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export function fromLocalInput(value: string) {
  return new Date(value).toISOString();
}

export function niceDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
