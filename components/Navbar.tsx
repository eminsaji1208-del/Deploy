"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "glass-card py-3 border-b" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span className="text-md font-bold tracking-tight text-primary leading-none">{siteConfig.institution.abbr}</span>
          <span className="text-xs text-text-muted mt-0.5">{siteConfig.institution.office}</span>
        </Link>

        {/* Multi-Page Links Desktop */}
        <div className="hidden lg:flex gap-6 items-center">
          {siteConfig.navigation.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${isActive ? "text-accent" : "text-text-muted hover:text-primary"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button className="lg:hidden text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full glass-card border-b p-6 flex flex-col gap-4 lg:hidden">
          {siteConfig.navigation.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-bold ${pathname === link.href ? "text-accent" : "text-text-main"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}