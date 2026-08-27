"use client";

import React from "react";
import { Category3DIcon } from "./category-3d-icon";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  id: string;
  className?: string;
  size?: number;
}

export function CategoryIcon({ id, className, size }: CategoryIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div
      className={cn("inline-flex items-center justify-center select-none", className)}
      style={style}
      aria-hidden="true"
    >
      <Category3DIcon id={id} className="w-full h-full object-contain" />
    </div>
  );
}

export { Category3DIcon };
