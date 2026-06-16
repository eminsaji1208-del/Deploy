"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import AnimeOrganicShape from "@/components/AnimeOrganicShape";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Send credentials to NextAuth
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid administrative credentials.");
      setLoading(false);
    } else {
      router.push("/admin"); // Success! Send them to the dashboard
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
      <AnimeOrganicShape className="w-[800px] h-[800px] top-[-200px] left-[-300px] opacity-20 text-accent pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg">
            <ShieldCheck size={32} className="text-highlight" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tight mb-2">Admin Portal</h1>
          <p className="text-sm text-text-muted font-light">Authorized Student Affairs personnel only.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-surface border border-border p-8 rounded-3xl shadow-xl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 block">Official Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-primary"
                  placeholder="admin@iitp.ac.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-primary"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? "Authenticating..." : "Secure Login"} <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}