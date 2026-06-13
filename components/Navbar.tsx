"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", href: "#about" },
    { name: "Welfare", href: "#responsibilities" },
    { name: "Initiatives", href: "#initiatives" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "glass-card py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          {siteConfig.header.logoText}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-text-muted hover:text-accent transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full glass-card py-4 flex flex-col items-center gap-4 md:hidden">
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-text-main">
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}