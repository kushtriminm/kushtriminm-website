export type HotelPrice = {
  from: string;
  to: string;
  price?: number;
  board: string;
  note?: string;
};

export const hotelPrices: Record<string, HotelPrice[]> = {
  // =========================================================
  // DURRËS / GOLEM / MALI I ROBIT
  // =========================================================

  "aqua-fafa-blue": [
    {
      from: "01.07.2026",
      to: "31.08.2026",
      price: 130,
      board: "All Inclusive",
      note: "Stop Sale: 20.07.2026 – 18.08.2026",
    },
    {
      from: "01.09.2026",
      to: "15.09.2026",
      price: 85,
      board: "All Inclusive",
    },
    {
      from: "16.09.2026",
      to: "30.09.2026",
      price: 80,
      board: "All Inclusive",
    },
  ],

  "bonita-classic": [
    {
      from: "01.07.2026",
      to: "10.07.2026",
      price: 105,
      board: "All Inclusive",
      note: "For stays of 2 nights or more",
    },
    {
      from: "11.07.2026",
      to: "31.08.2026",
      price: 115,
      board: "All Inclusive",
    },
    {
      from: "01.09.2026",
      to: "10.09.2026",
      price: 80,
      board: "All Inclusive",
    },
    {
      from: "11.09.2026",
      to: "30.09.2026",
      price: 75,
      board: "All Inclusive",
    },
    {
      from: "01.10.2026",
      to: "31.12.2026",
      price: 40,
      board: "Bed & Breakfast",
    },
  ],

  "bonita-luxury": [
    {
      from: "01.07.2026",
      to: "10.07.2026",
      price: 110,
      board: "All Inclusive",
      note: "For stays of 2 nights or more",
    },
    {
      from: "11.07.2026",
      to: "31.08.2026",
      price: 115,
      board: "All Inclusive",
    },
    {
      from: "01.09.2026",
      to: "10.09.2026",
      price: 80,
      board: "All Inclusive",
    },
    {
      from: "11.09.2026",
      to: "30.09.2026",
      price: 75,
      board: "All Inclusive",
    },
    {
      from: "01.10.2026",
      to: "31.12.2026",
      price: 40,
      board: "Bed & Breakfast",
    },
  ],

  // =========================================================
  // SHËNGJIN
  // =========================================================

  "rafaelo-executive-spa": [
    {
      from: "10.07.2026",
      to: "31.08.2026",
      price: 90,
      board: "Bed & Breakfast",
    },
    {
      from: "10.07.2026",
      to: "31.08.2026",
      price: 130,
      board: "All Inclusive",
    },
    {
      from: "01.09.2026",
      to: "12.09.2026",
      price: 65,
      board: "Bed & Breakfast",
    },
    {
      from: "01.09.2026",
      to: "12.09.2026",
      price: 90,
      board: "All Inclusive",
    },
    {
      from: "13.09.2026",
      to: "01.10.2026",
      price: 60,
      board: "Bed & Breakfast",
    },
    {
      from: "13.09.2026",
      to: "01.10.2026",
      price: 85,
      board: "All Inclusive",
    },
  ],
};