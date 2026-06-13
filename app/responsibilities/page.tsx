import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function ResponsibilitiesPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Core Operational Mandates" subtitle="Primary remits handled directly by the administrative panel." />
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-6">
        {siteConfig.responsibilities.map((item, i) => (
          <FadeIn key={item.id} delay={0.1 + (i * 0.1)}>
            <div className="bg-surface p-10 rounded-2xl border border-border hover:border-text-muted transition-colors duration-500 h-full">
              <h3 className="text-lg font-semibold text-primary mb-3 tracking-tight">{item.title}</h3>
              <p className="text-text-muted leading-relaxed font-light">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}