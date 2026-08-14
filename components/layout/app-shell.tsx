"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Menu, Search, Plus, Star } from "lucide-react";
import { useUI } from "@/lib/ui-context";
import { useResources } from "@/lib/resource-context";
import { Sidebar } from "@/components/sidebar/sidebar";
import { CommandMenu } from "@/components/command-menu/command-menu";
import { AddResourceModal } from "@/components/add-resource/add-resource-form";
import { AddByUrlModal } from "@/components/add-resource/add-by-url";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, setCommandMenuOpen, setAddResourceOpen } = useUI();
  const { favorites } = useResources();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Header — Left: Menu | Center: Brand Mark | Right: Search / Favorites / Add */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md px-4 sm:px-8 lg:px-12">
        {/* Left: MENU Button Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-sans text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer shadow-2xs"
            aria-label="Open Navigation Index Drawer"
          >
            <Menu className="h-4 w-4 text-[var(--accent)]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">MENU</span>
          </button>
        </div>

        {/* Center: Brand Identity */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--accent)] transition-transform group-hover:scale-125" />
            <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-[var(--text-primary)] uppercase">
              DESIGN RESOURCE VAULT
            </span>
          </Link>
        </div>

        {/* Right: Actions (Search, Favorites, Add) */}
        <div className="flex items-center gap-2 sm:gap-2.5 font-sans">
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shadow-2xs"
            title="View starred favorites"
          >
            <Star className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)]" />
            <span className="font-mono text-[11px] font-semibold">{favorites.length}</span>
          </Link>

          <button
            onClick={() => setCommandMenuOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shadow-2xs"
          >
            <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            <span className="hidden sm:inline font-mono text-[11px] tracking-wide font-medium">SEARCH</span>
            <kbd className="hidden sm:inline-flex h-4 items-center rounded border border-[var(--border)] bg-[var(--surface-muted)] px-1 text-[9px] text-[var(--text-muted)] font-mono">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setAddResourceOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--background)] px-3.5 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">ADD</span>
          </button>
        </div>
      </header>

      {/* Left Navigation Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />
            <Sidebar mobile />
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {children}
      </main>

      <CommandMenu />
      <AddResourceModal />
      <AddByUrlModal />
    </div>
  );
}
