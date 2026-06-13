import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function WelfarePage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Student Welfare Framework" subtitle={siteConfig.welfare.summary} />
      <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">
        
        <div>
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-semibold text-primary mb-8 tracking-tight border-b border-border pb-4">Scholarships & Grants</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {siteConfig.welfare.scholarships.map((s, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <div className="border border-border rounded-2xl p-8 bg-surface">
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-widest border border-border px-2 py-1 rounded-md">{s.coverage}</span>
                  <h3 className="text-lg font-semibold text-primary mt-4 mb-2">{s.title}</h3>
                  <p className="text-sm text-text-muted font-light leading-relaxed">Eligibility: {s.eligibility}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div>
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-semibold text-primary mb-8 tracking-tight border-b border-border pb-4">Healthcare Advisory</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {siteConfig.welfare.services.map((s, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <div className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{s.name}</h3>
                    <p className="text-sm text-text-muted font-light">{s.type}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <span className="text-[11px] text-text-muted uppercase tracking-wide">Location: {s.location}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}