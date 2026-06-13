import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="About Student Affairs" subtitle={siteConfig.about.title} />
      <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-3 gap-16">
        <FadeIn delay={0.1} className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-primary mb-4 tracking-tight">Operational Architecture</h2>
          <p className="text-text-muted leading-relaxed font-light">{siteConfig.about.description}</p>
        </FadeIn>
        <div className="lg:col-span-2 space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
          {siteConfig.about.timeline.map((item, i) => (
            <FadeIn key={i} delay={0.2 + (i * 0.1)} className="relative pl-12">
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
              <span className="font-mono font-medium text-text-muted text-[11px] uppercase tracking-widest">{item.year}</span>
              <h3 className="text-lg font-semibold text-primary mt-1 mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed font-light">{item.details}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}