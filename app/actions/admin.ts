"use server";

import { Pool } from "pg";
import { revalidatePath } from "next/cache";

// --- THE UPGRADE: Connection Pool ---
// This safely manages your database connections in the background without crashing.
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    await pool.query(
      `INSERT INTO events (title, slug, event_date, category, description) VALUES ($1, $2, $3, $4, $5)`,
      [title, slug, date, category, description]
    );
    revalidatePath('/admin'); // <--- INSTANT UI REFRESH
  } catch (error) {
    console.error("Failed to create event:", error);
  }
}

export async function addTeamMember(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const email = formData.get("email") as string;
  const portfolio_link = formData.get("portfolio_link") as string || null; // Added support for your UI Link!

  try {
    await pool.query(
      `INSERT INTO team_members (name, role, email, portfolio_link) VALUES ($1, $2, $3, $4)`,
      [name, role, email, portfolio_link]
    );
    revalidatePath('/admin');
  } catch (error) {
    console.error("Failed to add team member:", error);
  }
}

export async function addFest(formData: FormData) {
  const name = formData.get("name") as string;
  const fest_date = formData.get("fest_date") as string;
  const description = formData.get("description") as string;

  try {
    await pool.query(
      `INSERT INTO fests (name, fest_date, description) VALUES ($1, $2, $3)`,
      [name, fest_date, description]
    );
    revalidatePath('/admin');
  } catch (error) {
    console.error("Failed to add fest:", error);
  }
}

export async function updateVision(formData: FormData) {
  const vision = formData.get("vision") as string;

  try {
    await pool.query(
      `INSERT INTO site_settings (setting_key, setting_value) VALUES ('vision', $1) 
       ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value`,
      [vision]
    );
    revalidatePath('/admin');
    revalidatePath('/team'); // Refreshes the public facing team page too!
  } catch (error) {
    console.error("Failed to update vision:", error);
  }
}

export async function deleteRecord(formData: FormData) {
  const id = formData.get("id") as string;
  const table = formData.get("table") as string;
  
  // Security check: Only allow deleting from these specific tables
  const allowedTables = ['events', 'team_members', 'fests', 'faqs', 'resources'];
  if (!allowedTables.includes(table)) return;

  try {
    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    revalidatePath('/admin');
  } catch (error) {
    console.error("Failed to delete record:", error);
  }
}

export async function addFaq(formData: FormData) {
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;

  try {
    await pool.query(
      `INSERT INTO faqs (question, answer) VALUES ($1, $2)`,
      [question, answer]
    );
    revalidatePath('/admin');
  } catch (error) {
    console.error("Failed to add FAQ:", error);
  }
}

export async function addResource(formData: FormData) {
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const category = formData.get("category") as string;

  try {
    await pool.query(
      `INSERT INTO resources (title, link, category) VALUES ($1, $2, $3)`,
      [title, link, category]
    );
    revalidatePath('/admin');
  } catch (error) {
    console.error("Failed to add resource:", error);
  }
}