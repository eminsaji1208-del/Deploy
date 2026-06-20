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
import LiveBulletin from "@/components/LiveBulletin"; 

export default function HomePage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mapLink = "https://www.google.com/maps/place/Indian+Institute+of+Technology+Patna";

  return (
    <div className="relative bg-background overflow-hidden w-full">
      
      {/* 1. HERO SECTION */}
      <section ref={containerRef} className="relative h-auto min-h-[100dvh] w-full overflow-hidden bg-primary flex flex-col items-center justify-center pt-24 pb-12">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/iitp-hero.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-background" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Main Hero Text */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="text-center lg:text-left">
            <span className="text-sm font-bold tracking-widest uppercase text-highlight mb-3 block drop-shadow-md">
              Indian Institute of Technology Patna
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight mb-6 leading-[1.1] drop-shadow-lg">
              STUDENT<br />AFFAIRS
            </h1>
            <p className="text-lg text-white/90 max-w-lg mx-auto lg:mx-0 font-light tracking-wide mb-10 drop-shadow-md">
              Empowering the people behind the technology. We foster community, mental wellness, and global leadership.
            </p>
            
            <MagneticElement>
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-6 py-3.5 glass-card rounded-full overflow-hidden transition-all text-sm font-semibold text-white border-highlight/30 hover:scale-105">
                <div className="absolute inset-0 bg-highlight/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="w-8 h-8 rounded-full bg-highlight text-primary flex items-center justify-center relative z-10">
                  <Navigation size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <span className="relative z-10">View Campus on Maps</span>
              </a>
            </MagneticElement>
          </motion.div>

          {/* Live Bulletin Column (Right Side) */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex justify-center lg:justify-end w-full">
            <LiveBulletin />
          </motion.div>

        </div>
      </section>

      {/* 2. BODY CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-20 space-y-32">
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticElement className="w-full sm:w-auto">
              <Link href="/welfare" className="flex items-center justify-center w-full px-8 py-4 bg-accent text-white font-medium rounded-full shadow-[0_8px_20px_0_rgba(15,91,150,0.25)] hover:bg-accent/90 transition-all">
                Access Student Welfare
              </Link>
            </MagneticElement>
            <MagneticElement className="w-full sm:w-auto">
              <Link href="/about" className="flex items-center justify-center w-full px-8 py-4 bg-surface border border-secondary text-primary font-medium rounded-full hover:bg-background transition-all group">
                Meet The Administration <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-accent" />
              </Link>
            </MagneticElement>
          </div>
        </FadeIn>

        {/* 3. BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <AnimeOrganicShape className="w-[500px] h-[500px] absolute -top-40 -left-20 opacity-20 pointer-events-none" />
          
          <FadeIn delay={0.2} className="md:col-span-2">
            <AnimatedCard className="h-full p-10 bg-surface/90 border-border relative overflow-hidden">
              <ShieldCheck className="text-accent mb-6" size={32} />
              <h4 className="text-2xl font-semibold text-primary mb-4 tracking-tight">Student Advocacy & Protection</h4>
              <p className="text-text-muted leading-relaxed text-base max-w-lg">
                Beyond administration, we are your primary advocates. Whether it is ensuring absolute campus safety, mediating grievances, or securing infrastructure for your clubs, our office stands entirely behind the student body.
              </p>
            </AnimatedCard>
          </FadeIn>

          <FadeIn delay={0.3}>
            <AnimatedCard className="h-full p-8 flex flex-col justify-between bg-surface/90 border-border">
              <div>
                <HeartPulse className="text-accent mb-4" size={24} />
                <h4 className="text-lg font-semibold text-primary mb-2">Holistic Wellness</h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Engineering is demanding. We provide entirely confidential, professional psychological counseling and peer-to-peer support.
                </p>
              </div>
              <Link href="/welfare" className="mt-6 text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                Speak to a Counselor <ArrowRight size={12} />
              </Link>
            </AnimatedCard>
          </FadeIn>

          <FadeIn delay={0.4} className="md:col-span-3">
            <AnimatedCard className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-primary text-white border-none">
              <div className="max-w-2xl text-center md:text-left">
                <Zap className="text-highlight mb-4 mx-auto md:mx-0" size={24} />
                <h4 className="text-2xl font-semibold mb-3">Vibrant Campus Culture</h4>
                <p className="text-white/70 leading-relaxed">
                  From cutting-edge robotics hackathons to massive cultural festivals, we fund and orchestrate the ecosystems where brilliant minds connect outside the classroom.
                </p>
              </div>
              <Link href="/campus-life" className="px-8 py-4 bg-highlight text-primary font-bold rounded-full hover:bg-white transition-all text-sm">
                Explore Campus Life
              </Link>
            </AnimatedCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}