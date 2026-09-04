"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, Search, Plus, Heart, Compass, Sparkles } from "lucide-react";
import { useUI } from "@/lib/ui-context";
import { useResources } from "@/lib/resource-context";
import { Sidebar } from "@/components/sidebar/sidebar";
import { CommandMenu } from "@/components/command-menu/command-menu";
import { AddResourceModal } from "@/components/add-resource/add-resource-form";
import { AddByUrlModal } from "@/components/add-resource/add-by-url";
import { QuickInspectDrawer } from "@/components/resource-detail/quick-inspect-drawer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const {
    sidebarOpen,
    setSidebarOpen,
    setCommandMenuOpen,
    setAddResourceOpen,
  } = useUI();

  const { favorites, resources } = useResources();
  const shouldReduceMotion = useReducedMotion();
  const [scrollTier, setScrollTier] = useState<"top" | "scrolled">("top");
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollTier(y > 20 ? "scrolled" : "top");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col font-sans">
      {/* ================================================================
          GLOBAL PERSISTENT DESIGN-SYSTEM HEADER
      ================================================================= */}
      <header
        className={`fixed inset-x-0 top-0 z-40 h-16 select-none transition-all duration-300 ${scrollTier === "top"
          ? "border-b border-slate-200 bg-white/90 backdrop-blur-md"
          : "border-b border-slate-200/80 bg-white/95 backdrop-blur-lg shadow-xs"
          }`}
      >
        <div className="relative flex h-full w-full items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-12">

          {/* LEFT — MENU (DRAWER TRIGGER) */}
          <div className="relative z-20 flex items-center shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-slate-700 border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              aria-label="Open Navigation Index Drawer"
              aria-expanded={sidebarOpen}
              aria-controls="navigation-drawer"
            >
              <Menu className="h-4 w-4 text-slate-500" />
              <span className="uppercase tracking-wider">INDEX</span>
            </button>
          </div>

          {/* CENTER — BRAND */}
          <div className="pointer-events-auto absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg flex items-center gap-2.5 group"
              aria-label="Design Resource Vault home"
            >
              {/* Geometric Modernist Vault Emblem */}
              <div className="relative flex h-7 w-7 items-center justify-center shrink-0 rounded-lg bg-slate-900 text-white font-mono text-xs font-black shadow-xs group-hover:bg-blue-600 transition-colors">
                <span>V</span>
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-blue-400 border border-white" />
              </div>

              <div className="flex flex-col">
                <span className="font-display text-sm sm:text-base font-black tracking-tight text-slate-900 leading-none group-hover:text-blue-600 transition-colors">
                  DESIGN RESOURCE VAULT
                </span>
                <span className="font-mono text-[9px] uppercase font-semibold text-slate-400 leading-tight tracking-wider">
                  ARCHIVAL SPECIMEN SYSTEM
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT — ACTIONS */}
          <div className="relative z-20 flex items-center gap-2 shrink-0">
            {/* FAVORITES */}
            <Link
              href="/favorites"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              title="View starred favorites"
              aria-label="Favorites"
            >
              <Heart
                className="h-3.5 w-3.5 text-rose-500"
                fill={favorites.length > 0 ? "#EF4444" : "none"}
              />
              <span className="font-mono text-xs font-bold">
                {favorites.length}
              </span>
            </Link>

            {/* SEARCH TRIGGER */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className="hidden sm:flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              aria-label="Search resources"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-sans text-xs">Search</span>
              <kbd className="inline-flex h-4 items-center rounded border border-slate-300 bg-white px-1.5 font-mono text-[9.5px] font-bold text-slate-600">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* MOBILE SEARCH ICON BUTTON (< 640px) */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className="flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none sm:hidden"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* ADD RESOURCE BUTTON */}
            <button
              onClick={() => setAddResourceOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              aria-label="Add new resource"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden md:inline">ADD SPECIMEN</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================
          NAVIGATION DRAWER
      ================================================================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs cursor-pointer"
              onClick={() => setSidebarOpen(false)}
              role="presentation"
              aria-label="Close navigation drawer"
            />
            <Sidebar mobile />
          </>
        )}
      </AnimatePresence>

      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}
      <main className="w-full flex-1 pt-16">
        {children}
      </main>

      {/* GLOBAL MODALS & QUICK INSPECTOR */}
      <CommandMenu />
      <QuickInspectDrawer />
      <AddResourceModal />
      <AddByUrlModal />
    </div>
  );
}