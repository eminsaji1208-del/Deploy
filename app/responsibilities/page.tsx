import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import { Briefcase } from "lucide-react";

export default function ResponsibilitiesPage() {
  return (
    <div>
      <PageHeader title="Core Operational Mandates" subtitle="Primary remits handled directly by the administrative panel." />
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">
        {siteConfig.responsibilities.map((item) => (
          <div key={item.id} className="glass-card p-8 rounded-2xl border flex gap-6 items-start">
            <div className="p-3 bg-accent/15 rounded-xl text-accent shrink-0"><Briefcase size={20} /></div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}