import { hotelPricing, allBoards, type Board } from "@/data/hotel-pricing";

const DAY = 86400000;

function toMs(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function toISO(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(date: string, days: number) {
  return toISO(toMs(date) + days * DAY);
}

export function listNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return [];
  const nights: string[] = [];
  for (let t = toMs(checkIn); t < toMs(checkOut); t += DAY) {
    nights.push(toISO(t));
  }
  return nights;
}

export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}.${m}.${y}`;
}

// The services a hotel sells.
export function boardsFor(slug: string): Board[] {
  const pricing = hotelPricing[slug];
  if (!pricing) return allBoards;
  if (pricing.boards && pricing.boards.length > 0) return pricing.boards;

  const found = new Set<Board>();
  pricing.seasons.forEach((season) => {
    (Object.keys(season.prices) as Board[]).forEach((b) => found.add(b));
  });
  return found.size > 0 ? allBoards.filter((b) => found.has(b)) : allBoards;
}

// Lowest adult price per night, shown on the hotel card (only if prices exist).
export function fromPrice(slug: string): number | null {
  const pricing = hotelPricing[slug];
  if (!pricing) return null;

  const prices = pricing.seasons
    .flatMap((season) => Object.values(season.prices))
    .filter((p): p is number => typeof p === "number");

  return prices.length > 0 ? Math.min(...prices) : null;
}

export type Quote =
  | {
      ok: true;
      total: number;
      nights: number;
      adultsTotal: number;
      childrenTotal: number;
    }
  | {
      ok: false;
      problem:
        | "dates"
        | "noPrices"
        | "outOfSeason"
        | "board"
        | "minNights"
        | "blocked";
      minNights?: number;
    };

export function calcQuote(
  slug: string,
  board: Board,
  checkIn: string,
  checkOut: string,
  adults: number,
  childAges: number[]
): Quote {
  const nights = listNights(checkIn, checkOut);
  if (nights.length === 0) return { ok: false, problem: "dates" };

  const pricing = hotelPricing[slug];
  if (!pricing || pricing.seasons.length === 0) {
    return { ok: false, problem: "noPrices" };
  }

  if (
    pricing.blocked?.some((b) => nights.some((n) => n >= b.from && n <= b.to))
  ) {
    return { ok: false, problem: "blocked" };
  }

  let adultsTotal = 0;
  let childrenTotal = 0;

  for (const night of nights) {
    const season = pricing.seasons.find(
      (s) => night >= s.from && night <= s.to
    );
    if (!season) return { ok: false, problem: "outOfSeason" };

    const adultPrice = season.prices[board];
    if (adultPrice === undefined) return { ok: false, problem: "board" };

    if (
      night === nights[0] &&
      season.minNights &&
      nights.length < season.minNights
    ) {
      return { ok: false, problem: "minNights", minNights: season.minNights };
    }

    adultsTotal += adults * adultPrice;

    for (const age of childAges) {
      const rule = pricing.childRules?.find(
        (r) => age >= r.fromAge && age <= r.toAge
      );

      if (!rule) childrenTotal += adultPrice;
      else if (rule.type === "fixed") childrenTotal += rule.value ?? 0;
      else if (rule.type === "percent") {
        childrenTotal += (adultPrice * (rule.value ?? 100)) / 100;
      }
    }
  }

  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    ok: true,
    nights: nights.length,
    adultsTotal: round(adultsTotal),
    childrenTotal: round(childrenTotal),
    total: round(adultsTotal + childrenTotal),
  };
}