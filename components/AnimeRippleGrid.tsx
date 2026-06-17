"use client";
import { useEffect } from "react";

export default function AnimeRippleGrid() {
  useEffect(() => {
    // Grab the globally loaded library
    const anime = (window as any).anime;
    
    // Bulletproof failsafe: If the script hasn't loaded yet, do nothing instead of crashing.
    if (typeof anime !== "function") return;

    anime({
      targets: ".anime-dot",
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1200 }
      ],
      delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
      loop: true,
      direction: "alternate"
    });
  }, []);

  const dots = Array.from({ length: 70 }).map((_, i) => (
    <div key={i} className="anime-dot w-2 h-2 bg-accent rounded-full opacity-50" />
  ));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-8 opacity-20">
        {dots}
      </div>
    </div>
  );
}