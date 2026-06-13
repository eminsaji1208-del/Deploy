import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";

export default function FAQPage() {
  return (
    <div>
      <PageHeader title="Frequently Asked Questions" subtitle="Instant resolutions for common administrative procedures." />
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-4">
        {siteConfig.faqs.map((faq, i) => (
          <div key={i} className="border border-border rounded-xl p-6 bg-surface">
            <h3 className="font-bold text-primary text-base md:text-lg mb-2">Q: {faq.q}</h3>
            <p className="text-sm text-text-muted leading-relaxed pl-5 border-l-2 border-accent">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}