import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function CampusLifePage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Campus Life Showcase" subtitle={siteConfig.campusLife.intro} />
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-8">
        {siteConfig.campusLife.categories.map((cat, i) => (
          <FadeIn key={i} delay={0.1 + (i * 0.1)}>
            <div className="border border-border rounded-2xl p-10 bg-surface h-full">
              <h2 className="text-lg font-semibold text-primary mb-6 pb-4 border-b border-border tracking-tight">{cat.title}</h2>
              <ul className="space-y-4">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-sm text-text-muted font-light">
                    <span className="w-1 h-1 rounded-full bg-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}