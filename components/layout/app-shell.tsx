"use client";

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
  const { sidebarOpen, setSidebarOpen, setCommandMenuOpen, setAddResourceOpen } = useUI();
  const { favorites } = useResources();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Header — True Viewport Centering with Left Menu, Center Iris Wordmark, Right Controls */}
      <header className="sticky top-0 z-40 relative flex h-16 items-center justify-between border-b border-[#E2E8F0]/80 bg-white/85 backdrop-blur-md px-4 sm:px-8 lg:px-12 select-none">
        
        {/* Left: Rounded MENU Button */}
        <div className="flex items-center z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 font-sans text-xs font-bold text-[#0B132B] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-all cursor-pointer shadow-2xs active:scale-98"
            aria-label="Open Navigation Index Drawer"
          >
            <Menu className="h-3.5 w-3.5 text-[#64748B]" />
            <span className="font-sans text-[11px] font-black uppercase tracking-wider">MENU</span>
          </button>
        </div>

        {/* Center: Truly Viewport-Centered Brand Mark & Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto z-10">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group outline-none">
            {/* Expressive Creative Color-Wheel Iris Logo with 180° Smooth Rotation */}
            <motion.div
              className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0 cursor-pointer"
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                className="w-full h-full drop-shadow-xs"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="17" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                {/* Multi-color energetic iris blades (No purple/violet/blue) */}
                <path d="M18 4 A 14 14 0 0 1 30 11 L 24 14.5 A 7 7 0 0 0 18 11 Z" fill="#00C4CC" />
                <path d="M30 11 A 14 14 0 0 1 32 25 L 25 21.5 A 7 7 0 0 0 24 14.5 Z" fill="#10B981" />
                <path d="M32 25 A 14 14 0 0 1 22 32 L 20 25 A 7 7 0 0 0 25 21.5 Z" fill="#059669" />
                <path d="M22 32 A 14 14 0 0 1 10 30 L 14 24 A 7 7 0 0 0 20 25 Z" fill="#FBBF24" />
                <path d="M10 30 A 14 14 0 0 1 4 18 L 11 18 A 7 7 0 0 0 14 24 Z" fill="#FB923C" />
                <path d="M4 18 A 14 14 0 0 1 10 6 L 14 12 A 7 7 0 0 0 11 18 Z" fill="#FA5252" />
                <path d="M10 6 A 14 14 0 0 1 18 4 L 18 11 A 7 7 0 0 0 14 12 Z" fill="#F43F5E" />
                <circle cx="18" cy="18" r="3.5" fill="#0B132B" />
              </svg>
            </motion.div>

            {/* Dominant Brand Title */}
            <span className="font-sans text-xs sm:text-sm md:text-[15px] font-black tracking-tight text-[#0B132B] uppercase whitespace-nowrap group-hover:text-[#00C4CC] transition-colors">
              DESIGN RESOURCE VAULT
            </span>
          </Link>
        </div>

        {/* Right: Actions (Favorites, Search Pill, ADD Navy Button) */}
        <div className="flex items-center gap-2 sm:gap-2.5 font-sans z-10">
          {/* Favorites Pill */}
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E2E8F0] bg-white text-xs text-[#0B132B] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-all shadow-2xs"
            title="View starred favorites"
          >
            <Heart className="h-3.5 w-3.5 fill-[#FA5252] text-[#FA5252]" />
            <span className="font-mono text-[11px] font-bold">{favorites.length}</span>
          </Link>

          {/* Search Pill Input */}
          <button
            onClick={() => setCommandMenuOpen(true)}
            className="hidden sm:flex items-center gap-3 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-xs text-[#64748B] hover:border-[#CBD5E1] hover:bg-white hover:text-[#0B132B] transition-all cursor-pointer shadow-2xs"
          >
            <Search className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span className="font-sans text-[11px] font-medium text-[#64748B]">Search resources...</span>
            <kbd className="inline-flex h-4 items-center rounded border border-[#E2E8F0] bg-white px-1.5 text-[9px] text-[#64748B] font-mono font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Mobile search icon button */}
          <button
            onClick={() => setCommandMenuOpen(true)}
            className="sm:hidden flex items-center justify-center p-2 rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0B132B] shadow-2xs"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>

          {/* Primary + ADD Button */}
          <button
            onClick={() => setAddResourceOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-[#0B132B] text-white px-4 py-1.5 text-xs font-bold hover:bg-[#1E293B] hover:shadow-md transition-all cursor-pointer shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="font-sans text-[11px] font-black uppercase tracking-wider">ADD</span>
          </button>
        </div>
      </header>

      {/* Left Navigation Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-[#0B132B]/40 backdrop-blur-xs transition-opacity"
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
