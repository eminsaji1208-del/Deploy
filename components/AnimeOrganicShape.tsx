"use client";
import { useEffect, useRef } from "react";

export default function AnimeOrganicShape({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // 1. Grab the library from the global bypass
    const anime = (window as any).anime;
    
    // 2. The Bulletproof Failsafe
    if (typeof anime !== "function" || !pathRef.current) return;

    // 3. Your specific morphing animation
    anime({
      targets: pathRef.current,
      d: [
        { value: "M47.5,-48.1C60.3,-34.5,68.6,-17.2,69.5,0.9C70.4,19,63.9,38,51.1,51.8C38.3,65.6,19.2,74.2,1.3,72.9C-16.6,71.6,-33.2,60.4,-44.3,46.1C-55.4,31.8,-61,15.9,-61.7,-0.7C-62.4,-17.3,-58.2,-34.6,-47.5,-48.1C-36.8,-61.6,-18.4,-71.3,0,-71.3C18.4,-71.3,36.8,-61.6,47.5,-48.1Z" },
        // ... (Keep the rest of your specific path values here!)
      ],
      easing: "easeInOutSine",
      duration: 10000,
      direction: "alternate",
      loop: true
    });
  }, []);

  return (
    <div className={`absolute pointer-events-none z-0 ${className}`}>
      <svg viewBox="-100 -100 200 200" className="w-full h-full text-current" xmlns="http://www.w3.org/2000/svg">
        <path ref={pathRef} fill="currentColor" transform="translate(0 0)" />
      </svg>
    </div>
  );
}