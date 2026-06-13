import FadeIn from "./FadeIn";

export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="pt-40 pb-16 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-4">{title}</h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-text-muted max-w-2xl leading-relaxed font-light">{subtitle}</p>
          </FadeIn>
        )}
      </div>
    </div>
  );
}