"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ArchiveScene with SSR disabled for WebGL canvas
const ArchiveScene = dynamic(
  () => import("./archive-scene").then((mod) => mod.ArchiveScene),
  { ssr: false }
);

interface WebGLHeroProps {
  className?: string;
}

export function WebGLHero({ className = "" }: WebGLHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect mobile touch screen or reduced motion for lightweight rendering
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile && prefersReducedMotion) {
      setIsLowPowerDevice(true);
    }
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 ${className}`} aria-hidden="true">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      {/* Interactive WebGL Canvas (Desktop & Tablets) */}
      {mounted && !isLowPowerDevice ? (
        <ArchiveScene className="opacity-80" />
      ) : (
        /* Static Blueprint Fallback (Reduced Motion / Low Power) */
        <div className="absolute inset-0 flex items-center justify-center opacity-15">
          <div className="w-80 h-80 rounded-full border border-dashed border-[var(--accent)] -translate-y-8" />
          <div className="absolute w-48 h-48 border border-[var(--border-strong)] rotate-45" />
        </div>
      )}

      {/* Subtle Bottom Vignette Gradient to blend seamlessly into next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </div>
  );
}
