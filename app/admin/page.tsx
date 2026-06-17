import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Client } from "pg";
import { ShieldCheck, LogOut, LayoutDashboard, Send, FileText, AlertTriangle, Users, Calendar, Settings, Trash2, HelpCircle, Link as LinkIcon } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import { createEvent, addTeamMember, addFest, updateVision, deleteRecord, addFaq, addResource } from "@/app/actions/admin";

export default async function AdminDashboard() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  let data = { events: [], team: [], fests: [], vision: "", faqs: [], resources: [] };
  let dbError = null;

  try {
    const client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();

    // 1. SELF-HEALING (All Tables)
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, event_date DATE NOT NULL, category VARCHAR(50) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS team_members (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS fests (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, fest_date VARCHAR(255) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS site_settings (setting_key VARCHAR(50) PRIMARY KEY, setting_value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS faqs (id SERIAL PRIMARY KEY, question VARCHAR(255) NOT NULL, answer TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS resources (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, link TEXT NOT NULL, category VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    `);

    // 2. FETCH ALL DATA
    const [eventsRes, teamRes, festsRes, settingsRes, faqsRes, resourcesRes] = await Promise.all([
      client.query(`SELECT * FROM events ORDER BY created_at DESC LIMIT 5`),
      client.query(`SELECT * FROM team_members ORDER BY created_at DESC`),
      client.query(`SELECT * FROM fests ORDER BY created_at DESC`),
      client.query(`SELECT * FROM site_settings WHERE setting_key = 'vision'`),
      client.query(`SELECT * FROM faqs ORDER BY created_at DESC`),
      client.query(`SELECT * FROM resources ORDER BY created_at DESC`)
    ]);

    data.events = eventsRes.rows as never[];
    data.team = teamRes.rows as never[];
    data.fests = festsRes.rows as never[];
    data.vision = settingsRes.rows[0]?.setting_value || "";
    data.faqs = faqsRes.rows as never[];
    data.resources = resourcesRes.rows as never[];
    
    await client.end();
  } catch (error: any) {
    dbError = error.message;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-24 pb-12 px-6">
      <AnimeOrganicShape className="w-[1000px] h-[1000px] top-[-300px] right-[-400px] opacity-10 text-primary pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-lg mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck size={24} className="text-highlight" />
            </div>
            <h1 className="text-xl font-black text-primary">Control Center</h1>
            <p className="text-text-muted text-xs mt-1 truncate">{session.user?.email}</p>
            <div className="flex flex-col gap-2 mt-6">
              <Link href="/" className="py-2 px-4 bg-background border border-border rounded-lg text-sm text-center font-bold hover:border-accent transition-all">View Live Site</Link>
              <Link href="/api/auth/signout" className="py-2 px-4 bg-red-50 text-red-600 rounded-lg text-sm text-center font-bold hover:bg-red-100 transition-all">Sign Out</Link>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-3xl border border-border shadow-sm flex flex-col gap-2 sticky top-24">
            <a href="#vision" className="p-3 hover:bg-background rounded-xl text-sm font-bold flex items-center gap-3"><Settings size={16}/> Vision</a>
            <a href="#articles" className="p-3 hover:bg-background rounded-xl text-sm font-bold flex items-center gap-3"><FileText size={16}/> Articles</a>
            <a href="#team" className="p-3 hover:bg-background rounded-xl text-sm font-bold flex items-center gap-3"><Users size={16}/> Team</a>
            <a href="#fests" className="p-3 hover:bg-background rounded-xl text-sm font-bold flex items-center gap-3"><Calendar size={16}/> Fests</a>
            <a href="#faqs" className="p-3 hover:bg-background rounded-xl text-sm font-bold flex items-center gap-3"><HelpCircle size={16}/> FAQs</a>
            <a href="#resources" className="p-3 hover:bg-background rounded-xl text-sm font-bold flex items-center gap-3"><LinkIcon size={16}/> Resources</a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {dbError && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
              <AlertTriangle className="text-red-500" />
              <div><h3 className="font-bold text-red-700">Database Error</h3><p className="text-sm text-red-600">{dbError}</p></div>
            </div>
          )}

          {/* 1. SECTION: VISION */}
          <section id="vision" className="scroll-mt-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Website Vision</h2>
            <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
              <form action={updateVision} className="space-y-4">
                <textarea name="vision" defaultValue={data.vision} rows={4} className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:border-accent outline-none resize-none"></textarea>
                <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Save Vision Statement</button>
              </form>
            </AnimatedCard>
          </section>

          {/* 2. SECTION: ARTICLES */}
          <section id="articles" className="scroll-mt-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Manage Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                <form action={createEvent} className="space-y-4">
                  <input type="text" name="title" required placeholder="Article Title" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" name="date" required className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                    <select name="category" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none">
                      <option value="News">News</option><option value="Announcement">Announcement</option><option value="Event">Event</option>
                    </select>
                  </div>
                  <textarea name="description" rows={3} required placeholder="Description..." className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:border-accent outline-none resize-none"></textarea>
                  <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Publish Article</button>
                </form>
              </AnimatedCard>
              <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm overflow-y-auto max-h-[350px] space-y-3">
                {data.events.map((e: any) => (
                  <div key={e.id} className="p-3 border border-border bg-background rounded-xl flex justify-between items-center group">
                    <div><p className="font-bold text-sm text-primary">{e.title}</p><p className="text-[10px] text-text-muted">{new Date(e.event_date).toLocaleDateString()}</p></div>
                    <form action={deleteRecord}><input type="hidden" name="table" value="events" /><input type="hidden" name="id" value={e.id} />
                      <button type="submit" className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16}/></button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. SECTION: TEAM MEMBERS */}
          <section id="team" className="scroll-mt-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Manage Team Members</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                <form action={addTeamMember} className="space-y-4">
                  <input type="text" name="name" required placeholder="Full Name" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <input type="text" name="role" required placeholder="Role" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <input type="email" name="email" required placeholder="Official Email" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add Team Member</button>
                </form>
              </AnimatedCard>
              <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm overflow-y-auto max-h-[300px] space-y-3">
                {data.team.map((t: any) => (
                  <div key={t.id} className="p-3 border border-border bg-background rounded-xl flex justify-between items-center">
                    <div><p className="font-bold text-sm text-primary">{t.name}</p><p className="text-[10px] text-text-muted">{t.role}</p></div>
                    <form action={deleteRecord}><input type="hidden" name="table" value="team_members" /><input type="hidden" name="id" value={t.id} />
                      <button type="submit" className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16}/></button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. SECTION: FESTS */}
          <section id="fests" className="scroll-mt-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Manage Campus Fests</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                <form action={addFest} className="space-y-4">
                  <input type="text" name="name" required placeholder="Fest Name" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <input type="text" name="fest_date" required placeholder="Time of Year" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <textarea name="description" rows={2} required placeholder="Fest Description..." className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:border-accent outline-none resize-none"></textarea>
                  <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add Fest</button>
                </form>
              </AnimatedCard>
              <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm overflow-y-auto max-h-[300px] space-y-3">
                {data.fests.map((f: any) => (
                  <div key={f.id} className="p-3 border border-border bg-background rounded-xl flex justify-between items-center">
                    <div><p className="font-bold text-sm text-primary">{f.name}</p><p className="text-[10px] text-text-muted">{f.fest_date}</p></div>
                    <form action={deleteRecord}><input type="hidden" name="table" value="fests" /><input type="hidden" name="id" value={f.id} />
                      <button type="submit" className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16}/></button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. SECTION: FAQs */}
          <section id="faqs" className="scroll-mt-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Manage FAQs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                <form action={addFaq} className="space-y-4">
                  <input type="text" name="question" required placeholder="Question" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <textarea name="answer" rows={3} required placeholder="Answer..." className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:border-accent outline-none resize-none"></textarea>
                  <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add FAQ</button>
                </form>
              </AnimatedCard>
              <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm overflow-y-auto max-h-[300px] space-y-3">
                {data.faqs.map((q: any) => (
                  <div key={q.id} className="p-3 border border-border bg-background rounded-xl flex justify-between items-start">
                    <div><p className="font-bold text-sm text-primary mb-1">{q.question}</p><p className="text-[10px] text-text-muted line-clamp-2">{q.answer}</p></div>
                    <form action={deleteRecord}><input type="hidden" name="table" value="faqs" /><input type="hidden" name="id" value={q.id} />
                      <button type="submit" className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16}/></button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. SECTION: RESOURCES */}
          <section id="resources" className="scroll-mt-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Manage Resources & Forms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                <form action={addResource} className="space-y-4">
                  <input type="text" name="title" required placeholder="Document Title" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <input type="text" name="link" required placeholder="URL or Google Drive Link" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none" />
                  <select name="category" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm focus:border-accent outline-none">
                    <option value="Forms">Forms</option><option value="Guidelines">Guidelines</option><option value="Academic">Academic</option>
                  </select>
                  <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add Resource</button>
                </form>
              </AnimatedCard>
              <div className="bg-surface border border-border p-6 rounded-3xl shadow-sm overflow-y-auto max-h-[300px] space-y-3">
                {data.resources.map((r: any) => (
                  <div key={r.id} className="p-3 border border-border bg-background rounded-xl flex justify-between items-center">
                    <div><p className="font-bold text-sm text-primary">{r.title}</p><p className="text-[10px] font-bold text-accent">{r.category}</p></div>
                    <form action={deleteRecord}><input type="hidden" name="table" value="resources" /><input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16}/></button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}