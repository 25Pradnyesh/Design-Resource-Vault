import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs sm:text-sm font-sans text-[var(--text-primary)]",
        "placeholder:text-[var(--text-muted)]",
        "focus-visible:outline-none focus-visible:border-[var(--border-strong)] focus-visible:ring-1 focus-visible:ring-[var(--accent)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors shadow-2xs",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
