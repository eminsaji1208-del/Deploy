import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Pool } from "pg";
import { ShieldCheck, LogOut, LayoutDashboard, Send, FileText, AlertTriangle, Users, Calendar, Settings, Trash2, HelpCircle, Link as LinkIcon, Database } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";
import { createEvent, addTeamMember, addFest, updateVision, deleteRecord, addFaq, addResource } from "@/app/actions/admin";
import Image from "next/image"; 

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// Added searchParams to track which tab the user is clicking on!
// THE FIX: We tell Next.js it is a Promise, and we 'await' it before using it!
export default async function AdminDashboard(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const session = { user: { name: "Admin", email: "admin@example.com" } };
  
  // Default to the overview tab if no tab is clicked yet
  const currentTab = searchParams?.tab || "overview";

  let dbError: string | null = null;
  let data: any = { 
    users: [], events: [], team: [], fests: [], faqs: [], resources: [], vision: ""
  };

  try {
    const checkTables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    const tableNames = checkTables.rows.map(r => r.table_name);

    if (tableNames.includes('admins')) data.users = (await pool.query(`SELECT * FROM admins`)).rows; 
    if (tableNames.includes('events')) data.events = (await pool.query(`SELECT * FROM events ORDER BY created_at DESC`)).rows;
    if (tableNames.includes('team_members')) data.team = (await pool.query(`SELECT * FROM team_members ORDER BY created_at DESC`)).rows;
    if (tableNames.includes('fests')) data.fests = (await pool.query(`SELECT * FROM fests ORDER BY created_at DESC`)).rows;
    if (tableNames.includes('faqs')) data.faqs = (await pool.query(`SELECT * FROM faqs ORDER BY created_at DESC`)).rows;
    if (tableNames.includes('resources')) data.resources = (await pool.query(`SELECT * FROM resources ORDER BY created_at DESC`)).rows;
    
    if (tableNames.includes('site_settings')) {
      const settingsRes = await pool.query(`SELECT * FROM site_settings LIMIT 1`);
      if (settingsRes.rows.length > 0) data.vision = settingsRes.rows[0].vision || "";
    }

  } catch (error) {
    console.error("Database connection failed:", error);
    dbError = "Failed to connect to the database. Check your connection string.";
  }

  // Helper for the sidebar navigation
  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "vision", label: "Site Vision", icon: Settings },
    { id: "articles", label: "Articles & News", icon: FileText },
    { id: "team", label: "Team Members", icon: Users },
    { id: "fests", label: "Campus Fests", icon: Calendar },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "resources", label: "Resources", icon: LinkIcon },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-24 pb-12 px-6">
      <AnimeOrganicShape className="w-[1000px] h-[1000px] top-[-300px] right-[-400px] opacity-10 text-primary pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- LEFT SIDEBAR (UX UPGRADED) --- */}
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

          <nav className="bg-surface p-4 rounded-3xl border border-border shadow-sm flex flex-col gap-2 sticky top-24">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={`?tab=${item.id}`} 
                className={`p-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors ${
                  currentTab === item.id 
                    ? "bg-primary text-white shadow-md" 
                    : "hover:bg-background text-text-muted hover:text-primary"
                }`}
              >
                <item.icon size={18} /> {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="lg:col-span-3 space-y-8">
          {dbError && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
              <AlertTriangle className="text-red-500" />
              <div><h3 className="font-bold text-red-700">Database Error</h3><p className="text-sm text-red-600">{dbError}</p></div>
            </div>
          )}

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {currentTab === "overview" && (
            <AnimatedCard className="space-y-6">
              <h2 className="text-2xl font-black text-primary flex items-center gap-2">
                <Database className="text-accent" /> Database Overview
              </h2>
              <p className="text-text-muted text-sm">Here is exactly what is currently live in your database right now.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Team Members", count: data.team?.length || 0, icon: Users, color: "bg-blue-50 text-blue-600" },
                  { label: "Articles", count: data.events?.length || 0, icon: FileText, color: "bg-purple-50 text-purple-600" },
                  { label: "Fests", count: data.fests?.length || 0, icon: Calendar, color: "bg-pink-50 text-pink-600" },
                  { label: "FAQs", count: data.faqs?.length || 0, icon: HelpCircle, color: "bg-amber-50 text-amber-600" },
                  { label: "Resources", count: data.resources?.length || 0, icon: LinkIcon, color: "bg-emerald-50 text-emerald-600" },
                  { label: "Admins", count: data.users?.length || 0, icon: ShieldCheck, color: "bg-slate-50 text-slate-600" },
                ].map((stat, i) => (
                  <div key={i} className="bg-surface border border-border p-5 rounded-2xl shadow-sm flex flex-col justify-between h-32">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-primary">{stat.count}</p>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          )}

          {/* TAB 2: VISION */}
          {currentTab === "vision" && (
            <section>
              <h2 className="text-2xl font-black text-primary mb-6">Site Vision</h2>
              <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm">
                <form action={updateVision} className="space-y-4">
                  <p className="text-sm text-text-muted mb-4">This statement appears on the main landing page. Keep it inspiring!</p>
                  <textarea name="vision" defaultValue={data.vision} rows={6} className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:border-accent outline-none resize-none"></textarea>
                  <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90 transition-all">Save Vision Statement</button>
                </form>
              </AnimatedCard>
            </section>
          )}

          {/* TAB 3: ARTICLES */}
          {currentTab === "articles" && (
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-primary">Articles & News</h2>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs">{data.events?.length || 0} Total</span>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm sticky top-24">
                    <h3 className="font-bold text-sm mb-4 border-b border-border pb-2">Publish New Article</h3>
                    <form action={createEvent} className="space-y-4">
                      <input type="text" name="title" required placeholder="Article Title" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <input type="date" name="date" required className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <select name="category" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none">
                        <option value="News">News</option><option value="Announcement">Announcement</option><option value="Event">Event</option>
                      </select>
                      <textarea name="description" rows={4} required placeholder="Description..." className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm outline-none resize-none"></textarea>
                      <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Publish Article</button>
                    </form>
                  </AnimatedCard>
                </div>
                
                <div className="lg:col-span-3 space-y-3">
                  {data.events?.length === 0 && <p className="p-8 text-center text-text-muted border border-dashed border-border rounded-3xl">No articles published yet.</p>}
                  {data.events?.map((e: any) => (
                    <div key={e.id} className="p-4 border border-border bg-surface rounded-2xl flex justify-between items-start group hover:border-accent transition-colors">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-md mb-2 inline-block">{e.category}</span>
                        <p className="font-bold text-base text-primary leading-tight mb-1">{e.title}</p>
                        <p className="text-xs text-text-muted">{new Date(e.event_date).toLocaleDateString()}</p>
                      </div>
                      <form action={deleteRecord}><input type="hidden" name="table" value="events" /><input type="hidden" name="id" value={e.id} />
                        <button type="submit" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: TEAM MEMBERS */}
          {currentTab === "team" && (
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-primary">Team Members</h2>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs">{data.team?.length || 0} Total</span>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm sticky top-24">
                    <h3 className="font-bold text-sm mb-4 border-b border-border pb-2">Add New Member</h3>
                    <form action={addTeamMember} className="space-y-4">
                      <input type="text" name="name" required placeholder="Full Name" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <input type="text" name="role" required placeholder="Role / Position" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <input type="email" name="email" required placeholder="Official Email" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <input type="url" name="portfolio_link" placeholder="LinkedIn URL (Optional)" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add Team Member</button>
                    </form>
                  </AnimatedCard>
                </div>

                <div className="lg:col-span-3 space-y-3">
                  {data.team?.length === 0 && <p className="p-8 text-center text-text-muted border border-dashed border-border rounded-3xl">No team members added yet.</p>}
                  {data.team?.map((t: any) => (
                    <div key={t.id} className="p-4 border border-border bg-surface rounded-2xl flex items-center justify-between group hover:border-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-background border border-border flex-shrink-0 relative">
                          {t.image_url ? (
                            <Image src={t.image_url} alt={t.name} fill className="object-cover" sizes="48px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted font-bold text-lg uppercase">{t.name?.charAt(0) || "?"}</div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-base text-primary leading-tight">{t.name}</p>
                          <p className="text-xs text-text-muted mt-1">{t.role}</p>
                          {t.portfolio_link && <a href={t.portfolio_link} target="_blank" rel="noreferrer" className="text-[10px] text-accent hover:underline mt-1 w-max">View Profile ↗</a>}
                        </div>
                      </div>
                      <form action={deleteRecord} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="hidden" name="table" value="team_members" /><input type="hidden" name="id" value={t.id} />
                        <button type="submit" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 5: FESTS */}
          {currentTab === "fests" && (
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-primary">Campus Fests</h2>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs">{data.fests?.length || 0} Total</span>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm sticky top-24">
                    <h3 className="font-bold text-sm mb-4 border-b border-border pb-2">Add New Fest</h3>
                    <form action={addFest} className="space-y-4">
                      <input type="text" name="name" required placeholder="Fest Name" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <input type="text" name="fest_date" required placeholder="Time of Year (e.g., Spring 2024)" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <textarea name="description" rows={3} required placeholder="Description..." className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm outline-none resize-none"></textarea>
                      <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add Fest</button>
                    </form>
                  </AnimatedCard>
                </div>
                <div className="lg:col-span-3 space-y-3">
                  {data.fests?.length === 0 && <p className="p-8 text-center text-text-muted border border-dashed border-border rounded-3xl">No fests added yet.</p>}
                  {data.fests?.map((f: any) => (
                    <div key={f.id} className="p-4 border border-border bg-surface rounded-2xl flex justify-between items-start group hover:border-accent transition-colors">
                      <div><p className="font-bold text-base text-primary mb-1">{f.name}</p><p className="text-xs font-bold text-accent mb-2">{f.fest_date}</p><p className="text-sm text-text-muted line-clamp-2">{f.description}</p></div>
                      <form action={deleteRecord}><input type="hidden" name="table" value="fests" /><input type="hidden" name="id" value={f.id} />
                        <button type="submit" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 6: FAQS */}
          {currentTab === "faqs" && (
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-primary">FAQs</h2>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs">{data.faqs?.length || 0} Total</span>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm sticky top-24">
                    <h3 className="font-bold text-sm mb-4 border-b border-border pb-2">Add New FAQ</h3>
                    <form action={addFaq} className="space-y-4">
                      <input type="text" name="question" required placeholder="Question" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <textarea name="answer" rows={4} required placeholder="Answer..." className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm outline-none resize-none"></textarea>
                      <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add FAQ</button>
                    </form>
                  </AnimatedCard>
                </div>
                <div className="lg:col-span-3 space-y-3">
                  {data.faqs?.length === 0 && <p className="p-8 text-center text-text-muted border border-dashed border-border rounded-3xl">No FAQs added yet.</p>}
                  {data.faqs?.map((q: any) => (
                    <div key={q.id} className="p-4 border border-border bg-surface rounded-2xl flex justify-between items-start group hover:border-accent transition-colors">
                      <div><p className="font-bold text-sm text-primary mb-2">{q.question}</p><p className="text-xs text-text-muted">{q.answer}</p></div>
                      <form action={deleteRecord}><input type="hidden" name="table" value="faqs" /><input type="hidden" name="id" value={q.id} />
                        <button type="submit" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 7: RESOURCES */}
          {currentTab === "resources" && (
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-primary">Resources & Links</h2>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs">{data.resources?.length || 0} Total</span>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <AnimatedCard className="bg-surface border border-border p-6 rounded-3xl shadow-sm sticky top-24">
                    <h3 className="font-bold text-sm mb-4 border-b border-border pb-2">Add New Resource</h3>
                    <form action={addResource} className="space-y-4">
                      <input type="text" name="title" required placeholder="Document Title" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <input type="url" name="link" required placeholder="URL or Google Drive Link" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none" />
                      <select name="category" className="w-full bg-background border border-border px-4 py-2 rounded-xl text-sm outline-none">
                        <option value="Forms">Forms</option><option value="Guidelines">Guidelines</option><option value="Academic">Academic</option>
                      </select>
                      <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90">Add Resource</button>
                    </form>
                  </AnimatedCard>
                </div>
                <div className="lg:col-span-3 space-y-3">
                  {data.resources?.length === 0 && <p className="p-8 text-center text-text-muted border border-dashed border-border rounded-3xl">No resources added yet.</p>}
                  {data.resources?.map((r: any) => (
                    <div key={r.id} className="p-4 border border-border bg-surface rounded-2xl flex justify-between items-center group hover:border-accent transition-colors">
                      <div>
                        <p className="font-bold text-sm text-primary">{r.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-md">{r.category}</span>
                          <a href={r.link} target="_blank" rel="noreferrer" className="text-xs text-text-muted hover:text-primary transition-colors hover:underline">Open Link ↗</a>
                        </div>
                      </div>
                      <form action={deleteRecord}><input type="hidden" name="table" value="resources" /><input type="hidden" name="id" value={r.id} />
                        <button type="submit" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}