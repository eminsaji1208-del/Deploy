import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export default function VisionMissionPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="Vision & Mission" subtitle="Our ongoing institutional compass guiding daily operations." />
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-8">
        <FadeIn delay={0.1}>
          <div className="bg-surface p-12 rounded-2xl border border-border h-full hover:border-text-muted transition-colors duration-500">
            <h2 className="text-2xl font-semibold text-primary mb-6 tracking-tight">{siteConfig.visionMission.vision.title}</h2>
            <p className="text-text-muted leading-relaxed font-light text-lg">{siteConfig.visionMission.vision.text}</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="bg-primary text-white p-12 rounded-2xl h-full">
            <h2 className="text-2xl font-semibold mb-6 tracking-tight">{siteConfig.visionMission.mission.title}</h2>
            <p className="text-white/70 leading-relaxed font-light text-lg">{siteConfig.visionMission.mission.text}</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}   