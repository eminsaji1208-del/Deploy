// components/LiveBulletin.tsx
"use client"; // This tells Next.js it is safe to put on your interactive home page!

import { useEffect, useState } from "react";
import { Bell, Users, Calendar, FileText, Link as LinkIcon, HelpCircle, Activity } from "lucide-react";
import { getBulletinActivity } from "@/app/actions/getBulletin";

// Re-map the icon strings back to actual Lucide components on the client side
const IconMap: Record<string, any> = {
  FileText,
  Users,
  Calendar,
  HelpCircle,
  LinkIcon,
};

export default function LiveBulletin() {
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Safely fetch the data from the server when the component loads
  useEffect(() => {
    async function fetchActivity() {
      const data = await getBulletinActivity();
      setRecentActivity(data);
      setIsLoading(false);
    }
    fetchActivity();
  }, []);

  return (
    <div className="bg-surface border border-border p-6 rounded-3xl shadow-lg w-full max-w-md">
      <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
        <div className="p-2 bg-accent/10 rounded-xl">
          <Bell className="text-accent animate-pulse" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-primary leading-tight">Live Bulletin</h2>
          <p className="text-xs font-bold text-text-muted">Campus Updates & News</p>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-text-muted italic text-center py-4">Loading live updates...</p>
        ) : recentActivity.length === 0 ? (
          <p className="text-sm text-text-muted italic text-center py-4">No recent updates.</p>
        ) : (
          recentActivity.map((activity) => {
            const IconComponent = IconMap[activity.iconName] || Activity;
            
            return (
              <div key={activity.id} className="flex gap-4 group">
                <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                  <IconComponent size={14} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-accent">{activity.type}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <time className="text-[10px] text-text-muted font-bold">
                      {new Date(activity.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                  <p className="text-sm font-bold text-primary leading-snug group-hover:text-accent transition-colors">
                    {activity.title}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}