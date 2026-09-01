"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Star,
  Clock,
  Sparkles,
  X,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { CategoryIcon } from "@/components/ui/category-icon";

const navItems = [
  { href: "/", label: "All Resources", icon: LayoutGrid },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/recently-added", label: "Recently Added", icon: Sparkles },
  { href: "/recently-viewed", label: "Recently Viewed", icon: Clock },
];

interface SidebarProps {
  mobile?: boolean;
}

export function Sidebar({ mobile = false }: SidebarProps) {
  const pathname = usePathname();
  const { categoryCounts, favorites, resources } = useResources();
  const { setSidebarOpen } = useUI();

  useEffect(() => {
    if (!mobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobile, setSidebarOpen]);

  const content = (
    <div className="flex h-full flex-col bg-[var(--surface)] text-[var(--text-primary)] border-r border-[var(--border)] font-sans select-none">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--border)] bg-[var(--surface-hover)]">
        <Link href="/" className="group flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
          <span className="h-2 w-2 rounded-sm bg-[var(--accent)]" />
          <div className="font-sans text-xs font-bold uppercase tracking-tight text-[var(--text-primary)]">
            DESIGN RESOURCE VAULT
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
          aria-label="Close Navigation Drawer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="px-3 py-3 space-y-0.5 border-b border-[var(--border)]">
        <div className="mb-1.5 px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
          NAVIGATION
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          const count =
            href === "/"
              ? resources.length
              : href === "/favorites"
              ? favorites.length
              : undefined;

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors",
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent)]/20"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5 shrink-0", active ? "text-[var(--accent)]" : "text-[var(--text-muted)]")} />
              <span className="flex-1">{label}</span>
              {count !== undefined && count > 0 && (
                <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-1.5 py-0.5 rounded">
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 22 Categories List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <div className="mb-1.5 px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3 w-3" />
            <span>CATEGORIES</span>
          </div>
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
                  "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors",
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent)]/20"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
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

      {/* Drawer Footer */}
      <div className="border-t border-[var(--border)] bg-[var(--surface-hover)] p-3 text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
        <span>REFERENCE LIBRARY</span>
        <span>V1.0 SHIP</span>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <motion.aside
        id="navigation-drawer"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-y-0 left-0 z-50 w-72 sm:w-80 border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl"
        aria-label="Site Navigation Index"
      >
        {content}
      </motion.aside>
    );
  }

  return (
    <aside
      id="navigation-drawer"
      className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col border-r border-[var(--border)] bg-[var(--surface)]"
      aria-label="Site Navigation Index"
    >
      {content}
    </aside>
  );
}
