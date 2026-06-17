"use client";
import { useEffect, useRef } from "react";

export default function AnimeEntrance({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const items = containerRef.current.querySelectorAll('.anime-item');
    items.forEach(el => (el as HTMLElement).style.opacity = '0');

    // Grab the globally loaded library
    const anime = (window as any).anime;
    if (typeof anime !== "function") return;

    anime({
      targets: items,
      translateY: [40, 0],
      opacity: [0, 1],
      easing: "easeOutSpring(1, 80, 12, 0)",
      duration: 1000,
      delay: anime.stagger(100, { start: 200 })
    });
  }, []);

  return <div ref={containerRef} className="w-full">{children}</div>;
}