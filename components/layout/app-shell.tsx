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
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] selection:bg-[var(--pale-mint)]">
      {/* Editorial Header — Left: Menu | Center: Brand | Right: Actions */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md px-4 sm:px-8 lg:px-12">
        {/* Left: MENU Button Drawer Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-sans text-xs text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
            aria-label="Open Navigation Index Drawer"
          >
            <Menu className="h-4 w-4 text-[var(--text-muted)]" />
            <span className="font-bold tracking-widest text-[11px] uppercase">MENU</span>
          </button>
        </div>

        {/* Center / Left-Center: Brand Identity */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="h-2 w-2 rounded-full bg-[var(--deep-muted-green)] transition-transform group-hover:scale-125" />
            <span className="font-display text-xs sm:text-sm font-bold tracking-widest text-[var(--text-primary)] uppercase">
              DESIGN RESOURCE VAULT
            </span>
          </Link>
        </div>

        {/* Right: Actions (Search, Favorites, Add) */}
        <div className="flex items-center gap-2 sm:gap-3 font-sans">
          <Link
            href="/favorites"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Star className="h-3.5 w-3.5 fill-[var(--warm-cream)] text-[var(--deep-muted-green)]" />
            <span className="font-mono text-[11px] font-bold">({favorites.length})</span>
          </Link>

          <button
            onClick={() => setCommandMenuOpen(true)}
            className="flex items-center gap-2 rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            <span className="hidden sm:inline tracking-wider font-semibold text-[11px]">SEARCH</span>
            <kbd className="hidden sm:inline-flex h-4 items-center rounded border border-[var(--border)] px-1 text-[9px] text-[var(--text-muted)] font-mono">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setAddResourceOpen(true)}
            className="flex items-center gap-1.5 rounded bg-[var(--text-primary)] text-[var(--background)] px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">ADD</span>
          </button>
        </div>
      </header>

      {/* Left Navigation Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
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

