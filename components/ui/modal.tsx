"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: ModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Dialog"}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full flex items-center justify-center pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "pointer-events-auto w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden font-sans",
                sizes[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || description) && (
                <div className="flex items-start justify-between border-b border-[var(--border)] px-5 py-3.5 bg-[var(--surface-hover)]">
                  <div>
                    {title && (
                      <h2 className="text-sm font-bold tracking-tight text-[var(--text-primary)]">{title}</h2>
                    )}
                    {description && (
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">{description}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog" className="h-7 w-7">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
              <div className="px-5 py-4 max-h-[80vh] overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
