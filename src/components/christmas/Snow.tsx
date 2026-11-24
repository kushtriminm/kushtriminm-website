"use client";

import { useChristmas } from "@/components/christmas/ChristmasProvider";

type Flake = { left: number; size: number; duration: number; delay: number; opacity: number };

// Flakes with fixed positions (no Math.random), so the server and the browser draw the same thing.
function makeFlakes(count: number, seed: number, slow: boolean): Flake[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + seed;
    return {
      left: (n * 37 + 11) % 100,
      size: 2 + (n % 3) + (n % 5 === 0 ? 1.5 : 0),
      duration: (slow ? 13 : 9) + ((n * 7) % 10),
      delay: -((n * 5) % 18),
      opacity: 0.35 + ((n * 13) % 5) * 0.12,
    };
  });
}

const heroFlakes = makeFlakes(40, 0, false);
const pageFlakes = makeFlakes(14, 3, true);

// Falling snow, only in the Christmas season.
// variant "hero": thicker snow inside the hero. variant "page": a few flakes over every page.
export default function Snow({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const christmas = useChristmas();
  if (!christmas) return null;

  const page = variant === "page";
  const flakes = page ? pageFlakes : heroFlakes;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${
        page ? "fixed inset-0 z-40" : "absolute inset-0 z-[5]"
      }`}
    >
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake absolute top-0 rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: page ? f.opacity * 0.85 : f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
