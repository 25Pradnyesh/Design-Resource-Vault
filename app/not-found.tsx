import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center px-4 font-sans select-none">
      <div className="text-6xl sm:text-8xl font-black font-mono tracking-tighter text-[var(--text-muted)]/25">
        404
      </div>
      <h1 className="mt-3 text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
        Resource Not Found
      </h1>
      <p className="mt-1 text-xs text-[var(--text-muted)] max-w-sm">
        The requested resource or category does not exist in the vault directory.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] text-[var(--background)] px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity shadow-2xs"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to All Resources</span>
      </Link>
    </div>
  );
}
