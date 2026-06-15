"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeartPulse, PhoneCall, ShieldCheck, GraduationCap, FileText, ArrowRight, LifeBuoy } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import Link from "next/link";

const supportPillars = [
  { icon: HeartPulse, title: "Psychological Counseling", desc: "Access 4 full-time clinical psychologists and 15+ peer-support mentors. 100% confidential sessions.", data: "24/7 Availability" },
  { icon: GraduationCap, title: "Financial Aid (MCM)", desc: "Merit-cum-Means scholarships and emergency grants for students facing unforeseen financial hardships.", data: "₹15M+ Disbursed" },
  { icon: ShieldCheck, title: "Anti-Ragging Cell", desc: "A zero-tolerance campus. Immediate anonymous reporting and rapid-response disciplinary committee.", data: "Strictly Enforced" },
  { icon: LifeBuoy, title: "Medical Emergency", desc: "Fully equipped campus hospital with 24/7 ambulance service and ties to premier city hospitals.", data: "3min Response" }
];

export default function WelfarePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;

      // 1. Calming Pulse for Emergency Button
      anime({
        targets: '.emergency-pulse',
        boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 20px rgba(239, 68, 68, 0)'],
        loop: true,
        easing: 'linear',
        duration: 1500
      });

      // 2. Elastic Lift for Support Cards
      const cards = document.querySelectorAll('.welfare-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          anime({ targets: card, translateY: -10, scale: 1.02, duration: 600, easing: 'easeOutElastic(1, .5)' });
        });
        card.addEventListener('mouseleave', () => {
          anime({ targets: card, translateY: 0, scale: 1, duration: 400, easing: 'easeOutQuad' });
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[600px] h-[600px] top-[-100px] left-[-200px] opacity-10 text-accent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              STUDENT <span className="text-highlight">WELFARE</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-10">
              Your physical safety, mental health, and financial security are our absolute highest priorities. You are never alone at IIT Patna.
            </p>
            
            {/* Pulsing Emergency Action */}
            <div className="flex justify-center">
              <a href="tel:+911234567890" className="emergency-pulse inline-flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors duration-300 shadow-lg">
                <PhoneCall size={20} />
                <span>24/7 Emergency Helpline</span>
              </a>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-20 md:space-y-32">
        
        {/* WELFARE PILLARS */}
        <div>
          <FadeIn>
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2">Support Infrastructure</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Core Welfare Pillars</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {supportPillars.map((pillar, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <div className="welfare-card h-full p-8 md:p-10 bg-surface border border-border rounded-3xl cursor-pointer shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-accent/5 px-4 py-2 rounded-bl-3xl text-[10px] font-bold text-accent uppercase tracking-widest">
                    {pillar.data}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <pillar.icon size={28} />
                  </div>
                  <h4 className="text-xl md:text-2xl font-semibold text-primary mb-3 tracking-tight">{pillar.title}</h4>
                  <p className="text-sm md:text-base text-text-muted font-light leading-relaxed max-w-sm">
                    {pillar.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* FINANCIAL AID BANNER */}
        <FadeIn>
          <AnimatedCard className="p-8 md:p-12 bg-primary text-white border-none flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <AnimeOrganicShape className="w-[400px] h-[400px] top-[-100px] right-[-100px] opacity-20 text-highlight" />
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <FileText className="text-highlight mb-4 mx-auto md:mx-0" size={32} />
              <h3 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">Scholarships & Financial Aid</h3>
              <p className="text-white/80 font-light leading-relaxed text-sm md:text-base mb-6">
                No student should compromise their education due to financial constraints. We process state, central, and institute-level grants, including the MCM Scholarship and Alumni-funded endowments.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-primary font-bold rounded-full hover:bg-white transition-colors text-sm">
                Apply for Aid <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedCard>
        </FadeIn>

      </div>
    </div>
  );
}