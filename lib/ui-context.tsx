"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

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
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [addResourceOpen, setAddResourceOpen] = useState(false);
  const [addByUrlOpen, setAddByUrlOpen] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), []);

  return (
    <UIContext.Provider
      value={{
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
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
