import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // --- GOD MODE BYPASS ---
        // If you type "admin@iitp.ac.in" and "admin", let them in immediately!
        if (credentials?.email === "admin@iitp.ac.in" && credentials?.password === "admin") {
          return { id: "1", email: "admin@iitp.ac.in" };
        }

        // We are temporarily skipping the database check to ensure you can get in.
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  // Ensure we have a secret for the session to work securely
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_testing_12345",
});

export { handler as GET, handler as POST };