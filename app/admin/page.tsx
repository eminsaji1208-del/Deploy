import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@vercel/postgres";
import { ShieldCheck, LogOut, LayoutDashboard, Send, FileText, AlertTriangle } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import { createEvent } from "@/app/actions/events";

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  let events: any[] = [];
  let dbError = null;

  try {
    // 1. Connect to Prisma DB
    const client = createClient({ connectionString: process.env.POSTGRES_URL });
    await client.connect();

    // 2. SELF-HEALING: Automatically create the table if it doesn't exist yet!
    await client.sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        event_date DATE NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Fetch the events
    const { rows } = await client.sql`SELECT * FROM events ORDER BY created_at DESC LIMIT 10`;
    events = rows;
    
    // 4. Close connection
    await client.end();
  } catch (error: any) {
    // If it crashes, catch the real error and print it so it doesn't show {}
    console.error("--- REAL DATABASE ERROR ---", error);
    dbError = error.message || "Could not connect to the Prisma database.";
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-24 pb-12 px-6">
      <AnimeOrganicShape className="w-[1000px] h-[1000px] top-[-300px] right-[-400px] opacity-10 text-primary pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-surface p-8 rounded-3xl border border-border shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-md">
              <ShieldCheck size={28} className="text-highlight" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-primary tracking-tight">Admin Control Center</h1>
              <p className="text-text-muted text-sm mt-1">
                Authenticated as: <span className="font-bold text-accent">{session.user?.email}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="px-6 py-3 bg-background border border-border text-text font-semibold rounded-xl hover:bg-border/50 transition-all text-sm flex items-center gap-2">
              <LayoutDashboard size={18} /> View Live Site
            </Link>
            <Link href="/api/auth/signout" className="px-6 py-3 bg-red-50 border border-red-100 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all text-sm flex items-center gap-2">
              <LogOut size={18} /> Sign Out
            </Link>
          </div>
        </div>

        {/* Show Database Error if one occurs */}
        {dbError && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="text-red-500 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-700 text-lg">Database Connection Error</h3>
              <p className="text-red-600 text-sm mt-1">{dbError}</p>
              <p className="text-red-500 text-xs mt-2 font-mono">Check your VS Code terminal for the full crash report.</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Post New Event Form */}
          <div className="md:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 pl-2">Publish New Article</h2>
            <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-lg">
              <form action={createEvent} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-text-muted block mb-1">Title</label>
                  <input type="text" name="title" required className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" placeholder="e.g. Anwesha 2026 Announced" disabled={!!dbError} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-text-muted block mb-1">Date</label>
                    <input type="date" name="date" required className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" disabled={!!dbError} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-text-muted block mb-1">Category</label>
                    <select name="category" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" disabled={!!dbError}>
                      <option value="Event">Event</option>
                      <option value="Announcement">Announcement</option>
                      <option value="News">News</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-text-muted block mb-1">Content / Description</label>
                  <textarea name="description" rows={5} required className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:border-accent outline-none resize-none" placeholder="Write your article here..." disabled={!!dbError}></textarea>
                </div>

                <button type="submit" disabled={!!dbError} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <Send size={16} /> Publish Now
                </button>
              </form>
            </AnimatedCard>
          </div>

          {/* Database Viewer */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 pl-2">Live Database</h2>
            <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm min-h-[400px]">
              {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                    <FileText size={24} className="text-text-muted opacity-50" />
                  </div>
                  <h3 className="font-bold text-primary">{dbError ? "Database Offline" : "No articles found"}</h3>
                  <p className="text-text-muted text-sm mt-1">{dbError ? "Fix the error above to view articles." : "Use the form to publish your first entry."}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="p-4 border border-border rounded-2xl bg-background flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-md uppercase tracking-wider mr-2">{event.category}</span>
                        <span className="font-bold text-primary">{event.title}</span>
                        <p className="text-xs text-text-muted mt-1 truncate max-w-md">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-text-muted">{new Date(event.event_date).toLocaleDateString()}</p>
                        <p className="text-[10px] text-text-muted">ID: {event.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}