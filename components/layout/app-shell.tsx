"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const [scrollTier, setScrollTier] = useState<"top" | "light" | "deep">("top");

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
            ? "border-b border-[#E2E8F0]/70 bg-white/85 backdrop-blur-[12px] shadow-none"
            : scrollTier === "light"
            ? "border-b border-[#E2E8F0]/30 bg-white/50 backdrop-blur-[10px] shadow-none"
            : "border-b border-transparent bg-white/[0.18] backdrop-blur-[6px] shadow-none"
        }`}
      >
        <div className="relative flex h-full w-full items-center justify-between px-3 sm:px-8 lg:px-12">

          {/* ============================================================
              LEFT — MENU (DRAWER TRIGGER)
          ============================================================= */}
          <div className="relative z-20 flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-xs font-bold text-[#0B132B] transition-[background-color,border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 ${
                scrollTier === "top"
                  ? "border border-[#E2E8F0] bg-white/95 shadow-2xs hover:border-[#CBD5E1] hover:bg-white"
                  : scrollTier === "light"
                  ? "border border-[#E2E8F0]/60 bg-white/70 shadow-none hover:border-[#CBD5E1] hover:bg-white/95"
                  : "border border-black/5 bg-white/40 shadow-none hover:border-[#CBD5E1]/60 hover:bg-white/85"
              }`}
              aria-label="Open Navigation Index Drawer"
            >
              <Menu className="h-3.5 w-3.5 text-[#64748B]" />

              <span className="font-sans text-[11px] font-black uppercase tracking-wider">
                MENU
              </span>
            </button>
          </div>

          {/* ============================================================
              CENTER — BRAND
              Absolute viewport centering relative to full header container.
          ============================================================= */}
          <div className="pointer-events-auto absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="group flex items-center gap-2.5 outline-none sm:gap-3"
              aria-label="Design Resource Vault home"
            >
              {/* --------------------------------------------------------
                  CREATIVE COLOR WHEEL (RESTRICTED COLOR PALETTE)
              --------------------------------------------------------- */}
              <motion.div
                className="relative h-7 w-7 shrink-0 cursor-pointer sm:h-8 sm:w-8"
                whileHover={{
                  rotate: 180,
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <svg
                  className="h-full w-full drop-shadow-xs"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="17"
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M18 4 A14 14 0 0 1 30 11 L24 14.5 A7 7 0 0 0 18 11 Z"
                    fill="#00C4CC"
                  />

                  <path
                    d="M30 11 A14 14 0 0 1 32 25 L25 21.5 A7 7 0 0 0 24 14.5 Z"
                    fill="#10B981"
                  />

                  <path
                    d="M32 25 A14 14 0 0 1 22 32 L20 25 A7 7 0 0 0 25 21.5 Z"
                    fill="#059669"
                  />

                  <path
                    d="M22 32 A14 14 0 0 1 10 30 L14 24 A7 7 0 0 0 20 25 Z"
                    fill="#FBBF24"
                  />

                  <path
                    d="M10 30 A14 14 0 0 1 4 18 L11 18 A7 7 0 0 0 14 24 Z"
                    fill="#FB923C"
                  />

                  <path
                    d="M4 18 A14 14 0 0 1 10 6 L14 12 A7 7 0 0 0 11 18 Z"
                    fill="#FA5252"
                  />

                  <path
                    d="M10 6 A14 14 0 0 1 18 4 L18 11 A7 7 0 0 0 14 12 Z"
                    fill="#F43F5E"
                  />

                  <circle
                    cx="18"
                    cy="18"
                    r="3.5"
                    fill="#0B132B"
                  />
                </svg>
              </motion.div>

              {/* --------------------------------------------------------
                  BRAND TITLE
              --------------------------------------------------------- */}
              <span
                className={`whitespace-nowrap font-sans text-xs font-black tracking-tight transition-[color,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#00C4CC] sm:text-sm md:text-[15px] ${
                  scrollTier === "deep" ? "text-[#0B132B]/90" : "text-[#0B132B]"
                }`}
              >
                DESIGN RESOURCE VAULT
              </span>
            </Link>
          </div>

          {/* ============================================================
              RIGHT — ACTIONS
          ============================================================= */}
          <div className="relative z-20 flex items-center gap-1.5 font-sans sm:gap-2.5">

            {/* FAVORITES */}
            <Link
              href="/favorites"
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-[#0B132B] transition-[background-color,border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 ${
                scrollTier === "top"
                  ? "border border-[#E2E8F0] bg-white/95 shadow-2xs hover:border-[#CBD5E1] hover:bg-white"
                  : scrollTier === "light"
                  ? "border border-[#E2E8F0]/60 bg-white/70 shadow-none hover:border-[#CBD5E1] hover:bg-white/95"
                  : "border border-black/5 bg-white/40 shadow-none hover:border-[#CBD5E1]/60 hover:bg-white/85"
              }`}
              title="View starred favorites"
              aria-label="Favorites"
            >
              <Heart
                className="h-3.5 w-3.5 text-[#FA5252]"
                fill="#FA5252"
              />

              <span className="font-mono text-[11px] font-bold">
                {favorites.length}
              </span>
            </Link>

            {/* DESKTOP SEARCH */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className={`hidden cursor-pointer items-center gap-3 rounded-full px-3.5 py-1.5 text-xs transition-[background-color,border-color,box-shadow,color,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 sm:flex ${
                scrollTier === "top"
                  ? "border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] shadow-2xs hover:border-[#CBD5E1] hover:bg-white hover:text-[#0B132B]"
                  : scrollTier === "light"
                  ? "border border-[#E2E8F0]/60 bg-[#F8FAFC]/70 text-[#64748B] shadow-none hover:border-[#CBD5E1] hover:bg-white/95 hover:text-[#0B132B]"
                  : "border border-black/5 bg-white/40 text-[#64748B] shadow-none hover:border-[#CBD5E1]/60 hover:bg-white/85 hover:text-[#0B132B]"
              }`}
              aria-label="Search resources"
            >
              <Search className="h-3.5 w-3.5 text-[#94A3B8]" />

              <span className="font-sans text-[11px] font-medium">
                Search resources...
              </span>

              <kbd
                className={`inline-flex h-4 items-center rounded px-1.5 font-mono text-[9px] font-semibold text-[#64748B] transition-colors duration-400 ${
                  scrollTier === "deep" ? "border border-black/5 bg-white/60" : "border border-[#E2E8F0] bg-white"
                }`}
              >
                ⌘K
              </kbd>
            </button>

            {/* MOBILE SEARCH */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className={`flex cursor-pointer items-center justify-center rounded-full p-2 text-[#64748B] transition-[background-color,border-color,box-shadow,color,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-98 sm:hidden ${
                scrollTier === "top"
                  ? "border border-[#E2E8F0] bg-white/95 shadow-2xs hover:bg-white hover:text-[#0B132B]"
                  : scrollTier === "light"
                  ? "border border-[#E2E8F0]/60 bg-white/70 shadow-none hover:bg-white/95 hover:text-[#0B132B]"
                  : "border border-black/5 bg-white/40 shadow-none hover:bg-white/85 hover:text-[#0B132B]"
              }`}
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
            </button>

            {/* ADD */}
            <button
              onClick={() => setAddResourceOpen(true)}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#1E293B] hover:shadow-xs active:scale-98 sm:px-4 ${
                scrollTier === "deep" ? "bg-[#0B132B]/90" : "bg-[#0B132B]"
              }`}
              aria-label="Add new resource"
            >
              <Plus className="h-3.5 w-3.5" />

              <span className="font-sans text-[11px] font-black uppercase tracking-wider">
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
            <div
              className="fixed inset-0 z-50 bg-[#0B132B]/40 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
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