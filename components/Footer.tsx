import { siteConfig } from "@/data/site-config";
import { PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 text-white/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">{siteConfig.header.officeName}</h3>
          <p className="text-sm leading-relaxed max-w-sm">
            {siteConfig.metadata.description}
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Emergency Contacts</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/20">
              <PhoneCall size={20} />
              <div>
                <p className="font-bold text-sm">Campus Security (24/7)</p>
                <p className="font-mono text-xs">+91 800 999 0000</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
             <li><a href="#about" className="hover:text-accent transition">About Us</a></li>
             <li><a href="#initiatives" className="hover:text-accent transition">Student Initiatives</a></li>
             <li><a href="#contact" className="hover:text-accent transition">Grievance Portal</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 text-center text-sm border-t border-white/10 pt-8">
        © {new Date().getFullYear()} {siteConfig.header.universityName}. All rights reserved.
      </div>
    </footer>
  );
}