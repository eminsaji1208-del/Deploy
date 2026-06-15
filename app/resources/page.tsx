"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DownloadCloud, FolderArchive, FileText, Link2, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

const documents = [
  { title: "Student Gymkhana Constitution", size: "2.4 MB PDF", date: "Updated 2025" },
  { title: "Anti-Ragging Affidavit", size: "1.1 MB PDF", date: "Mandatory" },
  { title: "Hostel Allotment Rulebook", size: "3.5 MB PDF", date: "Updated 2024" },
  { title: "Club Funding Request Form", size: "0.8 MB DOCX", date: "Fillable" }
];

const externalLinks = [
  { title: "Academic Portal (MIS)", desc: "Check grades, register for courses, and pay tuition fees." },
  { title: "Webmail", desc: "Official IIT Patna student email portal." },
  { title: "Central Library", desc: "Access e-journals, research papers, and book reservations." }
];

export default function ResourcesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    import("animejs").then((animeModule: any) => {
      const anime = animeModule.default || animeModule;
      
      // Interactive Download Rows
      const rows = document.querySelectorAll('.download-row');
      rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
          anime({ targets: row.querySelector('.dl-text'), translateX: 10, duration: 400, easing: 'easeOutQuint' });
          anime({ targets: row.querySelector('.dl-icon'), translateY: 5, opacity: 1, duration: 300, easing: 'easeOutQuint' });
        });
        row.addEventListener('mouseleave', () => {
          anime({ targets: row.querySelector('.dl-text'), translateX: 0, duration: 400, easing: 'easeOutQuint' });
          anime({ targets: row.querySelector('.dl-icon'), translateY: 0, opacity: 0.5, duration: 300, easing: 'easeOutQuint' });
        });
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-primary overflow-hidden">
        <AnimeOrganicShape className="w-[700px] h-[700px] top-[-200px] right-[-200px] opacity-10 text-highlight" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />

        <motion.div style={{ y: headerY }} className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              DOWNLOAD <span className="text-highlight">CENTER</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
              Access official institutional rulebooks, mandatory forms, and quick links to academic portals.
            </p>
          </FadeIn>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-30 space-y-24">
        
        {/* DOWNLOADABLE DOCUMENTS */}
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <FadeIn>
              <div className="sticky top-32">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent">
                  <FolderArchive size={32} />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4 tracking-tight">Official Documents</h3>
                <p className="text-sm text-text-muted font-light leading-relaxed">
                  All forms and documents listed here are currently enforced by the administration. Please ensure you are downloading the latest versions before submission.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-8 space-y-4">
            {documents.map((doc, i) => (
              <FadeIn key={i} delay={0.1 + (i * 0.1)}>
                <div className="download-row flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-surface border border-border rounded-2xl cursor-pointer hover:border-accent hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0 dl-text">
                    <FileText size={24} className="text-accent shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold text-primary">{doc.title}</h4>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">
                        {doc.date} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 shrink-0 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors">
                    <DownloadCloud size={18} className="dl-icon text-primary opacity-50 group-hover:text-white" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* EXTERNAL PORTAL LINKS */}
        <div className="relative pt-12 border-t border-border">
          <FadeIn>
            <div className="mb-10">
              <h2 className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                <Link2 size={14} /> Quick Access
              </h2>
              <h3 className="text-3xl font-semibold text-primary tracking-tight">External Portals</h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {externalLinks.map((link, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <AnimatedCard className="h-full p-8 bg-surface border-border group cursor-pointer hover:border-accent/40">
                  <h4 className="text-xl font-bold text-primary mb-3 flex items-center justify-between">
                    {link.title}
                    <ArrowRight size={18} className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h4>
                  <p className="text-sm text-text-muted font-light leading-relaxed">{link.desc}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}