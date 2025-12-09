import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  children: React.ReactNode;
}

const statusClasses = {
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  info: "badge-info",
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return <span className={cn(statusClasses[status])}>{children}</span>;
}
