import { create } from 'zustand';

export type AppThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: AppThemeMode;
  toggleMode: () => void;
  setMode: (mode: AppThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',
  toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setMode: (mode) => set({ mode }),
}));
