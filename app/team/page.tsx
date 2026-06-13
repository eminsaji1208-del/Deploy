import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import { Mail } from "lucide-react";

export default function TeamPage() {
  return (
    <div>
      <PageHeader title="Meet the Leadership" subtitle="Administrative and pastoral team dedicated to student management protocols." />
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        {siteConfig.team.map((member, i) => (
          <div key={i} className="border border-border rounded-2xl p-6 bg-surface text-center">
            <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-lg font-bold text-primary">{member.name}</h3>
            <p className="text-xs font-medium text-accent uppercase tracking-wider mt-1 mb-4">{member.role}</p>
            <div className="pt-4 border-t border-border text-left space-y-2 text-xs text-text-muted">
              <p><strong>Office Locator:</strong> {member.office}</p>
              <p className="flex items-center gap-1.5"><Mail size={12} /> {member.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}