"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrow =
    "absolute top-1/3 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-red-600 md:flex";

  return (
    <div className="relative">
      <div
        ref={ref}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Mbrapa"
        onClick={() => scroll(-1)}
        className={`${arrow} left-2`}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Përpara"
        onClick={() => scroll(1)}
        className={`${arrow} right-2`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}