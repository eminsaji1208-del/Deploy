import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gradient-to-b from-background to-surface pt-20">
      <div className="max-w-5xl mx-auto px-6 text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-bold uppercase tracking-wider mb-6">
          Official Administrative Portal
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tight mb-8 leading-[1.1]">
          {siteConfig.home.heroTitle}
        </h1>
        <p className="text-md md:text-xl text-text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
          {siteConfig.home.heroSubtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <Link href="/welfare" className="px-8 py-4 bg-accent text-white font-medium rounded-xl shadow-lg shadow-accent/25 hover:bg-accent/90 transition text-sm">
            Access Student Welfare
          </Link>
          <Link href="/about" className="px-8 py-4 bg-surface border border-border text-primary font-medium rounded-xl hover:bg-background transition text-sm flex items-center gap-2">
            Learn Strategy Overview <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border/60">
          {siteConfig.home.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-4xl font-black text-accent mb-1">{stat.metric}</p>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}