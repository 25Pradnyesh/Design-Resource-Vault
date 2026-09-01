"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, Search, Plus, Heart } from "lucide-react";
import { useUI } from "@/lib/ui-context";
import { useResources } from "@/lib/resource-context";
import { Sidebar } from "@/components/sidebar/sidebar";
import { CommandMenu } from "@/components/command-menu/command-menu";
import { AddResourceModal } from "@/components/add-resource/add-resource-form";
import { AddByUrlModal } from "@/components/add-resource/add-by-url";

export function AppShell({ children }: { children: React.ReactNode }) {
  const {
    sidebarOpen,
    setSidebarOpen,
    setCommandMenuOpen,
    setAddResourceOpen,
  } = useUI();

  const { favorites } = useResources();
  const shouldReduceMotion = useReducedMotion();
  const [scrollTier, setScrollTier] = useState<"top" | "light" | "deep">("top");
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      let nextTier: "top" | "light" | "deep" = "top";
      if (y > 120) {
        nextTier = "deep";
      } else if (y > 24) {
        nextTier = "light";
      }

      setScrollTier((prev) => (prev !== nextTier ? nextTier : prev));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* ================================================================
          GLOBAL PERSISTENT DESIGN-SYSTEM HEADER
          Reduces visual contrast as user scrolls without disappearing.
      ================================================================= */}
      <header
        className={`fixed inset-x-0 top-0 z-40 h-16 select-none transition-[background-color,backdrop-filter,border-color,box-shadow] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrollTier === "top"
            ? "border-b border-[var(--border)]/70 bg-white/85 backdrop-blur-[12px] shadow-none"
            : scrollTier === "light"
            ? "border-b border-[var(--border)]/30 bg-white/50 backdrop-blur-[10px] shadow-none"
            : "border-b border-transparent bg-white/[0.18] backdrop-blur-[6px] shadow-none"
        }`}
      >
        <div className="relative flex h-full w-full items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-12">

          {/* ============================================================
              LEFT — MENU (DRAWER TRIGGER)
          ============================================================= */}
          <div className="relative z-20 flex items-center shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`flex cursor-pointer items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3.5 py-1.5 font-sans text-xs font-bold text-[var(--text-primary)] transition-[background-color,border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                scrollTier === "top"
                  ? "border border-[var(--border)] bg-white/95 shadow-2xs hover:border-[var(--border-strong)] hover:bg-white"
                  : scrollTier === "light"
                  ? "border border-[var(--border)]/60 bg-white/70 shadow-none hover:border-[var(--border-strong)] hover:bg-white/95"
                  : "border border-black/5 bg-white/40 shadow-none hover:border-[var(--border-strong)]/60 hover:bg-white/85"
              }`}
              aria-label="Open Navigation Index Drawer"
              aria-expanded={sidebarOpen}
              aria-controls="navigation-drawer"
            >
              <Menu className="h-3.5 w-3.5 text-[var(--text-muted)]" />

              <span className="font-sans text-[11px] font-black uppercase tracking-wider">
                MENU
              </span>
            </button>
          </div>

          {/* ============================================================
              CENTER — BRAND
              Absolute viewport centering relative to full header container.
              Intelligently scales brand representation between full wordmark
              (≥1200px) and compact VAULT (<1200px) to guarantee zero collision.
          ============================================================= */}
          <div className="pointer-events-auto absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
              aria-label="Design Resource Vault home"
            >
              <motion.div
                className="group flex items-center gap-2 sm:gap-2.5 xl:gap-3"
                initial="initial"
                whileHover="hover"
                animate="initial"
              >
                {/* --------------------------------------------------------
                    CREATIVE COLOR WHEEL (RESTRICTED COLOR PALETTE)
                    Geometric circular multi-spoke emblem following DRV tokens.
                --------------------------------------------------------- */}
                <motion.div
                  className="relative flex h-7 w-7 sm:h-7.5 sm:w-7.5 items-center justify-center shrink-0"
                  variants={{
                    initial: { rotate: 0 },
                    hover: { rotate: shouldReduceMotion ? 0 : 360 },
                  }}
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                >
                  <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
                    {/* Ring Outer Rim */}
                    <circle cx="24" cy="24" r="23" stroke="#CBD5E1" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx="24" cy="24" r="21.5" stroke="#FFFFFF" strokeWidth="2.5" />

                    {/* Restricted Spectrum Palette Spokes */}
                    <path d="M24 2.5 A21.5 21.5 0 0 1 39.2 8.8 L24 24 Z" fill="#00C4CC" />
                    <path d="M39.2 8.8 A21.5 21.5 0 0 1 45.5 24 L24 24 Z" fill="#10B981" />
                    <path d="M45.5 24 A21.5 21.5 0 0 1 39.2 39.2 L24 24 Z" fill="#059669" />
                    <path d="M39.2 39.2 A21.5 21.5 0 0 1 24 45.5 L24 24 Z" fill="#FBBF24" />
                    <path d="M24 45.5 A21.5 21.5 0 0 1 8.8 39.2 L24 24 Z" fill="#FB923C" />
                    <path d="M8.8 39.2 A21.5 21.5 0 0 1 2.5 24 L24 24 Z" fill="#FA5252" />
                    <path d="M2.5 24 A21.5 21.5 0 0 1 8.8 8.8 L24 24 Z" fill="#F43F5E" />
                    <path d="M8.8 8.8 A21.5 21.5 0 0 1 24 2.5 L24 24 Z" fill="#00C4CC" />

                    {/* Iris Inner Core */}
                    <circle cx="24" cy="24" r="10" fill="#FFFFFF" />
                    <circle cx="24" cy="24" r="5.5" fill="#0B132B" />
                    <circle
                      cx="22"
                      cy="22"
                      r="1.5"
                      fill="#FFFFFF"
                      fillOpacity="0.8"
                    />
                  </svg>
                </motion.div>

                {/* --------------------------------------------------------
                    BRAND TITLE
                    ≥ 1200px (xl): Full "DESIGN RESOURCE VAULT"
                    < 1200px: Compact "VAULT" (Prevents collision with right actions)
                --------------------------------------------------------- */}
                <span
                  className={`hidden xl:inline-block whitespace-nowrap font-sans text-xs font-black tracking-tight transition-[color,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--accent)] md:text-[15px] ${
                    scrollTier === "deep" ? "text-[var(--text-primary)]/90" : "text-[var(--text-primary)]"
                  }`}
                >
                  DESIGN RESOURCE VAULT
                </span>
                <span
                  className={`inline-block xl:hidden whitespace-nowrap font-sans text-xs sm:text-[13px] font-black tracking-tight transition-[color,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--accent)] ${
                    scrollTier === "deep" ? "text-[var(--text-primary)]/90" : "text-[var(--text-primary)]"
                  }`}
                >
                  VAULT
                </span>
              </motion.div>
            </Link>
          </div>

          {/* ============================================================
              RIGHT — ACTIONS
              Adaptive horizontal density preventing collisions across viewports
          ============================================================= */}
          <div className="relative z-20 flex items-center gap-1 sm:gap-2 lg:gap-2.5 shrink-0">

            {/* FAVORITES */}
            <Link
              href="/favorites"
              className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2 py-1.5 sm:px-3 text-xs text-[var(--text-primary)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                scrollTier === "top"
                  ? "border border-[var(--border)] bg-white/95 shadow-2xs hover:border-[var(--border-strong)] hover:bg-white"
                  : scrollTier === "light"
                  ? "border border-[var(--border)]/60 bg-white/70 shadow-none hover:border-[var(--border-strong)] hover:bg-white/95"
                  : "border border-black/5 bg-white/40 shadow-none hover:border-[var(--border-strong)]/60 hover:bg-white/85"
              }`}
              title="View starred favorites"
              aria-label="Favorites"
            >
              <Heart
                className="h-3.5 w-3.5 text-[var(--accent-coral)]"
                fill="var(--accent-coral)"
              />

              <span className="font-mono text-[10px] sm:text-[11px] font-bold">
                {favorites.length}
              </span>
            </Link>

            {/* EXPANDED DESKTOP SEARCH (≥ 1200px) */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className={`hidden xl:flex cursor-pointer items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                scrollTier === "top"
                  ? "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-muted)] shadow-2xs hover:border-[var(--border-strong)] hover:bg-white hover:text-[var(--text-primary)]"
                  : scrollTier === "light"
                  ? "border border-[var(--border)]/60 bg-[var(--surface-muted)]/70 text-[var(--text-muted)] shadow-none hover:border-[var(--border-strong)] hover:bg-white/95 hover:text-[var(--text-primary)]"
                  : "border border-black/5 bg-white/40 text-[var(--text-muted)] shadow-none hover:border-[var(--border-strong)]/60 hover:bg-white/85 hover:text-[var(--text-primary)]"
              }`}
              aria-label="Search resources"
            >
              <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />

              <span className="font-sans text-[11px] font-medium">
                Search resources...
              </span>

              <kbd
                className={`inline-flex h-4 items-center rounded px-1.5 font-mono text-[9px] font-semibold text-[var(--text-muted)] transition-colors duration-300 ${
                  scrollTier === "deep" ? "border border-black/5 bg-white/60" : "border border-[var(--border)] bg-white"
                }`}
              >
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* COMPACT TABLET / MEDIUM DESKTOP SEARCH (640px to 1199px) */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className={`hidden sm:flex xl:hidden cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                scrollTier === "top"
                  ? "border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-muted)] shadow-2xs hover:border-[var(--border-strong)] hover:bg-white hover:text-[var(--text-primary)]"
                  : scrollTier === "light"
                  ? "border border-[var(--border)]/60 bg-[var(--surface-muted)]/70 text-[var(--text-muted)] shadow-none hover:border-[var(--border-strong)] hover:bg-white/95 hover:text-[var(--text-primary)]"
                  : "border border-black/5 bg-white/40 text-[var(--text-muted)] shadow-none hover:border-[var(--border-strong)]/60 hover:bg-white/85 hover:text-[var(--text-primary)]"
              }`}
              aria-label="Search resources"
            >
              <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />

              <span className="font-sans text-[11px] font-medium hidden md:inline">
                Search
              </span>

              <kbd
                className={`inline-flex h-4 items-center rounded px-1 font-mono text-[9px] font-semibold text-[var(--text-muted)] transition-colors duration-300 ${
                  scrollTier === "deep" ? "border border-black/5 bg-white/60" : "border border-[var(--border)] bg-white"
                }`}
              >
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* MOBILE SEARCH ICON BUTTON (< 640px) */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className={`flex cursor-pointer items-center justify-center rounded-full p-2 text-[var(--text-muted)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none sm:hidden ${
                scrollTier === "top"
                  ? "border border-[var(--border)] bg-white/95 shadow-2xs hover:bg-white hover:text-[var(--text-primary)]"
                  : scrollTier === "light"
                  ? "border border-[var(--border)]/60 bg-white/70 shadow-none hover:bg-white/95 hover:text-[var(--text-primary)]"
                  : "border border-black/5 bg-white/40 shadow-none hover:bg-white/85 hover:text-[var(--text-primary)]"
              }`}
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
            </button>

            {/* ADD BUTTON */}
            <button
              onClick={() => setAddResourceOpen(true)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-4 text-xs font-bold text-white shadow-2xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--text-secondary)] hover:shadow-xs active:scale-98 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                scrollTier === "deep" ? "bg-[var(--text-primary)]/90" : "bg-[var(--text-primary)]"
              }`}
              aria-label="Add new resource"
            >
              <Plus className="h-3.5 w-3.5 text-[var(--accent)]" />

              <span className="font-sans text-[11px] font-black uppercase tracking-wider hidden sm:inline">
                ADD
              </span>
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
              className="fixed inset-0 z-50 bg-[var(--text-primary)]/40 backdrop-blur-xs cursor-pointer"
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
          64px top padding prevents fixed header from covering content.
      ================================================================= */}
      <main className="w-full flex-1 pt-16">
        {children}
      </main>

      {/* GLOBAL MODALS */}
      <CommandMenu />
      <AddResourceModal />
      <AddByUrlModal />
    </div>
  );
}