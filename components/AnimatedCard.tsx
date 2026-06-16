export default function AnimatedCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}