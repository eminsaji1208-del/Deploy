import { Client } from "pg";
import { FileText, DownloadCloud } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import AnimeEntrance from "@/components/AnimeEntrance";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  let resources: any[] = [];

  const fallbackResources = [
    { id: "preset-1", title: "Gymkhana Constitution 2026", link: "#", category: "Guidelines" },
    { id: "preset-2", title: "Hostel Rules & Regulations", link: "#", category: "Guidelines" },
    { id: "preset-3", title: "Medical Reimbursement Form", link: "#", category: "Forms" },
    { id: "preset-4", title: "Student Event Approval Form", link: "#", category: "Forms" },
    { id: "preset-5", title: "B.Tech Academic Calendar (Autumn)", link: "#", category: "Academic" },
    { id: "preset-6", title: "Course Registration Manual", link: "#", category: "Academic" }
  ];

  try {
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();
    const res = await client.query(`SELECT * FROM resources ORDER BY category ASC, created_at DESC`);
    resources = res.rows;
    await client.end();
  } catch (error) {
    console.error("Failed to load resources from DB, using fallback data:", error);
  }

  const displayResources = resources.length > 0 ? resources : fallbackResources;

  // Grouped to satisfy TypeScript
  const groupedResources: Record<string, any[]> = displayResources.reduce((acc: Record<string, any[]>, resource) => {
    (acc[resource.category] = acc[resource.category] || []).push(resource);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6">
      
      {/* Restored custom UI sizing */}
      <AnimeOrganicShape className="w-[800px] h-[800px] bottom-[-200px] right-[-300px] opacity-10 text-primary pointer-events-none" />

      {/* The new animation controller */}
      <AnimeEntrance>
        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="text-center mb-16 anime-item">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">Resources & Forms</h1>
            <p className="text-text-muted">Download important guidelines, academic forms, and official Gymkhana documents.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(groupedResources).map(([category, items]) => (
              <div key={category}>
                
                <h2 className="text-xl font-bold text-accent mb-6 uppercase tracking-widest border-b border-border pb-2 anime-item">
                  {category}
                </h2>
                
                <div className="space-y-4">
                  {items.map((item: any) => (
                    
                    <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="block anime-item">
                      <AnimatedCard className="bg-surface border border-border p-5 rounded-2xl flex justify-between items-center hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-xl cursor-pointer">
                        <span className="font-bold text-sm text-primary group-hover:text-white transition-colors">{item.title}</span>
                        <DownloadCloud size={20} className="text-text-muted group-hover:text-white transition-colors" />
                      </AnimatedCard>
                    </a>

                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimeEntrance>
    </div>
  );
}