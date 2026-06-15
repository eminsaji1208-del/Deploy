"use client";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/data/site-config";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

const adminTeam = [
  { name: "Dr. A. K. Rajput", role: "Dean of Student Affairs (DoSA)", email: "dosa@iitp.ac.in", phone: "+91-612-255-2001", initials: "AR" },
  { name: "Dr. Smita Sharma", role: "Associate Dean (Welfare)", email: "adosa_w@iitp.ac.in", phone: "+91-612-255-2002", initials: "SS" },
  { name: "Dr. R. K. Verma", role: "Associate Dean (Hostels)", email: "adosa_h@iitp.ac.in", phone: "+91-612-255-2003", initials: "RV" },
];

const studentReps = [
  { name: "Rahul Deshmukh", role: "Vice President, Student Gymkhana", email: "vp_gymkhana@iitp.ac.in", initials: "RD" },
  { name: "Ananya Singh", role: "General Secretary, Cultural", email: "gensec_cult@iitp.ac.in", initials: "AS" },
  { name: "Karthik Iyer", role: "General Secretary, Technical", email: "gensec_tech@iitp.ac.in", initials: "KI" },
  { name: "Priya Malik", role: "General Secretary, Sports", email: "gensec_sports@iitp.ac.in", initials: "PM" },
];

export default function TeamPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;

      // 1. Cascading Deck Reveal for Profile Cards
      anime({
        targets: '.profile-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, { start: 300 }),
        easing: 'easeOutElastic(1, .8)',
        duration: 800
      });

      // 2. Avatar Hover Physics
      const cards = document.querySelectorAll('.profile-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          anime({ targets: card.querySelector('.avatar-box'), scale: 1.1, rotate: 5, duration: 400, easing: 'easeOutQuad' });
        });
        card.addEventListener('mouseleave', () => {
          anime({ targets: card.querySelector('.avatar-box'), scale: 1, rotate: 0, duration: 400, easing: 'easeOutQuad' });
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[800px] h-[800px] top-[-300px] right-[-200px] opacity-10 text-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              OUR <span className="text-highlight">TEAM</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide leading-relaxed mb-10">
              Meet the dedicated administrators and elected student representatives who govern, protect, and elevate the IIT Patna community.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-24 md:space-y-32">
        
        {/* CORE ADMINISTRATION */}
        <div>
          <FadeIn>
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <Briefcase size={14} /> Executive Board
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Core Administration</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminTeam.map((member, i) => (
              <div key={i} className="profile-card opacity-0 p-8 bg-surface border border-border rounded-3xl group cursor-pointer hover:border-accent/40 transition-colors shadow-sm hover:shadow-md">
                <div className="avatar-box w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 text-2xl font-black text-white shadow-lg">
                  {member.initials}
                </div>
                <h4 className="text-xl font-bold text-primary mb-1">{member.name}</h4>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-6">{member.role}</p>
                
                <div className="space-y-3 text-sm text-text-muted font-light">
                  <p className="flex items-center gap-3"><Mail size={14} className="text-primary/50" /> {member.email}</p>
                  <p className="flex items-center gap-3"><Phone size={14} className="text-primary/50" /> {member.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENT REPRESENTATIVES */}
        <div className="relative">
          <AnimeOrganicShape className="w-[500px] h-[500px] bottom-[-200px] left-[-200px] opacity-10 text-primary" />
          <FadeIn>
            <div className="mb-10 text-center md:text-left relative z-10">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <GraduationCap size={14} /> Elected Leaders
              </h2>
              <h3 className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">Student Gymkhana</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {studentReps.map((rep, i) => (
              <div key={i} className="profile-card opacity-0 p-6 bg-surface border border-border rounded-2xl group cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                <div className="avatar-box w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-5 text-lg font-bold text-accent group-hover:bg-white group-hover:text-primary transition-colors">
                  {rep.initials}
                </div>
                <h4 className="text-lg font-bold mb-1">{rep.name}</h4>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4 group-hover:text-white/70">{rep.role}</p>
                <p className="flex items-center gap-2 text-xs font-light group-hover:text-white/90">
                  <Mail size={12} /> {rep.email}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}