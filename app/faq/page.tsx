"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

const faqs = [
  { q: "How do I report a ragging incident?", a: "IIT Patna operates on a zero-tolerance policy. You can immediately call our 24/7 emergency helpline or use the anonymous reporting form on the Welfare page. The Anti-Ragging Committee will intervene within minutes." },
  { q: "How can my club secure funding for a project?", a: "Registered clubs must submit a technical proposal to the Technical Incubation board by the 5th of every month. Approved projects receive funding directly into the club's administrative account within 14 days." },
  { q: "Is the psychological counseling strictly confidential?", a: "Absolutely. Student records regarding mental health counseling are strictly sealed and are never shared with academic professors, placement cells, or parents without your explicit written consent." },
  { q: "How do I book equipment in the MakerSpace?", a: "Access is managed via your Student ID card. You can reserve specific machines (like 3D printers or CNC routers) through the Student Gymkhana portal up to 48 hours in advance." },
  { q: "Who is eligible for the MCM Scholarship?", a: "The Merit-cum-Means (MCM) scholarship is available to undergraduate students whose gross family income falls below the prescribed bracket and who maintain a minimum CPI of 6.5. Applications open every August." }
];

export default function FAQPage() {
  const containerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      
      // Staggered snap-in effect for FAQ items
      anime({
        targets: '.faq-item',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 200 }),
        easing: 'easeOutQuint',
        duration: 800
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-10 text-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              COMMON <span className="text-highlight">QUESTIONS</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 font-light tracking-wide leading-relaxed">
              Clear, definitive answers regarding campus life, funding, and support systems.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-30">
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`faq-item opacity-0 bg-surface border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent shadow-md' : 'border-border hover:border-accent/40 cursor-pointer'}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-semibold text-primary tracking-tight flex items-center gap-3">
                    <MessageCircle size={20} className={isOpen ? 'text-accent' : 'text-text-muted'} />
                    {faq.q}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-accent text-white rotate-180' : 'bg-background text-primary'}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 md:p-8 pt-0 text-text-muted font-light leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}