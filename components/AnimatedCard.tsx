"use client";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`bg-surface border border-border rounded-2xl transition-colors duration-300 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(0,102,255,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}