"use client";
import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight, Navigation, ShieldCheck, HeartPulse, Zap } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import MagneticElement from "@/components/MagneticElement";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef(null);
  
  // Controls the Parallax scrolling effect on the hero image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mapLink = "https://www.google.com/maps/place/Indian+Institute+of+Technology+Patna";

  return (
    <div className="relative bg-background">
      
      {/* --- 1. HERO SECTION --- */}
      <section ref={containerRef} className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-primary flex items-center justify-center">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 w-full h-full">
          {/* Ensure your image is named iitp-hero.jpg inside the public folder */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/iitp-hero.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <span className="text-sm md:text-lg font-bold tracking-widest uppercase text-accent mb-4 block drop-shadow-md">
              Indian Institute of Technology Patna
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tight mb-6 drop-shadow-lg leading-none">
              STUDENT<br />AFFAIRS
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide mb-10 drop-shadow-md">
              The heartbeat of campus operations, technical incubation, and holistic welfare.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="flex justify-center">
            <MagneticElement>
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-6 py-3.5 glass-card rounded-full overflow-hidden transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-accent/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center relative z-10">
                  <Navigation size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <span className="text-sm font-semibold text-white relative z-10">View Campus on Maps</span>
              </a>
            </MagneticElement>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-20 bg-background space-y-32">
        
        {/* --- 2. MAGNETIC ACTION BUTTONS --- */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticElement>
              <Link href="/welfare" className="block px-8 py-4 bg-accent text-white font-medium rounded-full shadow-[0_8px_20px_0_rgba(0,102,255,0.25)] text-sm">
                Access Student Resources
              </Link>
            </MagneticElement>
            
            <MagneticElement>
              <Link href="/about" className="block px-8 py-4 bg-transparent border border-border text-text-main font-medium rounded-full hover:bg-surface transition-colors text-sm flex items-center gap-2 group">
                Our Administrative Strategy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
              </Link>
            </MagneticElement>
          </div>
        </FadeIn>

        {/* --- 3. INTERACTIVE BENTO GRID --- */}
        <div>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">Office of Student Affairs</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">The Heartbeat of Campus Operations.</h3>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Large Feature Card */}
            <FadeIn delay={0.2} className="md:col-span-2">
              <AnimatedCard className="h-full p-10 bg-gradient-to-br from-surface to-background relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
                <ShieldCheck className="text-accent mb-6" size={32} />
                <h4 className="text-2xl font-semibold text-primary mb-4 tracking-tight">Comprehensive Student Advocacy</h4>
                <p className="text-text-muted leading-relaxed font-light max-w-lg">
                  The Student Affairs Office serves as the primary bridge between academic rigor and personal development. We govern club activities, secure funding for technical projects, and enforce strict anti-ragging protocols to ensure a thriving, safe ecosystem.
                </p>
              </AnimatedCard>
            </FadeIn>

            {/* Small Card 1 */}
            <FadeIn delay={0.3}>
              <AnimatedCard className="h-full p-8 flex flex-col justify-between group">
                <div>
                  <HeartPulse className="text-accent mb-4" size={24} />
                  <h4 className="text-lg font-semibold text-primary mb-2">Mental Wellness</h4>
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    24/7 access to professional psychiatric evaluation and peer mentorship programs.
                  </p>
                </div>
                <Link href="/welfare" className="mt-6 text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Get Support <ArrowRight size={12} />
                </Link>
              </AnimatedCard>
            </FadeIn>

            {/* Small Card 2 */}
            <FadeIn delay={0.4}>
              <AnimatedCard className="h-full p-8 flex flex-col justify-between group md:col-span-1">
                <div>
                  <Zap className="text-accent mb-4" size={24} />
                  <h4 className="text-lg font-semibold text-primary mb-2">Technical Incubation</h4>
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    Financial grants and laboratory access for IoT, Machine Learning, and Engineering collectives.
                  </p>
                </div>
                <Link href="/initiatives" className="mt-6 text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  View Initiatives <ArrowRight size={12} />
                </Link>
              </AnimatedCard>
            </FadeIn>

            {/* Statistics Banner */}
            <FadeIn delay={0.5} className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border border-border bg-surface rounded-2xl">
                {siteConfig.home.stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left md:border-r border-border last:border-0 md:pr-4">
                    <p className="text-2xl font-semibold text-primary mb-1 tracking-tight">{stat.metric}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

      </div>
    </div>
  );
}