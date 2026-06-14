"use client";
import { useEffect, useRef } from "react";
// @ts-ignore - Bypassing strict Next.js TS rules for Anime.js
import anime from "animejs";
export default function AnimeRippleGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const columns = 20;
  const rows = 10;

  useEffect(() => {
    if (!gridRef.current) return;

    anime({
      targets: ".anime-dot",
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1.5, easing: "easeInOutQuad", duration: 1200 }
      ],
      opacity: [
        { value: 0, duration: 0 },
        { value: 0.3, duration: 1000 }
      ],
      delay: anime.stagger(150, { grid: [columns, rows], from: "center" }),
      loop: true,
      direction: "alternate"
    });
  }, []);

  return (
    // Fixed inset-0 makes it cover the whole screen behind everything
    <div className="fixed inset-0 w-full h-screen flex justify-center items-center overflow-hidden opacity-30 z-[-1] pointer-events-none">
      <div 
        ref={gridRef}
        className="grid gap-8 md:gap-12 opacity-50"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns * rows }).map((_, i) => (
          <div 
            key={i} 
            className="anime-dot w-1.5 h-1.5 rounded-full bg-accent/40"
          />
        ))}
      </div>
    </div>
  );
}