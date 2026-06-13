import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-background pt-20">
      <div className="max-w-5xl mx-auto px-6 py-20 w-full">
        
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full text-text-muted text-[11px] font-medium tracking-widest uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Official Portal
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-semibold text-primary tracking-tight mb-8 leading-[1.05]">
            {siteConfig.home.heroTitle}
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mb-12 leading-relaxed font-light">
            {siteConfig.home.heroSubtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mb-24">
            <Link href="/welfare" className="px-6 py-3 bg-accent text-white font-medium rounded-full hover:scale-105 transition-transform duration-300 text-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
              Access Resources
            </Link>
            <Link href="/about" className="px-6 py-3 bg-transparent border border-border text-text-main font-medium rounded-full hover:bg-surface hover:border-text-muted transition-all duration-300 text-sm flex items-center gap-2 group">
              Our Strategy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-12 border-t border-border">
          {siteConfig.home.stats.map((stat, i) => (
            <FadeIn key={i} delay={0.5 + (i * 0.1)} direction="up">
              <div>
                <p className="text-3xl md:text-4xl font-semibold text-primary mb-2 tracking-tight">{stat.metric}</p>
                <p className="text-[11px] font-medium text-text-muted uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}