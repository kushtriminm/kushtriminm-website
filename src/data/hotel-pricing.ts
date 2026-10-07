// Prices and rules for the booking pop-up.
// One entry per hotel, using the same "slug" as in hotels.ts.
// A hotel with no entry shows "ask for an offer" and still sends the request to WhatsApp.
//
// HOW TO ADD A HOTEL:
//  - boards: the services the hotel sells (ro, bb, hb, fb, ai). Can be filled in before prices.
//  - seasons: the price for ONE ADULT PER NIGHT, for each service, between two dates.
//    "from" and "to" are the first and last night of the season, as "YYYY-MM-DD".
//    Delete a season when it has passed.
//  - childRules: child prices by age. The first matching rule is used.
//      { fromAge: 0, toAge: 3, type: "free" }
//      { fromAge: 4, toAge: 11, type: "fixed", value: 45 }      // 45 EUR per night
//      { fromAge: 4, toAge: 11, type: "percent", value: 50 }    // 50% of the adult price
//    Children older than the rules pay the adult price.
//  - blocked: dates when the hotel is full (stop sale), optional.
//
// Do not enter guessed prices: only prices confirmed by the hotel.
//
// TEST EXAMPLE ONLY (made-up numbers). To try the calculator, paste it inside
// hotelPricing and DELETE it before the site goes live:
//
//   "royal-g-max-hotel-spa": {
//     boards: ["bb", "hb"],
//     seasons: [
//       { from: "2027-07-01", to: "2027-08-31", prices: { bb: 50, hb: 60 } },
//     ],
//     childRules: [
//       { fromAge: 0, toAge: 3, type: "free" },
//       { fromAge: 4, toAge: 11, type: "fixed", value: 45 },
//     ],
//   },

export type Board = "ro" | "bb" | "hb" | "fb" | "ai" | "uai";
export const boardLabels: Record<Board, string> = {
  ro: "Room only",
  bb: "Bed & breakfast",
  hb: "Half board",
  fb: "Full board",
  ai: "All inclusive",
  uai: "Ultra all inclusive",
};

export const allBoards: Board[] = ["ro", "bb", "hb", "fb", "ai", "uai"];

export type ChildRule = {
  fromAge: number;
  toAge: number;
  type: "free" | "fixed" | "percent";
  value?: number;
};

export type Season = {
  from: string;
  to: string;
  prices: Partial<Record<Board, number>>;
  minNights?: number;
};

export type HotelPricing = {
  boards?: Board[];
  seasons: Season[];
  childRules?: ChildRule[];
  blocked?: { from: string; to: string }[];
};

export const hotelPricing: Record<string, HotelPricing> = {};