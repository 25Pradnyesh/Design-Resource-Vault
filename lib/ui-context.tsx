"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { ViewMode } from "@/types";

interface UIContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  commandMenuOpen: boolean;
  setCommandMenuOpen: (open: boolean) => void;
  addResourceOpen: boolean;
  setAddResourceOpen: (open: boolean) => void;
  addByUrlOpen: boolean;
  setAddByUrlOpen: (open: boolean) => void;
  editingResourceId: string | null;
  setEditingResourceId: (id: string | null) => void;
  inspectResourceId: string | null;
  setInspectResourceId: (id: string | null) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [addResourceOpen, setAddResourceOpen] = useState(false);
  const [addByUrlOpen, setAddByUrlOpen] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [inspectResourceId, setInspectResourceId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");

  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      commandMenuOpen,
      setCommandMenuOpen,
      addResourceOpen,
      setAddResourceOpen,
      addByUrlOpen,
      setAddByUrlOpen,
      editingResourceId,
      setEditingResourceId,
      inspectResourceId,
      setInspectResourceId,
      viewMode,
      setViewMode,
    }),
    [
      sidebarOpen,
      toggleSidebar,
      commandMenuOpen,
      addResourceOpen,
      addByUrlOpen,
      editingResourceId,
      inspectResourceId,
      viewMode,
    ]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
