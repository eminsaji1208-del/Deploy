// app/actions/getBulletin.ts
"use server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

export async function getBulletinActivity() {
  try {
    const checkTables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    const tableNames = checkTables.rows.map(r => r.table_name);

    let events = [], team = [], fests = [], faqs = [], resources = [];

    // Fetch the 5 newest items from each table safely
    if (tableNames.includes('events')) events = (await pool.query(`SELECT * FROM events ORDER BY created_at DESC LIMIT 5`)).rows;
    if (tableNames.includes('team_members')) team = (await pool.query(`SELECT * FROM team_members ORDER BY created_at DESC LIMIT 5`)).rows;
    if (tableNames.includes('fests')) fests = (await pool.query(`SELECT * FROM fests ORDER BY created_at DESC LIMIT 5`)).rows;
    if (tableNames.includes('faqs')) faqs = (await pool.query(`SELECT * FROM faqs ORDER BY created_at DESC LIMIT 5`)).rows;
    if (tableNames.includes('resources')) resources = (await pool.query(`SELECT * FROM resources ORDER BY created_at DESC LIMIT 5`)).rows;

    // Combine them and pass the Icon NAMES as strings (functions cannot cross the server/client boundary)
    const allActivity = [
      ...events.map((i: any) => ({ id: `evt-${i.id}`, type: i.category || 'Article', title: i.title, date: i.created_at.toISOString(), iconName: 'FileText', color: "text-purple-500 bg-purple-500/10" })),
      ...team.map((i: any) => ({ id: `tm-${i.id}`, type: 'New Member', title: `Welcome ${i.name} to the team!`, date: i.created_at.toISOString(), iconName: 'Users', color: "text-blue-500 bg-blue-500/10" })),
      ...fests.map((i: any) => ({ id: `fst-${i.id}`, type: 'Fest', title: `Announcing: ${i.name}`, date: i.created_at.toISOString(), iconName: 'Calendar', color: "text-pink-500 bg-pink-500/10" })),
      ...faqs.map((i: any) => ({ id: `faq-${i.id}`, type: 'FAQ Updated', title: i.question, date: i.created_at.toISOString(), iconName: 'HelpCircle', color: "text-amber-500 bg-amber-500/10" })),
      ...resources.map((i: any) => ({ id: `res-${i.id}`, type: 'New Resource', title: i.title, date: i.created_at.toISOString(), iconName: 'LinkIcon', color: "text-emerald-500 bg-emerald-500/10" })),
    ];

    // Sort by newest first, take the top 6
    return allActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  } catch (error) {
    console.error("Failed to load bulletin:", error);
    return [];
  }
}