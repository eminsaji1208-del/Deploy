"use client";
import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight, Navigation, ShieldCheck, HeartPulse, Zap, Users } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import MagneticElement from "@/components/MagneticElement";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mapLink = "https://www.google.com/maps/place/Indian+Institute+of+Technology+Patna";

  return (
    <div className="relative bg-background overflow-hidden">
      
      {/* --- 1. HERO SECTION --- */}
      <section ref={containerRef} className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-primary flex items-center justify-center">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 w-full h-full">
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
              Empowering the people behind the technology. We foster community, mental wellness, and global leadership.
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
                Access Student Welfare
              </Link>
            </MagneticElement>
            
            <MagneticElement>
              <Link href="/about" className="block px-8 py-4 bg-transparent border border-border text-text-main font-medium rounded-full hover:bg-surface transition-colors text-sm flex items-center gap-2 group">
                Meet The Administration <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
              </Link>
            </MagneticElement>
          </div>
        </FadeIn>

        {/* --- 3. NEW: HUMAN-CENTRIC COMMUNITY SECTION --- */}
        <div className="relative">
          {/* The new Anime.js breathing shape injected behind the content */}
          <AnimeOrganicShape className="w-[600px] h-[600px] top-[-100px] left-[-200px]" />
          
          <FadeIn>
            <div className="mb-12 relative z-10">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                <Users size={14} /> Our Community
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight max-w-2xl">
                Built for the students, driven by human ambition.
              </h3>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {/* Welfare & Advocacy */}
            <FadeIn delay={0.2} className="md:col-span-2">
              <AnimatedCard className="h-full p-10 bg-surface/80 backdrop-blur-sm border-border relative overflow-hidden group">
                <ShieldCheck className="text-accent mb-6" size={32} />
                <h4 className="text-2xl font-semibold text-primary mb-4 tracking-tight">Student Advocacy & Protection</h4>
                <p className="text-text-muted leading-relaxed font-light max-w-lg">
                  Beyond administration, we are your primary advocates. Whether it is ensuring absolute campus safety, mediating grievances, or securing infrastructure for your clubs, our office stands entirely behind the student body.
                </p>
              </AnimatedCard>
            </FadeIn>

            {/* Mental Health */}
            <FadeIn delay={0.3}>
              <AnimatedCard className="h-full p-8 flex flex-col justify-between group bg-surface/80 backdrop-blur-sm">
                <div>
                  <HeartPulse className="text-accent mb-4" size={24} />
                  <h4 className="text-lg font-semibold text-primary mb-2">Holistic Wellness</h4>
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    Engineering is demanding. We provide entirely confidential, professional psychological counseling and peer-to-peer emotional support networks.
                  </p>
                </div>
                <Link href="/welfare" className="mt-6 text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Speak to a Counselor <ArrowRight size={12} />
                </Link>
              </AnimatedCard>
            </FadeIn>

            {/* Campus Life / Clubs */}
            <FadeIn delay={0.4} className="md:col-span-3">
              <AnimatedCard className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 group bg-primary text-white">
                <div className="max-w-2xl">
                  <Zap className="text-accent mb-4" size={24} />
                  <h4 className="text-2xl font-semibold mb-3">Vibrant Campus Culture</h4>
                  <p className="text-white/70 font-light leading-relaxed">
                    From cutting-edge robotics hackathons to massive cultural festivals, we fund and orchestrate the ecosystems where brilliant minds connect outside the classroom.
                  </p>
                </div>
                <Link href="/campus-life" className="shrink-0 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-accent hover:text-white transition-colors text-sm">
                  Explore Campus Life
                </Link>
              </AnimatedCard>
            </FadeIn>

          </div>
        </div>

      </div>
    </div>
  );
}