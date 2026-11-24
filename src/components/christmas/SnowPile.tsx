"use client";

import { useChristmas } from "@/components/christmas/ChristmasProvider";

// Snow piled up along the bottom of the page (inside the footer), only in the Christmas season.
export default function SnowPile() {
  const christmas = useChristmas();
  if (!christmas) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="snow-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dbe4ee" />
          </linearGradient>
          <linearGradient id="snow-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c7d2e0" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        {/* Back drifts, a little darker, for depth */}
        <path
          fill="url(#snow-back)"
          d="M0,70 C90,38 170,44 250,60 C340,78 400,30 520,36 C620,42 660,70 760,62 C860,54 920,26 1040,32 C1150,38 1200,66 1290,58 C1360,52 1400,40 1440,44 L1440,120 L0,120 Z"
        />
        {/* Front drifts */}
        <path
          fill="url(#snow-front)"
          d="M0,88 C70,66 140,62 220,80 C300,98 360,70 450,64 C540,58 600,92 700,88 C800,84 850,58 950,60 C1060,62 1100,94 1200,90 C1290,86 1350,66 1440,72 L1440,120 L0,120 Z"
        />
      </svg>
      {/* A few glints in the snow */}
      {[8, 23, 41, 57, 72, 88].map((left, i) => (
        <span
          key={left}
          className="snow-glint absolute h-1 w-1 rounded-full bg-white"
          style={{ left: `${left}%`, bottom: `${18 + (i % 3) * 9}%`, animationDelay: `${-i * 0.9}s` }}
        />
      ))}
    </div>
  );
}
