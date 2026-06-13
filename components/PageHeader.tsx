export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative pt-32 pb-16 bg-gradient-to-b from-surface to-background border-b border-border/40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-accent/3 blur-[100px] rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">{title}</h1>
        {subtitle && <p className="text-md md:text-lg text-text-muted max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}