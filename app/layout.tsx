import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AnimeRippleGrid from "@/components/AnimeRippleGrid";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen bg-background text-text-main cursor-default md:cursor-none`}>
        {/* Global Interactive Elements */}
        <CustomCursor />
        <AnimeRippleGrid />
        
        <Navbar />
        
        {/* Content (which gets wrapped by template.tsx automatically) */}
        <div className="flex-grow">{children}</div>
        
        <Footer />
      </body>
    </html>
  );
}