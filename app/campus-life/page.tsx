import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function CampusLifePage() {
  return (
    <div>
      <PageHeader title="Campus Life Showcase" subtitle={siteConfig.campusLife.intro} />
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        {siteConfig.campusLife.categories.map((cat, i) => (
          <div key={i} className="border border-border rounded-2xl p-8 bg-surface">
            <h2 className="text-xl font-bold text-primary mb-6 pb-2 border-b">{cat.title}</h2>
            <ul className="space-y-3">
              {cat.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-text-muted font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}