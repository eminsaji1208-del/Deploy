"use client";
import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and Zoom effects for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mapLink = "https://www.google.com/maps/place/Indian+Institute+of+Technology+Patna";

  return (
    <div className="relative bg-background">
      
      {/* --- NEW INTERACTIVE HERO SECTION --- */}
      <section ref={containerRef} className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-primary flex items-center justify-center">
        
        {/* Animated Background Image */}
        <motion.div 
          style={{ y, scale, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/iitp-hero.jpg')" }}
          />
          {/* Gradient Overlay so text remains readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-background" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              IIT PATNA
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-light tracking-wide mb-10 drop-shadow-md">
              {siteConfig.home.heroSubtitle}
            </p>
          </motion.div>

          {/* Interactive Location Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <a 
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-6 py-3.5 glass-card rounded-full overflow-hidden transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-accent/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center relative z-10">
                <Navigation size={14} className="group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold text-white relative z-10">
                View Campus on Maps
              </span>
            </a>
          </motion.div>
        </div>
      </section>


      {/* --- REST OF THE PAGE --- */}
      <div className="max-w-5xl mx-auto px-6 py-24 w-full relative z-20 bg-background">
        
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-24">
            <Link href="/welfare" className="px-7 py-3.5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors text-sm shadow-[0_4px_14px_0_rgba(0,102,255,0.2)]">
              Access Resources
            </Link>
            <Link href="/about" className="px-7 py-3.5 bg-transparent border border-border text-text-main font-medium rounded-full hover:bg-surface transition-colors text-sm flex items-center gap-2 group">
              Our Strategy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border">
          {siteConfig.home.stats.map((stat, i) => (
            <FadeIn key={i} delay={0.2 + (i * 0.1)}>
              <AnimatedCard className="p-6 text-center h-full flex flex-col justify-center">
                <p className="text-3xl font-semibold text-primary mb-2 tracking-tight">{stat.metric}</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </p>
              </AnimatedCard>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}