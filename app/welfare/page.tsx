import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function WelfarePage() {
  return (
    <div>
      <PageHeader title="Student Welfare Framework" subtitle={siteConfig.welfare.summary} />
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div>
          <h2 className="text-2xl font-black text-primary mb-8">Available Scholarships & Development Grants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {siteConfig.welfare.scholarships.map((s, i) => (
              <div key={i} className="border border-border rounded-xl p-6 bg-surface">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">{s.coverage}</span>
                <h3 className="text-lg font-bold text-primary mt-2 mb-3">{s.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed"><strong>Pre-requisites:</strong> {s.eligibility}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-primary mb-8">Healthcare & Essential Advisory Programs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {siteConfig.welfare.services.map((s, i) => (
              <div key={i} className="glass-card p-6 rounded-xl border flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-primary">{s.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{s.type}</p>
                </div>
                <span className="text-xs font-medium bg-background px-3 py-1 border rounded-md">{s.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}