import { create } from "zustand";

interface UIState {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// §1.2 — the command palette is the "real" navigation for power users. Its open
// state is global so any component (and the ⌘K hotkey) can drive it.
export const useUIStore = create<UIState>((set) => ({
  commandOpen: false,
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));