"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Rocket, Lightbulb, TrendingUp, Code, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

const labs = [
  { title: "IoT & Robotics MakerSpace", desc: "Equipped with 3D printers, CNC machines, and ESP32 nodes. Open 24/7 for sanctioned student projects.", icon: Cpu },
  { title: "AI & Data Sandbox", desc: "Access to high-performance computing clusters and cloud credits for machine learning models.", icon: Code },
  { title: "Automotive Incubation", desc: "Dedicated garage and funding for the Formula SAE and Solar Car racing teams.", icon: Rocket }
];

export default function InitiativesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;

      // 1. Floating Animation for Lab Cards
      anime({
        targets: '.lab-card',
        translateY: [-4, 4],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 2500,
        delay: anime.stagger(400)
      });

      // 2. Number Counter Animation for Metrics
      const metrics = document.querySelectorAll('.metric-number');
      metrics.forEach((metric: any) => {
        const targetValue = parseInt(metric.getAttribute('data-value'));
        anime({
          targets: metric,
          innerHTML: [0, targetValue],
          round: 1,
          easing: 'easeOutExpo',
          duration: 3000,
          delay: 500
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] right-[-300px] opacity-20 text-highlight" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/10 border border-white/20 text-highlight text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Lightbulb size={14} /> Student Incubation
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight to-white">INITIATIVES</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-10">
              We bridge the gap between classroom theory and real-world execution by providing capital, hardware, and mentorship to student innovators.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-24 md:space-y-32">
        
        {/* IMPACT METRICS (Anime.js Counters) */}
        <div>
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedCard className="p-10 bg-surface border-border text-center group hover:border-accent/50 transition-colors">
                <TrendingUp className="mx-auto text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-5xl font-black text-primary mb-2 tracking-tight flex justify-center items-center">
                  ₹<span className="metric-number" data-value="12">0</span>M+
                </div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Annual Seed Funding</p>
              </AnimatedCard>

              <AnimatedCard className="p-10 bg-surface border-border text-center group hover:border-accent/50 transition-colors">
                <Rocket className="mx-auto text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-5xl font-black text-primary mb-2 tracking-tight flex justify-center items-center">
                  <span className="metric-number" data-value="45">0</span>+
                </div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Active Startups</p>
              </AnimatedCard>

              <AnimatedCard className="p-10 bg-surface border-border text-center group hover:border-accent/50 transition-colors">
                <Lightbulb className="mx-auto text-accent mb-4 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-5xl font-black text-primary mb-2 tracking-tight flex justify-center items-center">
                  <span className="metric-number" data-value="120">0</span>+
                </div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Patents Filed</p>
              </AnimatedCard>
            </div>
          </FadeIn>
        </div>

        {/* FLAGSHIP INFRASTRUCTURE */}
        <div className="relative">
          <FadeIn>
            <div className="mb-10 text-center md:text-left relative z-10">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <Cpu size={14} /> Open Access Labs
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Flagship Infrastructure</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {labs.map((lab, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <div className="lab-card h-full p-8 md:p-10 bg-primary text-white border-none rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/20 rounded-full blur-[50px] group-hover:bg-highlight/40 transition-colors duration-500" />
                  <lab.icon className="text-highlight mb-6 group-hover:scale-110 transition-transform duration-300" size={36} />
                  <h4 className="text-xl font-bold mb-3 tracking-tight relative z-10">{lab.title}</h4>
                  <p className="text-sm font-light text-white/80 leading-relaxed mb-6 relative z-10">{lab.desc}</p>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-highlight flex items-center gap-2 group-hover:translate-x-2 transition-transform relative z-10">
                    Book Equipment <ArrowRight size={12} />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}