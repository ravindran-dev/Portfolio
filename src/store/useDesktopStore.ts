import { create } from 'zustand';

export type AppId = 'about' | 'skills' | 'projects' | 'experience' | 'contact' | string;

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  workspaceId: number;
}

interface DesktopStore {
  booted: boolean;
  setBooted: (booted: boolean) => void;
  windows: Record<AppId, WindowState>;
  openWindow: (id: AppId, title: string) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  focusedWindow: AppId | null;
  activeWorkspace: number;
  setActiveWorkspace: (ws: number) => void;
  launcherOpen: boolean;
  toggleLauncher: () => void;
  wallpaper: string;
  setWallpaper: (wp: string) => void;
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  booted: false, // Will be set to true after boot sequence
  setBooted: (booted) => set({ booted }),
  windows: {} as Record<AppId, WindowState>,
  focusedWindow: null,
  openWindow: (id, title) => set((state) => {
    const highestZ = Object.values(state.windows).reduce((max, w) => Math.max(max, w.zIndex), 0);
    if (state.windows[id]) {
      // If already exists, just focus, unminimize and bring to front. Also move to current workspace.
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: highestZ + 1, workspaceId: state.activeWorkspace }
        },
        focusedWindow: id
      };
    }
    // New window
    return {
      windows: {
        ...state.windows,
        [id]: { id, title, isOpen: true, isMinimized: false, isMaximized: false, zIndex: highestZ + 1, workspaceId: state.activeWorkspace }
      },
      focusedWindow: id
    };
  }),
  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    },
    focusedWindow: state.focusedWindow === id ? null : state.focusedWindow
  })),
  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    focusedWindow: state.focusedWindow === id ? null : state.focusedWindow
  })),
  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),
  focusWindow: (id) => set((state) => {
    if (!state.windows[id]?.isOpen) return state;
    if (state.focusedWindow === id) return state; // already focused
    const highestZ = Object.values(state.windows).reduce((max, w) => Math.max(max, w.zIndex), 0);
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: highestZ + 1 }
      },
      focusedWindow: id
    };
  }),
  activeWorkspace: 1,
  setActiveWorkspace: (ws) => set({ activeWorkspace: ws }),
  launcherOpen: false,
  toggleLauncher: () => set((state) => ({ launcherOpen: !state.launcherOpen })),
  wallpaper: 'Techno-Geek', // Options: Space-Nebula, Tokyo_Pink, Dreamy-Aesthetic, Lofi-Desktop, Techno-Geek, Premium-Wallpaper
  setWallpaper: (wp) => set({ wallpaper: wp })
}));
