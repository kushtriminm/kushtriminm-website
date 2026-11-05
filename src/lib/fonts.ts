import { Montserrat } from "next/font/google";

// The geometric font used for the headline and the menu. It is downloaded once when the site is built,
// then served from your own site (no request to Google for each visitor).
export const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });