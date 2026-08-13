"use client";

import { Library, Layers } from "lucide-react";

export function ArchiveManifesto() {
  return (
    <section id="manifesto" className="w-full border-b border-[var(--border)] bg-[var(--background)] py-20 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header & Meta */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              03 // VAULT MANIFESTO
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] uppercase leading-none">
              A LIVING
              <br />
              DIGITAL ARCHIVE
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              PHILOSOPHY · CURATION · ACCESSIBILITY
            </p>
          </div>

          {/* Body Content */}
          <div className="lg:col-span-7 space-y-8 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--accent)] pl-6 sm:pl-8">
            <p className="font-sans text-xl sm:text-2xl text-[var(--text-primary)] font-medium leading-snug">
              &quot;Great interfaces are built by studying the best work in the world. The vault is an interactive archive created to preserve, index, and organize digital craft.&quot;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-sans text-xs text-[var(--text-muted)]">
              <div className="space-y-2 border border-[var(--border)] p-5 rounded-xl bg-[var(--surface)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold uppercase tracking-wider">
                  <Library className="h-4 w-4 text-[var(--accent)]" />
                  CURATED SELECTION
                </div>
                <p className="leading-relaxed text-[var(--text-secondary)]">
                  Every tool, library, icon set, and inspiration entry is evaluated for utility, visual excellence, and code quality.
                </p>
              </div>

              <div className="space-y-2 border border-[var(--border)] p-5 rounded-xl bg-[var(--surface)]">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold uppercase tracking-wider">
                  <Layers className="h-4 w-4 text-[var(--accent)]" />
                  SPATIAL INDEXING
                </div>
                <p className="leading-relaxed text-[var(--text-secondary)]">
                  Organized into small square category tiles, allowing intuitive browsing without traditional SaaS dashboard noise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
