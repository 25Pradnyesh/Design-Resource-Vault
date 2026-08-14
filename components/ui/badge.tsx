import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

export function Badge({ children, variant = "secondary", className, onClick }: BadgeProps) {
  const Component = onClick ? "button" : "span";
  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium font-mono tracking-wide transition-colors select-none",
        variant === "default" && "bg-[var(--accent)] text-white",
        variant === "secondary" && "bg-[var(--surface-muted)] text-[var(--text-primary)] border border-[var(--border)]",
        variant === "outline" && "border border-[var(--border)] text-[var(--text-muted)]",
        onClick && "cursor-pointer hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </Component>
  );
}
