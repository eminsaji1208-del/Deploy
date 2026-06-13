"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { ArrowRight, Mail } from "lucide-react";

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

  return (
    <>
      {/* 1. Refined, Tighter Floating Pill */}
      <nav className="fixed top-0 left-0 w-full z-[60] pt-6 px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div 
            className={`pointer-events-auto transition-all duration-500 flex justify-between items-center px-8 py-3.5 rounded-full ${
              scrolled && !menuOpen 
                ? "glass-card w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                : "w-full bg-transparent"
            }`}
          >
            <Link 
              href="/" 
              className="flex items-center gap-2 relative z-[60]"
              onClick={() => setMenuOpen(false)}
            >
              <span className={`w-2 h-2 rounded-full ${menuOpen ? "bg-accent" : "bg-primary"}`} />
              <span className={`text-sm font-semibold tracking-wide transition-colors duration-500 ${
                menuOpen ? "text-white" : "text-primary"
              }`}>
                {siteConfig.institution.abbr}
              </span>
            </Link>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative z-[60] text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                menuOpen ? "text-white/70 hover:text-white" : "text-text-muted hover:text-primary"
              }`}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Organized Split-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-primary flex flex-col justify-center overflow-hidden"
          >
            <div className="w-full max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-16 pt-10">
              
              {/* Left: Clean Navigation Grid */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-8">Navigation Directory</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  {siteConfig.navigation.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div 
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.03), duration: 0.4 }}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`text-xl md:text-2xl font-light tracking-wide transition-all duration-300 flex items-center group ${
                            isActive ? "text-white" : "text-white/40 hover:text-white"
                          }`}
                        >
                          <span className={`transition-all duration-300 overflow-hidden flex items-center ${isActive ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100"}`}>
                            <ArrowRight className="text-accent shrink-0" size={16} />
                          </span>
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Elegant Subscription Box */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="md:col-span-5 flex flex-col justify-center md:border-l border-white/10 md:pl-16"
              >
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8">
                  <h3 className="text-white text-lg font-semibold mb-2">Campus Newsletter</h3>
                  <p className="text-white/50 text-xs mb-6 leading-relaxed font-light">
                    Subscribe for urgent announcements and operational updates directly to your inbox.
                  </p>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="University Email" 
                      className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    />
                    <button className="absolute right-0 top-1 text-accent hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
                      Subscribe
                    </button>
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