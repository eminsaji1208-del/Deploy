"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "glass-card py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex flex-col group">
          <span className="text-base font-semibold tracking-tight text-primary group-hover:text-text-muted transition-colors">
            {siteConfig.institution.abbr}
          </span>
        </Link>

        {/* Desktop Minimal Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          {siteConfig.navigation.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-[13px] font-medium tracking-wide transition-all duration-300 ${isActive ? "text-primary" : "text-text-muted hover:text-primary"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button className="lg:hidden text-text-muted hover:text-primary transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full glass-card border-t border-border p-6 flex flex-col gap-5 lg:hidden"
          >
            {siteConfig.navigation.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${pathname === link.href ? "text-primary" : "text-text-muted"}`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}