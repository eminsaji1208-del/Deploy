"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Music, Cpu, Trophy, Mic, Code, Camera, Palette, Globe, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

const festivals = [
  { id: "anwesha", title: "Anwesha", subtitle: "Annual Cultural Fest", desc: "IIT Patna's flagship 3-day multi-city cultural festival featuring Pro-Nites and global artist headliners.", icon: Music, color: "bg-rose-500" },
  { id: "celesta", title: "Celesta", subtitle: "Annual Techno-Management Fest", desc: "The ultimate technical summit featuring national-level hackathons and robotics wars.", icon: Cpu, color: "bg-blue-600" },
  { id: "infinito", title: "Infinito", subtitle: "Annual Sports Fest", desc: "Bringing together the finest athletes from technical institutes for competitive sports tournaments.", icon: Trophy, color: "bg-emerald-500" }
];

const clubs = [
  { name: "NJACK (Computer Science)", icon: Code }, { name: "Sparkonics (Electronics)", icon: Cpu },
  { name: "Aria (Music Society)", icon: Mic }, { name: "Yavanika (Dramatics)", icon: Palette },
  { name: "Pixels (Photography)", icon: Camera }, { name: "House of Words", icon: Globe }
];
export default function CampusLifePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;

      // 1. Continuous Floating Physics for Festival Cards
      anime({
        targets: '.fest-card',
        translateY: [-5, 5],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 3000,
        delay: anime.stagger(500)
      });

      // 2. Staggered Pop-in for Club Pills
      anime({
        targets: '.club-pill',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 500 }),
        easing: 'spring(1, 80, 10, 0)'
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-primary bg-[url('/iitp-hero.jpg')] bg-cover bg-center opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              CAMPUS <span className="text-highlight">LIFE</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Vibrant, sleepless, and driven by passion. Explore the massive festivals and hyper-active clubs that define the IIT Patna experience.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-24 md:space-y-32">
        
        {/* THE BIG THREE FESTIVALS */}
        <div>
          <FadeIn>
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2">The Big Three</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Annual Festivals</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {festivals.map((fest, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)} className="h-full">
                <AnimatedCard className="fest-card h-full p-8 bg-surface border-border overflow-hidden relative group cursor-pointer">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${fest.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  <fest.icon className={`mb-6 ${fest.color.replace('bg-', 'text-')}`} size={36} />
                  <h4 className="text-3xl font-black text-primary mb-1 tracking-tight">{fest.title}</h4>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">{fest.subtitle}</p>
                  <p className="text-sm text-text-muted font-light leading-relaxed mb-8">
                    {fest.desc}
                  </p>
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <ChevronRight size={18} />
                  </div>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* STUDENT CLUBS & SOCIETIES */}
        <div className="relative">
          <AnimeOrganicShape className="w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-20 text-muted" />
          
          <FadeIn>
            <div className="mb-10 text-center">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2">Student Gymkhana</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Active Societies & Clubs</h3>
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {clubs.map((club, i) => {
              const classStr = "club-pill flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-surface border border-border rounded-full hover:border-accent/50 hover:shadow-lg transition-all cursor-pointer group";
              return (
                <div key={i} className={classStr}>
                  <club.icon size={18} className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm md:text-base font-semibold text-primary">{club.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}