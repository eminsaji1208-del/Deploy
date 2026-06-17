import { Client } from "pg";
import { Calendar, Tag, Info, Sparkles } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

// Force Next.js to always fetch the freshest data (No stale caching)
export const dynamic = "force-dynamic";

export default async function CampusLifePublicPage() {
  let events: any[] = [];
  let fests: any[] = [];

  try {
    // 1. Connect to your database
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();

    // 2. Fetch all public events and fests
    const eventsRes = await client.query(`SELECT * FROM events ORDER BY event_date DESC`);
    const festsRes = await client.query(`SELECT * FROM fests ORDER BY created_at ASC`);

    events = eventsRes.rows;
    fests = festsRes.rows;

    // 3. Close the connection securely
    await client.end();
  } catch (error) {
    console.error("Failed to load public data:", error);
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24 px-6">
      {/* Background decoration */}
      <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] left-[-300px] opacity-10 text-primary pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">
            Campus Life & Events
          </h1>
          <p className="text-text-muted">
            Discover the vibrant culture, annual festivals, and upcoming announcements happening right now at IIT Patna.
          </p>
        </div>

        {/* SECTION 1: UPCOMING EVENTS & ANNOUNCEMENTS */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-accent" size={24} />
            <h2 className="text-2xl font-bold text-primary">Latest Announcements</h2>
          </div>

          {events.length === 0 ? (
            <div className="p-8 bg-surface border border-border rounded-3xl text-center">
              <p className="text-text-muted">No upcoming events right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <AnimatedCard key={event.id} className="bg-surface border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-1 text-text-muted text-xs font-bold">
                      <Calendar size={14} />
                      {new Date(event.event_date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
                  <p className="text-sm text-text-muted line-clamp-3">{event.description}</p>
                </AnimatedCard>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: ANNUAL FESTIVALS */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Tag className="text-highlight" size={24} />
            <h2 className="text-2xl font-bold text-primary">Annual Festivals</h2>
          </div>

          {fests.length === 0 ? (
            <div className="p-8 bg-surface border border-border rounded-3xl text-center">
              <p className="text-text-muted">Festivals are currently being planned.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {fests.map((fest) => (
                <div key={fest.id} className="bg-background border border-border rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden group">
                  {/* Decorative accent bar */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary group-hover:bg-accent transition-colors"></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-accent text-sm font-bold mb-2 uppercase tracking-widest">
                      <Calendar size={16} />
                      {fest.fest_date}
                    </div>
                    <h3 className="text-2xl font-black text-primary mb-3">{fest.name}</h3>
                    <p className="text-text-muted">{fest.description}</p>
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