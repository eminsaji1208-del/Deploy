import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function GalleryPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Photo Documentation" subtitle="Visual catalog of administrative operations and technical sprints." />
      <div className="max-w-6xl mx-auto px-6 py-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.gallery.map((img, i) => (
          <FadeIn key={i} delay={0.1 + (i * 0.1)}>
            <div className="group overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="h-64 bg-border relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="p-5 border-t border-border">
                <p className="text-[13px] font-medium text-primary tracking-wide">{img.caption}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}