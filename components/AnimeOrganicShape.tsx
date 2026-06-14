"use client";
import { useEffect, useRef } from "react";

// The "export default" right here is what fixes your error!
export default function AnimeOrganicShape({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      
      anime({
        targets: pathRef.current,
        d: [
          { value: "M47.5,-48.1C60.3,-34.5,68.6,-17.2,69.5,0.9C70.4,19,63.9,38,51.1,51.8C38.3,65.6,19.2,74.2,0.8,73.4C-17.6,72.6,-35.2,62.4,-47.9,48.6C-60.6,34.8,-68.4,17.4,-67.6,0.8C-66.8,-15.8,-57.4,-31.6,-44.7,-45.2C-32,-58.8,-16,-70.2,0.6,-70.8C17.2,-71.4,34.7,-61.7,47.5,-48.1Z" },
          { value: "M41.8,-48.5C54.4,-38.3,65.2,-25.2,68.9,-10.1C72.6,5,69.2,22.1,59.3,35.2C49.4,48.3,33.1,57.4,16.2,61.5C-0.7,65.6,-18.2,64.7,-34.4,57.6C-50.6,50.5,-65.5,37.2,-71.5,20.8C-77.5,4.4,-74.6,-15.1,-65.3,-30.3C-56,-45.5,-40.3,-56.4,-25.3,-61.3C-10.3,-66.2,4,-65.1,17.5,-60.8C31,-56.5,43.7,-49,41.8,-48.5Z" },
          { value: "M38.1,-43.3C49.8,-33.5,60.1,-22.4,63.2,-9.5C66.3,3.4,62.2,18.1,52.8,29.3C43.4,40.5,28.7,48.2,12.7,53.2C-3.3,58.2,-20.6,60.5,-34.3,53.7C-48,46.9,-58.1,31,-61.1,14.6C-64.1,-1.8,-60,-18.7,-50.2,-30.9C-40.4,-43.1,-25.1,-50.6,-10.8,-52.3C3.5,-54,17.8,-49.9,26.4,-53.1L38.1,-43.3Z" }
        ],
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        duration: 6000
      });
    });
  }, []);

  return (
    <div className={`absolute pointer-events-none z-0 ${className}`}>
      <svg viewBox="-100 -100 200 200" className="w-full h-full text-accent/5" xmlns="http://www.w3.org/2000/svg">
        <path ref={pathRef} fill="currentColor" transform="translate(0 0)" />
      </svg>
    </div>
  );
}