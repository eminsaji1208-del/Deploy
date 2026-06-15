"use client";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/site-config";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, BookOpen, Activity, Compass, Network, Award } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";

const timelineData = [
  { year: "2008", title: "Foundation", desc: "IIT Patna established. Student Affairs operates from a temporary campus." },
  { year: "2015", title: "Campus Migration", desc: "Transitioned to the permanent Bihta campus, expanding technical and cultural infrastructure." },
  { year: "2020", title: "Digital Integration", desc: "Launched complete digital governance for student clubs, funding, and grievance redressal." },
  { year: "2026", title: "Vision 2030 Initiated", desc: "Scaling holistic wellness programs and global leadership incubators." }
];

const departments = [
  { icon: Activity, title: "Welfare & Counseling", desc: "Dedicated psychological support and financial aid for the student body." },
  { icon: Compass, title: "Career & Leadership", desc: "Soft-skills training, corporate relations, and international student exchange programs." },
  { icon: BookOpen, title: "Technical Incubation", desc: "Funding and lab access for robotics, AI, and automotive student clubs." },
  { icon: Users, title: "Cultural Affairs", desc: "Orchestrating massive inter-college festivals and fostering artistic societies." }
];

export default function AboutPage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Anime.js Interactive Physics Engine
  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;

      // 1. Staggered Spring Animation for the Timeline Nodes
      anime({
        targets: '.timeline-node',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(250, { start: 600 }),
        easing: 'spring(1, 80, 10, 0)'
      });

      // 2. Interactive Hover Physics for Department Cards
      const cards = document.querySelectorAll('.arch-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          anime({
            targets: card,
            translateY: -8,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(15,91,150,0.12)',
            duration: 400,
            easing: 'easeOutElastic(1, .6)'
          });
          // Animate the icon inside the card
          anime({
            targets: card.querySelector('.arch-icon'),
            rotate: 15,
            scale: 1.2,
            duration: 400,
            easing: 'easeOutQuad'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          anime({
            targets: card,
            translateY: 0,
            scale: 1,
            boxShadow: '0 8px 30px rgba(0,0,0,0.0)',
            duration: 400,
            easing: 'easeOutQuad'
          });
          anime({
            targets: card.querySelector('.arch-icon'),
            rotate: 0,
            scale: 1,
            duration: 400,
            easing: 'easeOutQuad'
          });
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* 1. RESPONSIVE HERO SECTION (Shorter than homepage) */}
      <section ref={containerRef} className="relative h-[60dvh] md:h-[70dvh] w-full bg-primary flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-primary bg-[url('/iitp-hero.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/80 to-primary/40" />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center mt-16">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-highlight mb-4 block drop-shadow-md">
              Operational Architecture
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight to-white">SAO</span>
            </h1>
            <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed px-2">
              The central nervous system of student life at IIT Patna. We bridge the gap between institutional policy and student ambition.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. MAIN CONTENT BODY */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-24 md:space-y-32">
        
        {/* INTERACTIVE DEPARTMENT ARCHITECTURE */}
        <div>
          <FadeIn>
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-[10px] md:text-[11px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <Network size={14} /> Structural Matrix
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Core Departments</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {departments.map((dept, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                {/* The 'arch-card' class triggers the Anime.js hover physics */}
                <div className="arch-card h-full p-6 md:p-8 bg-surface border border-border rounded-2xl cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent arch-icon">
                    <dept.icon size={24} />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-primary mb-3 tracking-tight">{dept.title}</h4>
                  <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed">
                    {dept.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ANIME.JS STAGGERED TIMELINE */}
        <div className="relative">
          <FadeIn>
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-[10px] md:text-[11px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <Award size={14} /> Institutional Legacy
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Our Evolution</h3>
            </div>
          </FadeIn>

          {/* Timeline Line (Hidden on tiny screens, vertical on mobile/desktop) */}
          <div className="relative border-l border-border/60 ml-4 md:ml-6 space-y-12 pb-8">
            {timelineData.map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-12 group">
                
                {/* The 'timeline-node' gets spring-animated by Anime.js on load */}
                <div className="timeline-node absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-surface border-2 border-accent flex items-center justify-center shadow-[0_0_10px_rgba(15,91,150,0.2)]">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform duration-300" />
                </div>
                
                <FadeIn delay={0.3 + (i * 0.1)}>
                  <span className="font-mono font-bold text-accent text-[11px] md:text-xs uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                    {item.year}
                  </span>
                  <h4 className="text-xl md:text-2xl font-semibold text-primary mt-4 mb-2 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed font-light max-w-2xl">
                    {item.desc}
                  </p>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}