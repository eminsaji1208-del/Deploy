"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Image as ImageIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

// Placeholder data since we don't have real images yet
const galleryItems = [
  { title: "Anwesha Festival 2025", category: "Culture", color: "from-rose-500 to-purple-600", height: "md:col-span-2 md:row-span-2 h-[300px] md:h-[500px]" },
  { title: "Robotics Hackathon", category: "Technology", color: "from-blue-500 to-cyan-500", height: "h-[300px] md:h-[240px]" },
  { title: "Infinito Sports Meet", category: "Sports", color: "from-emerald-400 to-teal-600", height: "h-[300px] md:h-[240px]" },
  { title: "Alumni Meet & Greet", category: "Community", color: "from-orange-400 to-red-500", height: "h-[300px] md:h-[240px]" },
  { title: "IoT Lab Inauguration", category: "Campus", color: "from-indigo-500 to-blue-700", height: "md:col-span-2 h-[300px] md:h-[240px]" },
];

export default function GalleryPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      
      // Staggered pop-in for the gallery grid
      anime({
        targets: '.gallery-card',
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: anime.stagger(150, { grid: [2, 3], from: 'center' }),
        easing: 'easeOutBack',
        duration: 800
      });

      // Hover Physics
      const cards = document.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          anime({ targets: card.querySelector('.overlay'), opacity: 1, duration: 300, easing: 'linear' });
          anime({ targets: card.querySelector('.content'), translateY: [20, 0], opacity: 1, duration: 400, easing: 'easeOutQuint' });
        });
        card.addEventListener('mouseleave', () => {
          anime({ targets: card.querySelector('.overlay'), opacity: 0, duration: 300, easing: 'linear' });
          anime({ targets: card.querySelector('.content'), translateY: [0, 20], opacity: 0, duration: 400, easing: 'easeOutQuint' });
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] right-[-200px] opacity-10 text-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              VISUAL <span className="text-highlight">ARCHIVE</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 font-light tracking-wide leading-relaxed">
              A glimpse into the energy, innovation, and culture of IIT Patna.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {galleryItems.map((item, i) => (
            <div key={i} className={`gallery-card opacity-0 relative rounded-3xl overflow-hidden cursor-pointer group ${item.height}`}>
              {/* Replace the gradient div below with an actual <img> tag when you have photos */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <ImageIcon size={48} className="text-white/20" />
              </div>
              
              <div className="overlay absolute inset-0 bg-primary/80 opacity-0 transition-opacity" />
              
              <div className="content absolute inset-0 p-8 flex flex-col justify-end opacity-0">
                <span className="text-[10px] font-bold text-highlight uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}