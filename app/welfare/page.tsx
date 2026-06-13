import { siteConfig } from "@/data/site-config";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard"; // Import the new card!

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-background pt-20">
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface border border-border rounded-full text-text-muted text-[10px] font-bold tracking-widest uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
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
            <Link href="/welfare" className="px-7 py-3.5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-colors text-sm shadow-[0_4px_14px_0_rgba(0,102,255,0.2)]">
              Access Resources
            </Link>
            <Link href="/about" className="px-7 py-3.5 bg-transparent border border-border text-text-main font-medium rounded-full hover:bg-surface transition-colors text-sm flex items-center gap-2 group">
              Our Strategy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-border">
          {siteConfig.home.stats.map((stat, i) => (
            <FadeIn key={i} delay={0.5 + (i * 0.1)}>
              {/* Wrapping the stats in our new AnimatedCard! */}
              <AnimatedCard className="p-6 text-center h-full flex flex-col justify-center">
                <p className="text-3xl font-semibold text-primary mb-2 tracking-tight">{stat.metric}</p>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </p>
              </AnimatedCard>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}