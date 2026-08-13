"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";

export function Footer() {
  const { resources } = useResources();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background)] py-14 px-4 sm:px-8 lg:px-12 text-[var(--text-secondary)] font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[var(--border)]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-6 space-y-3">
            <div className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
              DIGITAL ARCHIVE // EDITION 2.0
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)] uppercase">
              DESIGN RESOURCE VAULT
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md leading-relaxed">
              &quot;Built as a living, curated archive for people who care about making good things.&quot;
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
              <span>{resources.length} RESOURCES</span>
              <span>·</span>
              <span>{categories.length} COLLECTIONS</span>
              <span>·</span>
              <span>INDEXED RECENTLY</span>
            </div>
          </div>

          {/* Archive Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[var(--text-muted)] uppercase tracking-widest text-[10px] mb-4">NAVIGATION</div>
            <ul className="space-y-2.5">
              <li>
                <a href="#categories" className="hover:text-[var(--text-primary)] transition-colors">
                  01 // THE ARCHIVE
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-[var(--text-primary)] transition-colors">
                  02 // MANIFESTO
                </a>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-[var(--text-primary)] transition-colors">
                  03 // FAVORITES
                </Link>
              </li>
              <li>
                <Link href="/recently-added" className="hover:text-[var(--text-primary)] transition-colors">
                  04 // RECENTLY ADDED
                </Link>
              </li>
            </ul>
          </div>

          {/* System Info */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[var(--text-muted)] uppercase tracking-widest text-[10px] mb-4">SYSTEM</div>
            <ul className="space-y-2.5 text-[var(--text-muted)]">
              <li className="text-[var(--text-primary)] font-semibold">PRESET: EDITORIAL ARCHIVE</li>
              <li>TYPOGRAPHY: NINNA & SUISSE WORKS</li>
              <li>PALETTE: PALETTE 2 (WARM CREAM & DEEP SAGE)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--text-muted)]">
          <div>© {new Date().getFullYear()} DESIGN RESOURCE VAULT. ALL RIGHTS RESERVED.</div>
          <div>INTERACTIVE DIGITAL DESIGN ARCHIVE V2.0</div>
        </div>
      </div>
    </footer>
  );
}

