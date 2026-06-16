import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Find the admin in your Vercel Postgres database
          const { rows } = await sql`SELECT * FROM admins WHERE email = ${credentials.email}`;
          const user = rows[0];

          // Check if user exists AND password matches the encrypted hash
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return { id: user.id.toString(), email: user.email };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Tells NextAuth to use our custom login page
  },
});

export { handler as GET, handler as POST };