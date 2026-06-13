import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function InitiativesPage() {
  return (
    <div>
      <PageHeader title="Strategic Student Operations" subtitle="Annual operational pipelines designed to advance functional output." />
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-6">
        {siteConfig.initiatives.map((init, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">{init.target}</span>
              <h2 className="text-xl font-bold text-primary mt-3 mb-2">{init.title}</h2>
              <p className="text-sm text-text-muted leading-relaxed">{init.scope}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}