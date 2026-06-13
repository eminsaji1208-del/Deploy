import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import { Download } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader title="Resources & Statutory Support" subtitle="Direct downloads for regulatory manuals and operations schedules." />
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-4">
        {siteConfig.resources.map((res, i) => (
          <div key={i} className="p-5 border border-border rounded-xl bg-surface flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">{res.category}</span>
              <h3 className="font-bold text-primary mt-1.5 text-sm md:text-base">{res.name}</h3>
              <p className="text-xs text-text-muted mt-0.5">{res.type} — {res.size}</p>
            </div>
            <button className="p-3 bg-background hover:bg-border border rounded-xl text-primary transition shrink-0">
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}