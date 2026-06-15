"use client";
import { siteConfig } from "@/data/site-config";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Eye, TrendingUp, Globe, Award, Sparkles, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

// Custom Data for the Vision 2030 Dashboard
const visionData = [
  { metric: "3,500+", label: "Active Student Leaders", icon: Globe },
  { metric: "₹50M+", label: "Tech Incubation Funding", icon: TrendingUp },
  { metric: "100%", label: "Mental Health Coverage", icon: Award },
];

const pillars = [
  {
    id: "innovation",
    title: "Technical Innovation",
    desc: "Transforming raw academic knowledge into real-world technological solutions through funded hackathons, maker-spaces, and global competitions.",
    color: "from-accent to-primary"
  },
  {
    id: "wellness",
    title: "Holistic Wellness",
    desc: "A rigorous engineering curriculum requires an equally robust mental health infrastructure. We are building South Asia's most comprehensive student support network.",
    color: "from-secondary to-primary"
  },
  {
    id: "leadership",
    title: "Global Leadership",
    desc: "IIT Patna students don't just join the industry; they define it. We cultivate leadership through extensive club management, international delegations, and debate.",
    color: "from-primary to-accent"
  }
];

export default function VisionMissionPage() {
  const containerRef = useRef(null);
  const [activePillar, setActivePillar] = useState(pillars[0].id);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] right-[-200px] opacity-20 text-highlight" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/50 to-transparent z-10" />

        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/10 border border-white/20 text-highlight text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles size={14} /> The Blueprint
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              VISION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight to-white">MISSION</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              We are not just managing students. We are actively engineering the next generation of global innovators, thinkers, and leaders.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      {/* 2. THE DUAL MANDATE (Vision vs Mission) */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-24 md:space-y-32">
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission Card */}
          <FadeIn delay={0.2} className="h-full">
            <AnimatedCard className="h-full p-8 md:p-12 bg-surface/80 backdrop-blur-md border border-border group hover:border-accent/50 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-accent">
                <Target size={28} />
              </div>
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">Our Daily Mandate</h2>
              <h3 className="text-3xl md:text-4xl font-semibold text-primary mb-6 tracking-tight">The Mission</h3>
              <p className="text-text-muted leading-relaxed font-light text-base md:text-lg">
                To foster a secure, highly resourced, and inclusive ecosystem where IIT Patna students can seamlessly bridge the gap between academic theory and holistic personal development. We execute this through zero-tolerance safety policies, dynamic club funding, and dedicated mentorship.
              </p>
            </AnimatedCard>
          </FadeIn>

          {/* Vision Card */}
          <FadeIn delay={0.3} className="h-full">
            <AnimatedCard className="h-full p-8 md:p-12 bg-primary text-white border-none group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/10 rounded-full blur-3xl group-hover:bg-highlight/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 text-highlight">
                  <Eye size={28} />
                </div>
                <h2 className="text-[11px] font-bold text-highlight uppercase tracking-widest mb-3">The Long-Term Horizon</h2>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">The Vision</h3>
                <p className="text-white/80 leading-relaxed font-light text-base md:text-lg">
                  To be globally recognized as the premier institutional model for student welfare and technical incubation. We envision a campus where every student graduates not just as a competent engineer, but as a resilient, ethically grounded, and visionary global leader.
                </p>
              </div>
            </AnimatedCard>
          </FadeIn>
        </div>

        {/* 3. VISION 2030 DATA DASHBOARD */}
        <div>
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">Quantitative Targets</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Vision 2030 Objectives</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {visionData.map((data, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <AnimatedCard className="p-8 text-center bg-surface border-border hover:border-accent/30 group">
                  <data.icon className="mx-auto text-muted mb-6 group-hover:text-accent transition-colors duration-500" size={32} />
                  <h4 className="text-4xl md:text-5xl font-black text-primary mb-2 tracking-tight">{data.metric}</h4>
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{data.label}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 4. INTERACTIVE STRATEGIC PILLARS */}
        <div>
          <FadeIn>
            <div className="mb-8 md:mb-12">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">Strategic Framework</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">The Three Pillars</h3>
            </div>
          </FadeIn>

          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[400px]">
            {pillars.map((pillar, i) => {
              const isActive = activePillar === pillar.id;
              
              // Broken into variables to prevent code truncation when copy-pasting
              const wrapperClasses = `transition-all duration-700 ease-in-out cursor-pointer overflow-hidden rounded-3xl relative ${isActive ? "md:w-3/5 md:h-full h-[300px]" : "md:w-1/5 md:h-full h-[100px]"}`;
              const activeOpacity = isActive ? "opacity-100" : "opacity-80 hover:opacity-100";
              const bgClasses = `absolute inset-0 w-full h-full bg-gradient-to-br ${pillar.color} p-6 md:p-10 flex flex-col justify-end transition-opacity duration-500 ${activeOpacity}`;
              const titleOpacity = isActive ? "opacity-0 pointer-events-none" : "opacity-100";
              const contentOpacity = isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none";

              return (
                <FadeIn key={pillar.id} delay={0.2 + (i * 0.1)} className={wrapperClasses}>
                  <div onClick={() => setActivePillar(pillar.id)} className={bgClasses}>
                    
                    {/* Vertical Title for Desktop Inactive State */}
                    <div className={`absolute inset-0 p-8 flex items-end md:items-center justify-start md:justify-center transition-opacity duration-500 ${titleOpacity}`}>
                      <h4 className="text-white font-semibold text-lg md:-rotate-90 tracking-widest whitespace-nowrap drop-shadow-md">
                        {pillar.title}
                      </h4>
                    </div>

                    {/* Active Content */}
                    <div className={`transition-all duration-700 delay-100 ${contentOpacity}`}>
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                        <ChevronRight className="text-white" size={20} />
                      </div>
                      <h4 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">{pillar.title}</h4>
                      <p className="text-white/90 font-light text-sm md:text-base leading-relaxed max-w-lg drop-shadow-sm">
                        {pillar.desc}
                      </p>
                    </div>
                    
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}