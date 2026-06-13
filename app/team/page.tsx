import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function TeamPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Meet the Leadership" subtitle="Administrative and pastoral team dedicated to student management." />
      <div className="max-w-6xl mx-auto px-6 py-24 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {siteConfig.team.map((member, i) => (
          <FadeIn key={i} delay={0.1 + (i * 0.1)}>
            <div className="border border-border rounded-2xl p-8 bg-surface text-center hover:border-text-muted transition-colors duration-500">
              <div className="w-16 h-16 bg-background border border-border text-primary rounded-full flex items-center justify-center font-semibold text-lg mx-auto mb-6">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-base font-semibold text-primary tracking-tight">{member.name}</h3>
              <p className="text-[11px] text-text-muted uppercase tracking-widest mt-1 mb-6">{member.role}</p>
              <div className="pt-6 border-t border-border/50 text-left space-y-2 text-[13px] text-text-muted font-light">
                <p>Office: {member.office}</p>
                <p>Email: {member.contact}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}