import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <div>
      <PageHeader title="About Student Affairs" subtitle={siteConfig.about.title} />
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-primary mb-4">Operational Architecture</h2>
          <p className="text-text-muted leading-relaxed text-sm">{siteConfig.about.description}</p>
        </div>
        <div className="lg:col-span-2 space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
          {siteConfig.about.timeline.map((item, i) => (
            <div key={i} className="relative pl-10">
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1/2" />
              <span className="font-mono font-bold text-accent text-sm">{item.year}</span>
              <h3 className="text-lg font-bold text-primary mt-1 mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}