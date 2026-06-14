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
  
  // Parallax scroll controls for the hero background
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
      
      {/* 1. HERO SECTION - 100dvh ensures perfect height on mobile browsers */}
      <section ref={containerRef} className="relative h-[100dvh] sm:h-screen w-full overflow-hidden bg-primary flex items-center justify-center">
        <motion.div style={{ y, scale, opacity }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/iitp-hero.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-background" />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center mt-12 md:mt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-highlight mb-3 block drop-shadow-md">
              Indian Institute of Technology Patna
            </span>
            {/* Highly adaptive heading sizing prevents mobile overlap */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight mb-6 leading-[1.1] drop-shadow-lg">
              STUDENT<br className="hidden sm:block" /> AFFAIRS
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light tracking-wide mb-10 px-2 drop-shadow-md">
              Empowering the people behind the technology. We foster community, mental wellness, and global leadership.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="flex justify-center px-4">
            <MagneticElement>
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 glass-card rounded-full overflow-hidden transition-all text-xs sm:text-sm font-semibold text-white border-highlight/30 hover:scale-105">
                <div className="absolute inset-0 bg-highlight/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-highlight text-primary flex items-center justify-center relative z-10">
                  <Navigation size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
                <span className="relative z-10">View Campus on Maps</span>
              </a>
            </MagneticElement>
          </motion.div>
        </div>
      </section>

      {/* 2. BODY CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full relative z-20 bg-background space-y-20 md:space-y-32">
        
        {/* ACTION BUTTON PACKS - flex-col ensures they stack cleanly on mobile */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <MagneticElement className="w-full sm:w-auto">
              <Link href="/welfare" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-accent text-white font-medium rounded-full shadow-[0_8px_20px_0_rgba(15,91,150,0.25)] text-sm hover:bg-accent/90 transition-colors">
                Access Student Welfare
              </Link>
            </MagneticElement>
            
            <MagneticElement className="w-full sm:w-auto">
              <Link href="/about" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border border-secondary text-primary font-medium rounded-full hover:bg-surface transition-colors text-sm group">
                Meet The Administration <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-accent" />
              </Link>
            </MagneticElement>
          </div>
        </FadeIn>

        {/* 3. BENTO GRID */}
        <div className="relative w-full">
          {/* Organic Shape adjusted to not break mobile width */}
          <AnimeOrganicShape className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] top-[-100px] left-[-50px] md:left-[-150px] opacity-40 text-muted" />
          
          <FadeIn>
            <div className="mb-8 md:mb-12 relative z-10 text-center md:text-left">
              <h2 className="text-[10px] md:text-[11px] font-bold text-accent uppercase tracking-widest mb-3 flex items-center justify-center md:justify-start gap-2">
                <Users size={14} /> Our Community
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight max-w-2xl mx-auto md:mx-0">
                Built for the students, driven by human ambition.
              </h3>
            </div>
          </FadeIn>

          {/* Grid architecture: 1 column on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10 w-full">
            
            <FadeIn delay={0.2} className="md:col-span-2">
              <AnimatedCard className="h-full p-6 md:p-10 bg-surface/90 backdrop-blur-sm border-border relative overflow-hidden group">
                <ShieldCheck className="text-accent mb-4 md:mb-6" size={32} />
                <h4 className="text-xl md:text-2xl font-semibold text-primary mb-3 md:mb-4 tracking-tight">Student Advocacy & Protection</h4>
                <p className="text-text-muted leading-relaxed font-light text-sm md:text-base md:max-w-lg">
                  Beyond administration, we are your primary advocates. Whether it is ensuring absolute campus safety, mediating grievances, or securing infrastructure for your clubs, our office stands entirely behind the student body.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <AnimatedCard className="h-full p-6 md:p-8 flex flex-col justify-between group bg-surface/90 backdrop-blur-sm border-border">
                <div>
                  <HeartPulse className="text-accent mb-4" size={24} />
                  <h4 className="text-lg font-semibold text-primary mb-2">Holistic Wellness</h4>
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    Engineering is demanding. We provide entirely confidential, professional psychological counseling and peer-to-peer emotional support networks.
                  </p>
                </div>
                <Link href="/welfare" className="mt-6 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Speak to a Counselor <ArrowRight size={12} />
                </Link>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.4} className="md:col-span-3">
              <AnimatedCard className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 group bg-primary text-white border-none">
                <div className="w-full text-center md:text-left max-w-2xl">
                  <Zap className="text-highlight mb-4 mx-auto md:mx-0" size={24} />
                  <h4 className="text-xl md:text-2xl font-semibold mb-3">Vibrant Campus Culture</h4>
                  <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                    From cutting-edge robotics hackathons to massive cultural festivals, we fund and orchestrate the ecosystems where brilliant minds connect outside the classroom.
                  </p>
                </div>
                <Link href="/campus-life" className="w-full md:w-auto shrink-0 px-6 py-3 sm:px-8 sm:py-4 bg-highlight text-primary text-center font-bold rounded-full hover:bg-white transition-colors text-xs sm:text-sm">
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