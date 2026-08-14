"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";

export function Footer() {
  const { resources } = useResources();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] py-12 px-4 sm:px-8 lg:px-12 text-[var(--text-secondary)] font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[var(--border)]">
          {/* Brand & Purpose */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-[var(--accent)]" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-tight text-[var(--text-primary)]">
                DESIGN RESOURCE VAULT
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)] max-w-md leading-relaxed">
              A searchable visual reference library and index for designers and frontend developers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)]">
              <span>{resources.length} RESOURCES</span>
              <span>·</span>
              <span>{categories.length} CATEGORIES</span>
              <span>·</span>
              <span>INDEXED DAILY</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2.5 font-sans text-xs">
            <div className="text-[var(--text-muted)] font-mono uppercase tracking-wider text-[10px] mb-3">
              NAVIGATION
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
                  All Resources
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-[var(--text-primary)] transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/recently-added" className="hover:text-[var(--text-primary)] transition-colors">
                  Recently Added
                </Link>
              </li>
              <li>
                <Link href="/recently-viewed" className="hover:text-[var(--text-primary)] transition-colors">
                  Recently Viewed
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator Info & Social Links */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <div>
              <div className="text-[var(--text-muted)] font-mono uppercase tracking-wider text-[10px] mb-1.5">
                CREATOR
              </div>
              <div className="text-xs font-semibold text-[var(--text-primary)] tracking-wide uppercase">
                BUILT BY PRADNYESH
              </div>
            </div>

            {/* Social Links with exact URLs */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://x.com/Pradnyesh_25"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shadow-2xs"
                aria-label="Follow Pradnyesh on X"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="font-mono text-[11px]">X</span>
              </a>

              <a
                href="https://github.com/25Pradnyesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shadow-2xs"
                aria-label="View Pradnyesh on GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="font-mono text-[11px]">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[var(--text-muted)]">
          <div>© {new Date().getFullYear()} DESIGN RESOURCE VAULT. ALL RIGHTS RESERVED.</div>
          <div>SYSTEMATIC DESIGN REFERENCE LIBRARY</div>
        </div>
      </div>
    </footer>
  );
}
