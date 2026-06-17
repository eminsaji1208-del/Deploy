import { Client } from "pg";
import { HelpCircle } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  let faqs: any[] = [];

  // THE SAFETY NET: Preset Dummy Data
  const fallbackFaqs = [
    {
      id: "preset-1",
      question: "How do I apply for hostel accommodation?",
      answer: "Hostel allocation is managed entirely through the online student portal. Freshmen will receive their login credentials during the orientation week. Make sure to complete your profile before the deadline."
    },
    {
      id: "preset-2",
      question: "Where can I find the academic calendar?",
      answer: "The academic calendar is updated every semester and can be downloaded from the Resources & Forms section of this website. It contains all dates for mid-sems, end-sems, and holidays."
    },
    {
      id: "preset-3",
      question: "How do I join a Gymkhana club?",
      answer: "Club recruitment usually happens in the second month of the Autumn semester. Keep an eye on the Campus Life announcements page for specific orientation and audition dates!"
    }
  ];

  try {
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();
    const res = await client.query(`SELECT * FROM faqs ORDER BY created_at ASC`);
    faqs = res.rows;
    await client.end();
  } catch (error) {
    console.error("Failed to load FAQs from DB, using fallback data:", error);
  }

  // If the database is empty or fails, use the beautiful preset data!
  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6">
      <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] left-[-300px] opacity-10 text-primary pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-text-muted">Find quick answers to the most common queries regarding campus life and student affairs.</p>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq) => (
            <AnimatedCard key={faq.id} className="bg-surface border border-border p-6 rounded-3xl hover:border-accent transition-colors shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-2">{faq.question}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{faq.answer}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}