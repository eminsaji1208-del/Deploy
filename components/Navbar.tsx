"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site-config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll for subtle header styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
      {/* 1. Ultra-Minimal Top Header */}
      <nav 
        className={`fixed w-full z-[60] transition-all duration-500 ${
          scrolled && !menuOpen ? "bg-surface/80 backdrop-blur-md border-b border-border py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex flex-col relative z-[60]"
            onClick={() => setMenuOpen(false)}
          >
            <span className={`text-base font-semibold tracking-tight transition-colors duration-500 ${
              menuOpen ? "text-surface" : "text-primary"
            }`}>
              {siteConfig.institution.abbr}
            </span>
          </Link>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative z-[60] text-[11px] font-medium uppercase tracking-widest transition-colors duration-500 ${
              menuOpen ? "text-surface/70 hover:text-surface" : "text-text-muted hover:text-primary"
            }`}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* 2. Premium Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center px-6"
          >
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
              {siteConfig.navigation.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div 
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.3 + (i * 0.05), duration: 0.6, ease: "easeOut" }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-2xl md:text-3xl font-light tracking-tight transition-all duration-300 flex items-center gap-4 ${
                        isActive ? "text-surface translate-x-2" : "text-surface/40 hover:text-surface hover:translate-x-2"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-surface" />}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer inside the menu for extra detail */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-10 left-0 w-full px-6 flex justify-between items-center max-w-6xl mx-auto text-[10px] uppercase tracking-widest text-surface/30"
            >
              <span>{siteConfig.institution.name}</span>
              <span>Student Affairs Operations</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}