import { Client } from "pg";
import { Mail, Shield, User, Globe } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  let team: any[] = [];
  let vision = "To foster excellence in student affairs and holistic development.";

  try {
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();

    // Fetch the team and the vision from Prisma
    const teamRes = await client.query(`SELECT * FROM team_members ORDER BY id ASC`);
    const visionRes = await client.query(`SELECT setting_value FROM site_settings WHERE setting_key = 'vision'`);

    team = teamRes.rows;
    if (visionRes.rows.length > 0) {
      vision = visionRes.rows[0].setting_value;
    }

    await client.end();
  } catch (error) {
    console.error("Failed to load team data:", error);
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6">
      <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] right-[-300px] opacity-10 text-primary pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Page Header & Vision Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Globe size={32} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-6">
            Our Vision & Administration
          </h1>
          
          <AnimatedCard className="bg-surface border border-border p-8 rounded-3xl shadow-lg relative">
            <div className="absolute -top-4 -left-4 text-6xl text-accent opacity-50 font-serif">"</div>
            <p className="text-xl text-text leading-relaxed font-medium relative z-10">
              {vision}
            </p>
            <div className="absolute -bottom-8 -right-4 text-6xl text-accent opacity-50 font-serif rotate-180">"</div>
          </AnimatedCard>
        </div>

        {/* Administration Team Grid */}
        <section>
          <div className="flex justify-center items-center gap-3 mb-12">
            <Shield className="text-highlight" size={28} />
            <h2 className="text-3xl font-bold text-primary">Student Affairs Team</h2>
          </div>

          {team.length === 0 ? (
            <div className="text-center text-text-muted p-12 bg-surface rounded-3xl border border-border">
              Administration team members will be updated soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-surface border border-border rounded-3xl p-8 hover:shadow-xl hover:border-accent/50 transition-all group flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-background border-2 border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <User size={40} className="text-primary/40" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-accent font-semibold text-sm mb-4">{member.role}</p>
                  
                  <div className="mt-auto w-full pt-4 border-t border-border flex items-center justify-center gap-2 text-text-muted hover:text-primary transition-colors cursor-pointer">
                    <Mail size={16} />
                    <span className="text-sm font-medium">{member.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}