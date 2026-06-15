"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Send, Compass } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import AnimatedCard from "@/components/AnimatedCard";

export default function ContactPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      
      // Floating animation for the info cards
      anime({
        targets: '.contact-float',
        translateY: [-5, 5],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 3000,
        delay: anime.stagger(300)
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[600px] h-[600px] top-[-100px] left-[-200px] opacity-10 text-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              CONNECT WITH <span className="text-highlight">US</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 font-light tracking-wide leading-relaxed">
              We are here to support your journey. Reach out to the Student Affairs Office directly.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Contact Information Cards */}
          <div className="md:col-span-5 space-y-6">
            <FadeIn delay={0.1}>
              <AnimatedCard className="contact-float p-8 bg-surface border-border flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Office Location</h4>
                  <p className="text-sm text-text-muted leading-relaxed font-light">
                    Office of Student Affairs, First Floor, Admin Block,<br />
                    IIT Patna, Bihta, Bihar 801106
                  </p>
                </div>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="contact-float p-8 bg-surface border-border flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Digital Comm</h4>
                  <p className="text-sm text-text-muted leading-relaxed font-light mb-1">dosa@iitp.ac.in (Official)</p>
                  <p className="text-sm text-text-muted leading-relaxed font-light">gymkhana@iitp.ac.in (Student Body)</p>
                </div>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <AnimatedCard className="contact-float p-8 bg-surface border-border flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2">Emergency Lines</h4>
                  <p className="text-sm text-text-muted leading-relaxed font-light mb-1">+91-612-255-2001 (DoSA Office)</p>
                  <p className="text-sm text-red-500 font-bold">+91-612-255-XXXX (24/7 Helpline)</p>
                </div>
              </AnimatedCard>
            </FadeIn>
          </div>

          {/* Interactive Form */}
          <div className="md:col-span-7">
            <FadeIn delay={0.4} className="h-full">
              <AnimatedCard className="p-8 md:p-12 bg-surface border-border h-full">
                <h3 className="text-2xl font-bold text-primary mb-8 tracking-tight flex items-center gap-3">
                  <Compass className="text-accent" /> Send an Inquiry
                </h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                      <input type="text" className="w-full bg-background border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Roll Number</label>
                      <input type="text" className="w-full bg-background border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm" placeholder="2301XX" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Topic</label>
                    <select className="w-full bg-background border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Welfare & Support</option>
                      <option>Club Funding</option>
                      <option>Grievance Redressal</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Message</label>
                    <textarea rows={5} className="w-full bg-background border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm resize-none" placeholder="How can we assist you today?"></textarea>
                  </div>

                  <button className="w-full py-4 bg-accent text-white font-bold rounded-xl shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3 group">
                    Submit Inquiry <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </AnimatedCard>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
}