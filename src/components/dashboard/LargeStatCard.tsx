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

const iconBgVariants = {
  primary: "bg-[#e8f4fd]",
  success: "bg-[#e6f7ee]",
  warning: "bg-[#fef7e6]",
  accent: "bg-[#e8f4fd]",
};

const iconColorVariants = {
  primary: "text-[#1a8cff]",
  success: "text-[#28a745]",
  warning: "text-[#f5a623]",
  accent: "text-[#1a8cff]",
};

const labelColorVariants = {
  primary: "text-[#1a5276]",
  success: "text-[#1a5276]",
  warning: "text-[#1a5276]",
  accent: "text-[#1a5276]",
};

export function LargeStatCard({ label, value, subtitle, icon: Icon, variant = "primary", highlightText }: LargeStatCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex h-14 w-14 items-center justify-center rounded-xl",
          iconBgVariants[variant]
        )}>
          <Icon className={cn("h-7 w-7", iconColorVariants[variant])} />
        </div>
        <div className="flex-1">
          <p className={cn(
            "text-xs font-semibold uppercase tracking-wider",
            labelColorVariants[variant]
          )}>
            {label}
          </p>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {subtitle}
            {highlightText && (
              <span className={cn(
                "ml-1 font-semibold",
                variant === "success" ? "text-[#28a745]" : 
                variant === "warning" ? "text-[#f5a623]" : "text-[#1a8cff]"
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
