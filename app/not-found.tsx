import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center px-4 font-mono">
      <div className="text-7xl sm:text-9xl font-black tracking-tighter text-muted-foreground/20 uppercase select-none">
        404
      </div>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground uppercase">
        ARCHIVE ENTRY NOT FOUND
      </h1>
      <p className="mt-2 text-xs text-muted-foreground max-w-sm font-sans">
        This resource or category doesn&apos;t exist or may have been re-indexed.
      </p>
      <Link
        href="/"
        className="mt-8 bg-foreground text-background font-mono text-xs px-6 py-3 font-bold uppercase hover:opacity-90 transition-opacity"
      >
        RETURN TO ARCHIVE
      </Link>
    </div>
  );
}
