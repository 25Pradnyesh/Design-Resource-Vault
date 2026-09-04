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
  ArrowRight,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, CATEGORY_GROUPS } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";

const navItems = [
  { href: "/", label: "All Resources", icon: LayoutGrid },
  { href: "/favorites", label: "Starred Favorites", icon: Star },
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
    <div className="flex h-full flex-col bg-white text-slate-900 border-r border-slate-200 font-sans select-none w-80 sm:w-96 shadow-2xl">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="h-6 w-6 rounded bg-slate-900 text-white font-mono text-[11px] font-bold flex items-center justify-center">
            V
          </div>
          <div>
            <div className="font-display text-xs font-bold uppercase tracking-tight text-slate-900">
              DESIGN RESOURCE VAULT
            </div>
            <div className="font-mono text-[9px] text-slate-400 uppercase">
              TAXONOMY INDEX // 22 CATEGORIES
            </div>
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Close Navigation Drawer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="px-3.5 py-3 space-y-1 border-b border-slate-200">
        <div className="mb-1.5 px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          CURATED BENCHMARKS
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
                "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-900"
                )}
              />
              <span className="flex-1">{label}</span>
              {count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded font-bold",
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Grouped Taxonomy Index List */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
        <div className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          SPECIALIZED TAXONOMIES (22)
        </div>

        {CATEGORY_GROUPS.map((group) => (
          <div key={group.id} className="space-y-1.5">
            <div className="px-2 font-mono text-[10px] font-black uppercase text-slate-900 border-b border-slate-100 pb-1">
              {group.name}
            </div>

            <div className="space-y-0.5">
              {group.categoryIds.map((catId) => {
                const cat = categories.find((c) => c.id === catId);
                if (!cat) return null;
                const active = pathname === `/categories/${cat.slug}`;
                const count = categoryCounts[cat.id] ?? 0;

                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                      active
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span
                      className={cn(
                        "font-mono text-[10px] px-1.5 py-0.2 rounded shrink-0",
                        active ? "bg-white/20 text-white font-bold" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Footer */}
      <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-slate-500 font-mono text-[10.5px]">
        <span>ARCHIVE LEDGER</span>
        <span className="text-blue-600 font-bold">V2.0 STABLE</span>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <aside
        id="navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
        className="fixed inset-y-0 left-0 z-50 flex focus:outline-none"
      >
        {content}
      </aside>
    );
  }

  return <aside className="hidden lg:block shrink-0">{content}</aside>;
}
