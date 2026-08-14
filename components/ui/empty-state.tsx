import React from "react";
import { cn } from "@/lib/utils";

interface ActionObject {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode | ActionObject;
  className?: string;
}

function isActionObject(action: unknown): action is ActionObject {
  return typeof action === "object" && action !== null && "label" in action && "onClick" in action;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-14 text-center font-sans",
        className
      )}
    >
      {icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)]">
          {icon}
        </div>
      )}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] font-mono">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-xs text-[var(--text-muted)] leading-relaxed">{description}</p>
      )}
      {action && (
        <div className="mt-4">
          {isActionObject(action) ? (
            <button
              onClick={action.onClick}
              className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
            >
              {action.label}
            </button>
          ) : (
            action as React.ReactNode
          )}
        </div>
      )}
    </div>
  );
}
