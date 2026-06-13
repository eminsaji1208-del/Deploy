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
      {/* 1. Floating Glass Pill Header */}
      <nav className="fixed top-0 left-0 w-full z-[60] pt-6 px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div 
            className={`pointer-events-auto transition-all duration-500 flex justify-between items-center px-6 py-3 rounded-full ${
              scrolled && !menuOpen 
                ? "glass-card w-full md:w-3/4 shadow-lg shadow-accent/5" 
                : "w-full bg-transparent"
            }`}
          >
            <Link 
              href="/" 
              className="flex flex-col relative z-[60]"
              onClick={() => setMenuOpen(false)}
            >
              <span className={`text-base font-bold tracking-tight transition-colors duration-500 ${
                menuOpen ? "text-white" : "text-primary"
              }`}>
                {siteConfig.institution.abbr}
                <span className={menuOpen ? "text-accent" : "text-accent"}>.</span>
              </span>
            </Link>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative z-[60] flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                menuOpen ? "text-white/70 hover:text-white" : "text-primary hover:text-accent"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Premium Split-Screen Overlay with Subscription */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-primary flex flex-col justify-center overflow-hidden"
          >
            {/* Background Accent Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 pt-20">
              
              {/* Left Side: Navigation Links */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <p className="text-accent text-[11px] font-bold uppercase tracking-widest mb-4">Navigation</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {siteConfig.navigation.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div 
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: 0.2 + (i * 0.05), duration: 0.5 }}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`text-2xl md:text-4xl font-semibold tracking-tight transition-all duration-300 flex items-center gap-4 group ${
                            isActive ? "text-white" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {link.label}
                          <ArrowRight className={`opacity-0 -translate-x-4 transition-all duration-300 text-accent ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"}`} size={24} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Subscription & Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="md:col-span-5 flex flex-col justify-end border-t md:border-t-0 md:border-l border-white/10 md:pl-12 pt-8 md:pt-0"
              >
                {/* Subscription Box */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8 backdrop-blur-md">
                  <Mail className="text-accent mb-4" size={28} />
                  <h3 className="text-white text-xl font-bold mb-2">Student Newsletter</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Subscribe to get urgent campus announcements and structural updates directly to your inbox.
                  </p>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="University Email..." 
                      className="w-full bg-primary border border-white/20 rounded-full py-3 px-5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    />
                    <button className="absolute right-1 top-1 bottom-1 bg-accent hover:bg-accent/80 transition-colors text-white text-[11px] font-bold uppercase tracking-wider px-4 rounded-full">
                      Join
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div>
                  <p className="text-accent text-[11px] font-bold uppercase tracking-widest mb-4">Direct Contact</p>
                  <p className="text-white text-lg">{siteConfig.contact.email}</p>
                  <p className="text-white/60 text-sm mt-1">{siteConfig.contact.phone}</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}