import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs sm:text-sm font-sans text-[var(--text-primary)]",
      "placeholder:text-[var(--text-muted)]",
      "focus-visible:outline-none focus-visible:border-[var(--border-strong)] focus-visible:ring-1 focus-visible:ring-[var(--accent)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "resize-y transition-colors shadow-2xs",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
