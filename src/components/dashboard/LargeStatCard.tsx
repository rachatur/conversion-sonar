import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LargeStatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant?: "primary" | "success" | "warning" | "accent";
  highlightText?: string;
}

const iconVariants = {
  primary: "stat-icon-primary",
  success: "stat-icon-success",
  warning: "stat-icon-warning",
  accent: "stat-icon-accent",
};

export function LargeStatCard({ label, value, subtitle, icon: Icon, variant = "primary", highlightText }: LargeStatCardProps) {
  return (
    <div className="stat-card-large">
      <div className="flex items-start gap-4">
        <div className={cn("stat-icon", iconVariants[variant])}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-4xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
            {highlightText && (
              <span className={cn(
                "ml-1 font-medium",
                variant === "success" ? "text-success" : 
                variant === "warning" ? "text-warning" : "text-primary"
              )}>
                {highlightText}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
