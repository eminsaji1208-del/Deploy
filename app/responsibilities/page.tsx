"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale, ShieldAlert, Gavel, FileWarning, ScrollText, UserCheck } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

const mandates = [
  { icon: ShieldAlert, title: "Campus Security & Anti-Ragging", desc: "Enforcing strict zero-tolerance policies to ensure a physically and psychologically safe environment for every student." },
  { icon: Scale, title: "Grievance Redressal", desc: "Providing a neutral, transparent platform to resolve conflicts between students, administration, or external entities." },
  { icon: ScrollText, title: "Policy Formulation", desc: "Drafting the rules that govern hostel living, club funding, and cultural festival operations." }
];

const studentDuties = [
  { icon: UserCheck, title: "Academic Integrity", desc: "Maintaining the highest standards of honesty in examinations, assignments, and research publications." },
  { icon: FileWarning, title: "Code of Conduct", desc: "Adhering strictly to the institutional guidelines regarding substance abuse, property damage, and mutual respect." },
  { icon: Gavel, title: "Gymkhana Governance", desc: "Electing representatives fairly and participating actively in the democratic processes of the Student Gymkhana." }
];

export default function ResponsibilitiesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      
      // 3D Hover Tilt Effect for Policy Cards
      const cards = document.querySelectorAll('.policy-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          anime({
            targets: card,
            translateY: -10,
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(15,91,150,0.15)',
            duration: 600,
            easing: 'easeOutElastic(1, .5)'
          });
        });
        card.addEventListener('mouseleave', () => {
          anime({
            targets: card,
            translateY: 0,
            scale: 1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            duration: 400,
            easing: 'easeOutQuad'
          });
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] left-[-300px] opacity-10 text-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              DUTIES & <span className="text-highlight">MANDATES</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
              A thriving campus requires a delicate balance of institutional support and student accountability.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-24">
        
        {/* OFFICE MANDATES */}
        <div>
          <FadeIn>
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2">Our Obligations</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">What We Handle</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mandates.map((item, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <AnimatedCard className="policy-card h-full p-8 bg-surface border-border group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                  <p className="text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* STUDENT EXPECTATIONS */}
        <div className="relative">
          <AnimeOrganicShape className="w-[400px] h-[400px] bottom-[-100px] right-[-100px] opacity-20 text-muted" />
          
          <FadeIn>
            <div className="mb-10 text-center md:text-left relative z-10">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2">Student Expectations</h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Code of Conduct</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {studentDuties.map((item, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <AnimatedCard className="policy-card h-full p-8 bg-primary border-none text-white group cursor-default relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/10 rounded-full blur-[40px] group-hover:bg-highlight/30 transition-colors" />
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-highlight group-hover:bg-highlight group-hover:text-primary transition-colors duration-300 relative z-10">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 relative z-10">{item.title}</h4>
                  <p className="text-sm text-white/70 font-light leading-relaxed relative z-10">{item.desc}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}