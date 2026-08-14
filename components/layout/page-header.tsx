"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between font-sans", className)}
    >
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-[var(--text-primary)]">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 shadow-2xs font-sans">
      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </div>
      <div className="mt-0.5 text-xl font-bold tabular-nums tracking-tight text-[var(--text-primary)]">{value}</div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  count?: number;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, count, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-3 flex items-center justify-between font-sans", className)}>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-xs bg-[var(--accent)]" />
        <h2 className="text-xs sm:text-sm font-bold tracking-tight uppercase text-[var(--text-primary)]">
          {title}
        </h2>
        {count !== undefined && (
          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-1.5 py-0.5 rounded">
            {count}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}
