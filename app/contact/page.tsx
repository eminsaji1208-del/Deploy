import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact Administration" subtitle="Direct routing data for the primary offices." />
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="border border-border p-6 rounded-xl bg-surface">
            <h2 className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Physical Headquarters</h2>
            <p className="text-sm text-text-main leading-relaxed">{siteConfig.contact.location}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border p-6 rounded-xl bg-surface">
              <h2 className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Direct Landline</h2>
              <p className="text-sm font-mono font-bold text-primary">{siteConfig.contact.phone}</p>
            </div>
            <div className="border border-border p-6 rounded-xl bg-surface">
              <h2 className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Secure Email Inbox</h2>
              <p className="text-sm font-mono text-primary truncate">{siteConfig.contact.email}</p>
            </div>
          </div>
          <div className="border border-border p-6 rounded-xl bg-surface">
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Operational Windows</h2>
            <p className="text-sm text-text-main font-medium">{siteConfig.contact.hours}</p>
          </div>
        </div>

        <form className="glass-card p-8 rounded-2xl border space-y-4">
          <h3 className="text-lg font-bold text-primary mb-2">Submit Formal Administrative Request</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-text-muted mb-1">Full Name</label>
              <input type="text" required className="w-full border border-border bg-background rounded-lg p-2.5 text-sm focus:outline-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-text-muted mb-1">University Roll Number / Email</label>
              <input type="text" required className="w-full border border-border bg-background rounded-lg p-2.5 text-sm focus:outline-accent" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-text-muted mb-1">Formal Statement Content</label>
            <textarea rows={4} required className="w-full border border-border bg-background rounded-lg p-2.5 text-sm focus:outline-accent resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-primary/90 transition">
            Dispatch Communication
          </button>
        </form>
      </div>
    </div>
  );
}