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
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          <p className={cn(
            "mt-1 text-sm",
            highlightText ? (
              variant === "success" ? "text-success" : 
              variant === "warning" ? "text-warning" : 
              variant === "accent" ? "text-accent" : "text-primary"
            ) : "text-muted-foreground"
          )}>
            {highlightText || subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
