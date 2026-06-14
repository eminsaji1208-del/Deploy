"use client";
import { useEffect, useRef } from "react";
import FadeIn from "./FadeIn";

export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const bgRef = useRef<HTMLDivElement>(null);

  // Unique Anime.js Interactive Floating Aura Background
  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      if (!bgRef.current) return;

      const shapes = bgRef.current.querySelectorAll('.anime-aura');

      anime({
        targets: shapes,
        translateX: () => anime.random(-30, 30) + 'vw',
        translateY: () => anime.random(-15, 15) + 'vh',
        scale: () => anime.random(0.8, 2.5),
        opacity: () => anime.random(0.1, 0.5),
        duration: () => anime.random(4000, 8000),
        delay: () => anime.random(0, 500),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    });
  }, []);

  return (
    <div className="relative pt-48 pb-28 bg-primary overflow-hidden">
      {/* Animated Aura Background Layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none opacity-60">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className="anime-aura absolute top-1/2 left-1/2 w-48 h-48 bg-accent/30 rounded-full blur-[100px]" 
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-20 text-center">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 drop-shadow-lg">
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-sm">
              {subtitle}
            </p>
          </FadeIn>
        )}
      </div>
    </div>
  );
}