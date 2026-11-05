import { useSyncExternalStore } from "react";

function getToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const subscribe = () => () => {};

export function useToday() {
  return useSyncExternalStore(subscribe, getToday, getToday);
}

export const dayMonth = (date: string) => date.split("-").reverse().slice(0, 2).join(".");
export const fullDate = (date: string) => date.split("-").reverse().join(".");
export const euro = (n: number) => `${n}€`;
export const whatsappLink = (text: string) =>
  `https://wa.me/38349833888?text=${encodeURIComponent(text)}`;