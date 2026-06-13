import { siteConfig } from "@/data/site-config";
import SectionWrapper from "@/components/SectionWrapper";
import { ArrowRight, ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-b from-background to-surface">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary mb-6 leading-tight">
            {siteConfig.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href={siteConfig.hero.primaryCta.href} className="px-8 py-4 bg-accent text-white rounded-full font-medium shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              {siteConfig.hero.primaryCta.label}
            </Link>
            <Link href={siteConfig.hero.secondaryCta.href} className="px-8 py-4 bg-surface border border-border text-primary rounded-full font-medium hover:bg-background transition-all w-full sm:w-auto">
              {siteConfig.hero.secondaryCta.label}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border/50">
            {siteConfig.hero.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary">{stat.value}</span>
                <span className="text-sm font-medium text-text-muted mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 - ABOUT & VISION */}
      <SectionWrapper id="about" className="bg-surface">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">{siteConfig.about.title}</h3>
            <p className="text-text-muted leading-relaxed text-lg mb-8">{siteConfig.about.content}</p>
            
            <div className="space-y-6">
              {siteConfig.about.milestones.map((m, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="px-3 py-1 bg-accent/10 text-accent rounded-md font-mono text-sm font-bold mt-1">{m.year}</div>
                  <p className="text-primary font-medium">{m.title}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-surface to-background border border-border">
              <h4 className="text-xl font-bold text-primary mb-3">Our Vision</h4>
              <p className="text-text-muted leading-relaxed">{siteConfig.visionMission.vision}</p>
            </div>
            <div className="glass-card p-8 rounded-2xl bg-primary text-white shadow-xl">
              <h4 className="text-xl font-bold mb-3">Our Mission</h4>
              <p className="text-white/80 leading-relaxed">{siteConfig.visionMission.mission}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* SECTION 3 - RESPONSIBILITIES */}
      <SectionWrapper id="responsibilities" className="bg-background">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Core Responsibilities</h2>
          <p className="text-text-muted text-lg">Comprehensive support structures designed to optimize your university experience.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.responsibilities.map((req, idx) => {
            const Icon = req.icon;
            return (
              <div key={idx} className="group glass-card p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{req.title}</h3>
                <p className="text-text-muted leading-relaxed">{req.description}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* SECTION 4 - INITIATIVES TIMELINE */}
      <SectionWrapper id="initiatives" className="bg-surface">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-16 text-center">Major Initiatives</h2>
        <div className="space-y-12 max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {siteConfig.initiatives.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="text-xs font-bold">{item.year.slice(2)}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold text-primary text-xl mb-2">{item.title}</h3>
                <p className="text-text-muted mb-4">{item.description}</p>
                <div className="inline-flex items-center text-sm font-medium text-accent bg-accent/5 px-3 py-1 rounded-full">
                  Impact: {item.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* SECTION 5 - CONTACT & FAQ */}
      <SectionWrapper id="contact" className="bg-background">
         <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 text-text-muted">
                  <MapPin className="text-accent shrink-0 mt-1" />
                  <p>{siteConfig.contact.address}</p>
                </div>
                <div className="flex items-center gap-4 text-text-muted">
                  <Phone className="text-accent shrink-0" />
                  <p>{siteConfig.contact.phone}</p>
                </div>
                <div className="flex items-center gap-4 text-text-muted">
                  <Mail className="text-accent shrink-0" />
                  <p>{siteConfig.contact.email}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {siteConfig.faqs.map((faq, i) => (
                  <details key={i} className="group border-b border-border pb-4 cursor-pointer">
                    <summary className="flex justify-between items-center font-medium text-primary list-none">
                      {faq.question}
                      <span className="transition group-open:rotate-180 text-text-muted"><ChevronDown size={18} /></span>
                    </summary>
                    <p className="text-text-muted mt-3 leading-relaxed text-sm animate-in slide-in-from-top-2">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
         </div>
      </SectionWrapper>
    </div>
  );
}