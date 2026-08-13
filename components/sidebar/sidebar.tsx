"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Star,
  Clock,
  Plus,
  Sparkles,
  X,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { CategoryIcon } from "@/components/ui/category-icon";

const navItems = [
  { href: "/", label: "Archive Collection", icon: LayoutGrid },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/recently-viewed", label: "Recently Viewed", icon: Clock },
  { href: "/recently-added", label: "Recently Added", icon: Sparkles },
];

interface SidebarProps {
  mobile?: boolean;
}

export function Sidebar({ mobile = false }: SidebarProps) {
  const pathname = usePathname();
  const { categoryCounts, favorites } = useResources();
  const { setSidebarOpen, setAddResourceOpen, setAddByUrlOpen } = useUI();

  const content = (
    <div className="flex h-full flex-col bg-[var(--surface)] text-[var(--text-primary)] border-r border-[var(--border)] font-sans">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)]">
        <Link href="/" className="group" onClick={() => setSidebarOpen(false)}>
          <div className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            ARCHIVE INDEX
          </div>
          <div className="mt-0.5 font-display text-sm font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--text-muted)] transition-colors uppercase">
            Resource Vault
          </div>
        </Link>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="p-1.5 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors"
          aria-label="Close Navigation Index Drawer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3 space-y-1.5 border-b border-[var(--border)]">
        <button
          className="w-full flex items-center justify-center gap-2 rounded bg-[var(--text-primary)] text-[var(--background)] px-3 py-2 text-xs font-semibold hover:opacity-90 transition-opacity"
          onClick={() => {
            setAddResourceOpen(true);
            setSidebarOpen(false);
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Resource
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 rounded border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] px-3 py-2 text-xs font-medium hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
          onClick={() => {
            setAddByUrlOpen(true);
            setSidebarOpen(false);
          }}
        >
          <Link2 className="h-3.5 w-3.5" />
          Import by URL
        </button>
      </div>

      <nav className="px-3 py-3 space-y-0.5 border-b border-[var(--border)]">
        <div className="mb-2 px-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
          NAVIGATION
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          const count =
            href === "/favorites"
              ? favorites.length
              : undefined;

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "group flex items-center gap-2.5 rounded px-2.5 py-1.5 text-xs transition-colors",
                active
                  ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-bold border-l-2 border-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
              <span className="flex-1">{label}</span>
              {count !== undefined && count > 0 && (
                <span className="text-[10px] font-mono text-[var(--text-muted)]">({count})</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <div className="mb-2 px-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] flex items-center justify-between">
          <span>COLLECTIONS</span>
          <span className="font-mono text-[9px]">({categories.length})</span>
        </div>
        <div className="space-y-0.5">
          {categories.map((cat) => {
            const href = `/categories/${cat.slug}`;
            const active = pathname === href;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded px-2.5 py-1.5 text-xs transition-colors",
                  active
                    ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-bold border-l-2 border-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <div className="h-4 w-4 shrink-0 flex items-center justify-center">
                  <CategoryIcon id={cat.id} className="h-4 w-4" />
                </div>
                <span className="flex-1 truncate">{cat.name}</span>
                {count > 0 && (
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{count}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[var(--border)] p-3 text-[10px] font-mono text-[var(--text-muted)] text-center">
        DESIGN RESOURCE VAULT © V2
      </div>
    </div>
  );

  if (mobile) {
    return (
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-y-0 left-0 z-50 w-72 border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl"
      >
        {content}
      </motion.aside>
    );
  }

  return (
    <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      {content}
    </aside>
  );
}

