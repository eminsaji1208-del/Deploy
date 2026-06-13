import { siteConfig } from "@/data/site-config";
import PageHeader from "@/components/PageHeader";
import { Compass, Target } from "lucide-react";

export default function VisionMissionPage() {
  return (
    <div>
      <PageHeader title="Vision & Mission" subtitle="Our ongoing institutional compass guiding daily operations." />
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-2xl border">
          <Compass className="text-accent mb-6" size={32} />
          <h2 className="text-2xl font-bold text-primary mb-4">{siteConfig.visionMission.vision.title}</h2>
          <p className="text-text-muted leading-relaxed">{siteConfig.visionMission.vision.text}</p>
        </div>
        <div className="bg-primary text-white p-10 rounded-2xl shadow-xl">
          <Target className="text-accent mb-6" size={32} />
          <h2 className="text-2xl font-bold mb-4">{siteConfig.visionMission.mission.title}</h2>
          <p className="text-white/80 leading-relaxed">{siteConfig.visionMission.mission.text}</p>
        </div>
      </div>
    </div>
  );
}