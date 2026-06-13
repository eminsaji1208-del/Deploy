import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function GalleryPage() {
  return (
    <div>
      <PageHeader title="Photo Documentation Gallery" subtitle="Visual catalog of administrative operations and technical sprints." />
      <div className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.gallery.map((img, i) => (
          <div key={i} className="group overflow-hidden rounded-xl border bg-surface">
            <div className="h-56 bg-border relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-primary">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}