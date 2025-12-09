import { Info, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightItem {
  type: "success" | "warning" | "info";
  text: string;
  highlight?: string;
}

interface InsightsSectionProps {
  title: string;
  insights: InsightItem[];
}

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconStyles = {
  success: "insight-icon-success",
  warning: "insight-icon-warning",
  info: "insight-icon-info",
};

export function InsightsSection({ title, insights }: InsightsSectionProps) {
  return (
    <div className="section-card">
      <div className="section-header">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-info/10">
          <Info className="h-4 w-4 text-info" />
        </div>
        <h3 className="text-lg font-semibold text-info">{title}</h3>
      </div>
      <div className="p-2">
        {insights.map((insight, index) => {
          const IconComponent = iconMap[insight.type];
          return (
            <div key={index} className="insight-item hover:bg-muted/30 transition-colors">
              <div className={cn("insight-icon", iconStyles[insight.type])}>
                <IconComponent className="h-3.5 w-3.5" />
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {insight.highlight ? (
                  <>
                    <span className={cn(
                      "font-medium",
                      insight.type === "success" ? "text-success" : 
                      insight.type === "warning" ? "text-warning" : "text-info"
                    )}>
                      {insight.highlight}
                    </span>{" "}
                    {insight.text}
                  </>
                ) : (
                  insight.text
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
