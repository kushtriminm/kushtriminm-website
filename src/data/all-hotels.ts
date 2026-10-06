import { hotels, type Hotel } from "./hotels";
import { abroadHotels } from "./hotels-abroad";

export type Country = "Albania" | "Turkey" | "Egypt" | "Greece";
export type AnyHotel = Hotel & { country: Country };

// Every hotel on the site, in one list.
export const allHotels: AnyHotel[] = [
  ...hotels.map((hotel) => ({ ...hotel, country: "Albania" as Country })),
  ...abroadHotels,
];