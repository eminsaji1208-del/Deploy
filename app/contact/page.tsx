import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Contact Administration" subtitle="Direct routing data for the primary offices." />
      <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">
        
        <FadeIn delay={0.1} className="space-y-6">
          <div className="border border-border p-8 rounded-2xl bg-surface">
            <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-widest mb-3">Headquarters</h2>
            <p className="text-sm text-primary leading-relaxed font-light">{siteConfig.contact.location}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-border p-8 rounded-2xl bg-surface">
              <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-widest mb-3">Landline</h2>
              <p className="text-sm font-mono text-primary">{siteConfig.contact.phone}</p>
            </div>
            <div className="border border-border p-8 rounded-2xl bg-surface">
              <h2 className="text-[11px] font-medium text-text-muted uppercase tracking-widest mb-3">Email</h2>
              <p className="text-sm font-mono text-primary truncate">{siteConfig.contact.email}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form className="bg-surface p-10 rounded-2xl border border-border space-y-6">
            <h3 className="text-lg font-semibold text-primary mb-4 tracking-tight">Formal Request</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-widest text-text-muted mb-2">Name</label>
                <input type="text" required className="w-full border-b border-border bg-transparent p-2 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-widest text-text-muted mb-2">Email</label>
                <input type="email" required className="w-full border-b border-border bg-transparent p-2 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-widest text-text-muted mb-2">Message</label>
              <textarea rows={4} required className="w-full border border-border bg-transparent rounded-lg p-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white font-medium rounded-xl text-[13px] hover:bg-secondary transition-colors">
              Dispatch Communication
            </button>
          </form>
        </FadeIn>

      </div>
    </div>
  );
}