"use server";
import { Client } from "pg";
import { revalidatePath } from "next/cache";

// --- THE MISSING HELPER FUNCTION ---
async function getDbClient() {
  const client = new Client({ connectionString: process.env.POSTGRES_URL });
  await client.connect();
  return client;
}

// --- ORIGINAL ACTIONS ---
export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const client = await getDbClient();
  try {
    await client.query(
      `INSERT INTO events (title, slug, event_date, category, description) VALUES ($1, $2, $3, $4, $5)`,
      [title, slug, date, category, description]
    );
    revalidatePath('/admin');
  } finally { await client.end(); }
}

export async function addTeamMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const email = formData.get("email") as string;

  const client = await getDbClient();
  try {
    await client.query(
      `INSERT INTO team_members (name, role, email) VALUES ($1, $2, $3)`,
      [name, role, email]
    );
    revalidatePath('/admin');
  } finally { await client.end(); }
}

export async function addFest(formData: FormData) {
  const name = formData.get("name") as string;
  const fest_date = formData.get("fest_date") as string;
  const description = formData.get("description") as string;

  const client = await getDbClient();
  try {
    await client.query(
      `INSERT INTO fests (name, fest_date, description) VALUES ($1, $2, $3)`,
      [name, fest_date, description]
    );
    revalidatePath('/admin');
  } finally { await client.end(); }
}

export async function updateVision(formData: FormData) {
  const vision = formData.get("vision") as string;

  const client = await getDbClient();
  try {
    await client.query(
      `INSERT INTO site_settings (setting_key, setting_value) VALUES ('vision', $1) 
       ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value`,
      [vision]
    );
    revalidatePath('/admin');
    revalidatePath('/team'); 
  } finally { await client.end(); }
}

export async function deleteRecord(formData: FormData) {
  const id = formData.get("id") as string;
  const table = formData.get("table") as string;
  
  const allowedTables = ['events', 'team_members', 'fests', 'faqs', 'resources'];
  if (!allowedTables.includes(table)) return;

  const client = await getDbClient();
  try {
    await client.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    revalidatePath('/admin');
  } finally { await client.end(); }
}

// --- NEW ACTIONS (FAQs & Resources) ---
export async function addFaq(formData: FormData) {
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;

  const client = await getDbClient();
  try {
    await client.query(
      `INSERT INTO faqs (question, answer) VALUES ($1, $2)`,
      [question, answer]
    );
    revalidatePath('/admin');
  } finally { await client.end(); }
}

export async function addResource(formData: FormData) {
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const category = formData.get("category") as string;

  const client = await getDbClient();
  try {
    await client.query(
      `INSERT INTO resources (title, link, category) VALUES ($1, $2, $3)`,
      [title, link, category]
    );
    revalidatePath('/admin');
  } finally { await client.end(); }
}