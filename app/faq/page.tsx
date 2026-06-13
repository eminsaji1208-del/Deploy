import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function FAQPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Frequently Asked Questions" subtitle="Instant resolutions for common administrative procedures." />
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-2">
        {siteConfig.faqs.map((faq, i) => (
          <FadeIn key={i} delay={0.1 + (i * 0.1)}>
            <details className="group border-b border-border py-6 cursor-pointer">
              <summary className="font-semibold text-primary text-base list-none flex justify-between items-center tracking-tight">
                {faq.q}
                <span className="text-text-muted group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
              </summary>
              <p className="text-[15px] text-text-muted leading-relaxed font-light mt-4 pr-12 animate-in slide-in-from-top-2 opacity-0 group-open:opacity-100 transition-opacity duration-300">
                {faq.a}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}