import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function ResourcesPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Resources & Statutory Support" subtitle="Direct downloads for regulatory manuals and operations schedules." />
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-4">
        {siteConfig.resources.map((res, i) => (
          <FadeIn key={i} delay={0.1 + (i * 0.1)}>
            <div className="p-6 border border-border rounded-2xl bg-surface flex items-center justify-between gap-4 hover:border-text-muted transition-colors">
              <div>
                <h3 className="font-semibold text-primary tracking-tight">{res.name}</h3>
                <p className="text-[13px] text-text-muted font-light mt-1">
                  <span className="uppercase tracking-widest text-[10px] mr-2">{res.category}</span> 
                  {res.type} — {res.size}
                </p>
              </div>
              <button className="text-[11px] font-medium uppercase tracking-widest text-primary border border-border px-4 py-2 rounded-full hover:bg-background transition-colors">
                Download
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}