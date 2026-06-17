"use server";
import { Client } from "pg"; // <-- Swapped to standard pg library
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const client = new Client({ connectionString: process.env.POSTGRES_URL });
  await client.connect();

  try {
    // Note: The standard pg library uses $1, $2 for variables (prevents SQL injection)
    await client.query(
      `INSERT INTO events (title, slug, event_date, category, description)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, slug, date, category, description]
    );
    
    revalidatePath('/admin');
    
  } catch (error) {
    console.error("Failed to post event:", error);
    throw new Error("Failed to post event");
  } finally {
    await client.end();
  }
}