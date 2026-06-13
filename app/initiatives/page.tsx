import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function InitiativesPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Strategic Student Operations" subtitle="Annual operational pipelines designed to advance functional output." />
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-8">
        {siteConfig.initiatives.map((init, i) => (
          <FadeIn key={i} delay={0.1 + (i * 0.1)}>
            <div className="bg-surface p-10 rounded-2xl border border-border group hover:border-text-muted transition-colors duration-500">
              <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{init.target}</span>
              <h2 className="text-xl font-semibold text-primary mt-2 mb-3 tracking-tight">{init.title}</h2>
              <p className="text-text-muted leading-relaxed font-light">{init.scope}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}