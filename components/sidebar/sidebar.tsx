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
  Moon,
  Sun,
  X,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useTheme } from "@/lib/theme-context";
import { useUI } from "@/lib/ui-context";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "All Resources", icon: LayoutGrid },
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
  const { resolvedTheme, toggleTheme } = useTheme();
  const { setSidebarOpen, setAddResourceOpen, setAddByUrlOpen } = useUI();

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" className="group" onClick={() => setSidebarOpen(false)}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Design & UI/UX
          </div>
          <div className="mt-0.5 text-sm font-semibold tracking-tight group-hover:text-foreground/80 transition-colors">
            Resource Vault
          </div>
        </Link>
        {mobile && (
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="px-3 pb-3 space-y-1">
        <Button
          className="w-full justify-start"
          onClick={() => {
            setAddResourceOpen(true);
            setSidebarOpen(false);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            setAddByUrlOpen(true);
            setSidebarOpen(false);
          }}
        >
          <Link2 className="h-4 w-4" />
          Add by URL
        </Button>
      </div>

      <nav className="px-3 py-2">
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Navigation
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
                "group relative flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-70" />
              <span className="flex-1">{label}</span>
              {count !== undefined && count > 0 && (
                <span className="text-[10px] tabular-nums text-muted-foreground">{count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
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
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                  active
                    ? "bg-sidebar-accent text-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <span className="text-xs">{cat.emoji}</span>
                <span className="flex-1 truncate">{cat.name}</span>
                {count > 0 && (
                  <span className="text-[10px] tabular-nums text-muted-foreground">{count}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={toggleTheme}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-y-0 left-0 z-40 w-72 border-r border-sidebar-border bg-sidebar"
      >
        {content}
      </motion.aside>
    );
  }

  return (
    <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-sidebar-border lg:bg-sidebar">
      {content}
    </aside>
  );
}
