import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import AnimeRippleGrid from "@/components/AnimeRippleGrid";
import Script from "next/script"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* ONLY ONE BODY TAG */}
      <body className="inter_5901b7c6-module__ec5Qua__variable font-sans flex flex-col min-h-screen">
        
        {/* THE NUCLEAR BYPASS */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" strategy="beforeInteractive" />
        
        <CustomCursor />
        <AnimeRippleGrid />
        <Navbar />
        
        {children}
        
      </body>
    </html>
  );
}