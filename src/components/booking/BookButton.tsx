"use client";

import type { ReactNode } from "react";

// Opens the booking pop-up. Pass a hotel slug to preselect that hotel.
export default function BookButton({
  slug,
  className,
  children,
}: {
  slug?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent("open-booking", { detail: slug }))
      }
    >
      {children}
    </button>
  );
}