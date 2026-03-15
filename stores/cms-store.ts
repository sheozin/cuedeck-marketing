'use client';

import { create } from 'zustand';
import type { CmsUser } from '@/types/cms';

interface CmsStore {
  user: CmsUser | null;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  setUser: (user: CmsUser | null) => void;
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useCmsStore = create<CmsStore>((set) => ({
  user: null,
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  setUser: (user) => set({ user }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
