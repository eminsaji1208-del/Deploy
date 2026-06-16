"use server";
import { createClient } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // Manually open connection to Prisma DB
  const client = createClient({ connectionString: process.env.POSTGRES_URL });
  await client.connect();

  try {
    await client.sql`
      INSERT INTO events (title, slug, event_date, category, description)
      VALUES (${title}, ${slug}, ${date}, ${category}, ${description})
    `;
    
    revalidatePath('/admin');
    
  } catch (error) {
    console.error("Failed to post event:", error);
    throw new Error("Failed to post event");
  } finally {
    // Always close the connection, even if it fails
    await client.end();
  }
}