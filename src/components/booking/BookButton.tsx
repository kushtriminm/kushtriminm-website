"use client";

import type { ReactNode } from "react";
import type { Country } from "@/data/all-hotels";

// Opens the booking pop-up.
// slug = preselect that hotel. country = show only that country's hotels.
export default function BookButton({
  slug,
  country,
  className,
  children,
}: {
  slug?: string;
  country?: Country;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("open-booking", { detail: { slug, country } })
        )
      }
    >
      {children}
    </button>
  );
}