import Link from "next/link";
import { Shield, PhoneCall, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="bg-primary pt-20 pb-10 text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">{siteConfig.institution.office}</h3>
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            {siteConfig.metadata.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Institutional Quick Links</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {siteConfig.navigation.slice(1, 9).map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-5">Emergency Critical Contacts</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              <Shield className="text-red-400 shrink-0" size={18} />
              <div>
                <p className="text-xs font-semibold text-white">Campus Protection Guard (24/7)</p>
                <p className="font-mono text-sm text-red-400 font-bold">{siteConfig.emergency.security}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
              <PhoneCall className="text-red-400 shrink-0" size={18} />
              <div>
                <p className="text-xs font-semibold text-white">Medical Emergency Support</p>
                <p className="font-mono text-sm text-red-400 font-bold">{siteConfig.emergency.medical}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} {siteConfig.institution.name}. All administrative protocols enforced.</p>
        <div className="flex gap-6">
          <span>Anti-Ragging Code Compliant</span>
          <span>Student Confidentiality Secured</span>
        </div>
      </div>
    </footer>
  );
}