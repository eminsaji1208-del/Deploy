import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import AnimeRippleGrid from "@/components/AnimeRippleGrid";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Student Affairs Web",
  description: "Official Gymkhana Student Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen bg-background text-primary`}>
        
        {/* THE FIX: Safe placement inside the body with afterInteractive */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" 
          strategy="afterInteractive" 
        />

        <AnimeRippleGrid />
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
      </body>
    </html>
  );
}