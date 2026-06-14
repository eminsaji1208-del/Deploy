"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { ArrowRight, MapPin } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [menuOpen]);

  // Anime.js hover effect (Disabled on mobile for performance/UX)
  useEffect(() => {
    if (window.innerWidth > 768) {
      import("animejs").then((animeModule: any) => {
        const anime = animeModule.default || animeModule;
        const letters = document.querySelectorAll(".nav-letter");
        const brandContainer = document.getElementById("brand-container");

        const playAnimation = () => {
          anime({
            targets: letters,
            translateY: [-4, 0],
            scale: [1.1, 1],
            delay: anime.stagger(25),
            duration: 600,
            easing: "easeOutElastic(1, .5)"
          });
        };

        brandContainer?.addEventListener("mouseenter", playAnimation);
        return () => brandContainer?.removeEventListener("mouseenter", playAnimation);
      });
    }
  }, []);

  const mapLink = "https://www.google.com/maps/place/Indian+Institute+of+Technology+Patna";
  const brandName = "Student Affairs Office";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] pt-4 md:pt-6 px-4 md:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div 
            className={`pointer-events-auto transition-all duration-500 flex justify-between items-center px-5 md:px-8 py-3 md:py-3.5 rounded-full ${
              scrolled && !menuOpen 
                ? "glass-card w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-surface/90" 
                : "w-full bg-transparent"
            }`}
          >
            {/* Mobile-Responsive Logo Block */}
            <Link href="/" id="brand-container" className="flex items-center gap-3 relative z-[60]" onClick={() => setMenuOpen(false)}>
              <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg bg-white shadow-sm flex items-center justify-center overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/iitp-logo.png" alt="IIT Patna" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-accent mb-0.5">
                  IIT Patna
                </span>
                <span className={`font-bold tracking-tight transition-colors duration-500 flex items-center ${
                  menuOpen ? "text-white" : scrolled ? "text-primary" : "text-white"
                }`}>
                  {/* Mobile Truncation */}
                  <span className="text-sm sm:hidden">SAO</span>
                  {/* Desktop Full Text */}
                  <span className="hidden sm:flex text-sm md:text-base">
                    {brandName.split("").map((char, i) => (
                      <span key={i} className="nav-letter inline-block whitespace-pre">{char}</span>
                    ))}
                  </span>
                </span>
              </div>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 md:gap-6 relative z-[60]">
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className={`hidden md:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 hover:text-accent ${menuOpen ? "text-white/70" : scrolled ? "text-text-muted" : "text-white/80"}`}>
                <MapPin size={14} /> View Campus
              </a>
              <div className={`hidden md:block w-[1px] h-4 ${menuOpen ? "bg-white/20" : scrolled ? "bg-border" : "bg-white/20"}`} />
              <button onClick={() => setMenuOpen(!menuOpen)} className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest px-2 py-1 transition-colors duration-500 ${menuOpen ? "text-white hover:text-highlight" : scrolled ? "text-primary hover:text-accent" : "text-white hover:text-accent"}`}>
                {menuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile-Friendly Scrolling Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
           <motion.div initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-50 bg-primary overflow-y-auto">
             <div className="w-full max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8 md:gap-16 pt-32 pb-20 min-h-screen">
               
               <div className="md:col-span-7 flex flex-col justify-center">
                 <p className="text-highlight text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8">Navigation Directory</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-12">
                   {siteConfig.navigation.map((link, i) => (
                     <motion.div key={link.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.03), duration: 0.4 }}>
                       <Link href={link.href} onClick={() => setMenuOpen(false)} className={`text-xl md:text-2xl font-light tracking-wide transition-all duration-300 flex items-center group ${pathname === link.href ? "text-white" : "text-white/50 hover:text-white"}`}>
                         <span className={`transition-all duration-300 overflow-hidden flex items-center ${pathname === link.href ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"}`}>
                           <ArrowRight className="text-highlight shrink-0" size={16} />
                         </span>
                         {link.label}
                       </Link>
                     </motion.div>
                   ))}
                 </div>
               </div>

               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="md:col-span-5 flex flex-col justify-center md:border-l border-white/10 md:pl-16 mt-8 md:mt-0">
                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl mb-8">
                   <h3 className="text-white text-lg font-semibold mb-2">Student Affairs Newsletter</h3>
                   <p className="text-white/50 text-xs mb-6 leading-relaxed font-light">Subscribe for urgent administrative announcements directly to your inbox.</p>
                   <div className="relative">
                     <input type="email" placeholder="University Email" className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-highlight transition-colors rounded-none" />
                     <button className="absolute right-0 top-1 text-highlight hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Subscribe</button>
                   </div>
                 </div>
                 <div>
                   <p className="text-white text-base">{siteConfig.contact.email}</p>
                   <p className="text-white/50 text-xs mt-1 font-mono">{siteConfig.contact.phone}</p>
                 </div>
               </motion.div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}