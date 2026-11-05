"use client";

import { useToday } from "@/components/tours/shared";
import { isChristmasSeason } from "@/lib/season";

// 28 flakes with fixed positions, so the server and the browser draw the same thing.
const flakes = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  duration: 9 + ((i * 7) % 9),
  delay: -((i * 5) % 14),
  opacity: 0.35 + ((i * 13) % 5) * 0.12,
}));

// Light snow over the hero, only in the Christmas season.
export default function Snow() {
  const today = useToday();
  if (!isChristmasSeason(today)) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake absolute top-0 rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}